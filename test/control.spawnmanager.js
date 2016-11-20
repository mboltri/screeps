var RoleIndex = require('control.roleindex');
var RoleManager = require('control.rolemanager');
var Log = require('logging.log');

var moduleName = 'control.spawnmanager';
var SpawnManager = {};
module.exports = SpawnManager;

SpawnManager.SPAWN_QUEUE_REFRESH_RATE = 3; //how many ticks to wait before reevaluating the Spawn Queue

SpawnManager.manageSpawns = function() {
    _.values(Game.rooms).forEach( function(room) {
        if(Game.time % SpawnManager.SPAWN_QUEUE_REFRESH_RATE === 0) {
            SpawnManager.manageSpawnQueue(room);
        }
        var spawnQueue = room.memory.spawnQueue || 0;
        if(!spawnQueue.length) {
            room.memory.emptySpawnTimer++;
            if(room.memory.emptySpawnTimer > 20 && room.memory.emptySpawnTimer % 10 === 0) {
              if(Log.isWarnEnabled()) {
                Log.warn('room "' + room.name + '"\'s spawnQueue has been empty for ' + 
                  room.memory.emptySpawnTimer + ' ticks')
              }
            }
            return; //if the spawn queue is empty, no need for further evaluations
        }
        room.memory.emptySpawnTimer = 0;
        _.values(room.find(FIND_MY_SPAWNS)).forEach( function(spawn) {
          if(!(spawn.spawning || 0) && spawnQueue.length) {
              var toSpawnObject = room.memory.spawnQueue.shift();
              var toSpawnProto = _.find(RoleIndex, {'roleName': toSpawnObject.roleName});
              if(spawn.canCreateCreep(toSpawnProto.constructBody(spawn.energyCapacity)) === 0) {
                  if(Log.isInfoEnabled() && spawn.spawning) {
                      Log.info('spawn "' + spawn.name + '" is spawning a new ' + 
                        toSpawnProto.roleName, moduleName);
                  }
                  toSpawnProto.create(spawn) ;
              } else {
                  if(Log.isDebugEnabled()) {
                      Log.debug('spawn "' + spawn.name + '" cannot spawn a ' + 
                        toSpawnProto.roleName + ' right now', moduleName);
                  }
                  room.memory.spawnQueue.unshift(toSpawnObject);
              }
          }
        });
    });
};

SpawnManager.manageSpawnQueue = function(room) {
    if(room.memory.spawnQueue === undefined) {
        if(Log.isDebugEnabled()) {
            Log.debug(room.name + ' doesnt have a spawnQueue, creating...', moduleName);
        }
        room.memory.spawnQueue = [];
    }
    
    var spawnQueue = room.memory.spawnQueue;
    var creepsInRoom = RoleManager.getCreepCountByRolesInRoom(room);
    var rolesInQueue = _.countBy(_.map(spawnQueue, 'roleName'));
    var rolesAdded = 0;
    RoleIndex.forEach( (role) => SpawnManager._addRoleToQueue(
      room, role, creepsInRoom, rolesInQueue, spawnQueue, rolesAdded)
    );
    if(rolesAdded > 0) {
        if(Log.isInfoEnabled()) {
          Log.info(rolesAdded + ' roles were added to the spawn queue. Queue contents: ' + 
            JSON.stringify(_.countBy(_.map(room.memory.spawnQueue, 'roleName'))), moduleName);
        }
    } else {
      if(Log.isDebugEnabled()) {
        Log.debug('No roles were added to the spawn queue. Queue contents: ' + 
          JSON.stringify(_.countBy(_.map(room.memory.spawnQueue, 'roleName'))), moduleName);
      }
    }
};

SpawnManager._addRoleToQueue = function(room, role, creepsInRoom, rolesInQueue, spawnQueue, rolesAdded)  {
    var inRoom = creepsInRoom[role.roleName];
    var inQueue = rolesInQueue[role.roleName] || 0;
    if(Log.isDebugEnabled()) {
        Log.debug('room "' + room.name + '": ' + inRoom + ' ' + role.roleName + 's exist, ' + 
          inQueue + ' are in queue, ' +role.desired + ' are desired', moduleName);
    }
    var needed = role.desired - (inRoom + inQueue);
    if(needed > 0) {
        var insertIndex = _.sortedIndex(_.map(spawnQueue, 'priority'), role.priority);
        for(var i = 0; i < needed; i++) {
            spawnQueue.splice(insertIndex, 0, role);
            rolesAdded++;
        }
        room.memory.spawnQueue = spawnQueue;
        if(Log.isDebugEnabled()) {
            Log.debug('Added ' + needed + ' ' + role.roleName + '(s) to queue', moduleName);
        }
    }
};