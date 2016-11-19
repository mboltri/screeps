var RoleIndex = require('control.roleindex');
var RoleManager = require('control.rolemanager');
var Log = require('logging.log');

var moduleName = 'control.spawnmanager';
var SpawnManager = {};
module.exports = SpawnManager;

SpawnManager.SPAWN_QUEUE_REFRESH_RATE = 3; //how many ticks to wait before reevaluating the Spawn Queue

SpawnManager.manageSpawns = function() {
    _.values(Game.rooms).forEach( function(room) {
        if(Memory.tickCounter % SpawnManager.SPAWN_QUEUE_REFRESH_RATE == 0) {
            SpawnManager.manageSpawnQueue(room);
        }
        var spawnQueue = room.memory.spawnQueue;
        if(!spawnQueue.length) {
            return; //if the spawn queue is empty, no need for further evaluations
        }
        _.values(room.find(FIND_MY_SPAWNS)).forEach( function(spawn) {
            if(!(spawn.spawning || 0) && spawnQueue.length) {
                console.log(spawn.spawning || 0);
                var toSpawnName = room.memory.spawnQueue.shift();
                var toSpawn = _.find(RoleIndex, {'roleName': toSpawn});
                if(spawn.canCreateCreep(to)).create(spawn);
                if(Log.isInfoEnabled() && spawn.spawning) {
                    Log.info('spawn "' + spawn.name + '" is spawning a new ' + toSpawn, moduleName)
                }
            }
        })
    })
}

SpawnManager.manageSpawnQueue = function(room) {
    if(room.memory.spawnQueue == undefined) {
        if(Log.isDebugEnabled()) {
            Log.debug(room.name + ' doesnt have a spawnQueue, creating...', moduleName);
        }
        room.memory.spawnQueue = [];
    }
    
    var spawnQueue = room.memory.spawnQueue
    var creepsInRooom = RoleManager.getCreepCountByRolesInRoom(room);
    var allRolesinQueue = _.countBy(spawnQueue);
    var rolesAdded = 0;
    RoleIndex.forEach( function(role) {
        var inRoom = creepsInRooom[role.roleName];
        var inQueue = allRolesinQueue[role.roleName] || 0;
        if(Log.isDebugEnabled()) {
            Log.debug('room "' + room.name + '": ' + inRoom + ' ' + role.roleName + 's exist, ' + inQueue + ' are in queue, ' + role.desired + ' are desired', moduleName);
        }
        if(inRoom + inQueue < role.desired) {
            var insertIndex = _.sortedIndex(room.spawnQueue);
            for(var i = 0; i < (role.desired - inRoom); i++) {
                spawnQueue.push(role.roleName);
                rolesAdded++;
            }
            console.log('spawnQueue=' + spawnQueue);
            room.memory.spawnQueue = spawnQueue;
            if(Log.isDebugEnabled()) {
                Log.debug('Added ' + (role.desired - inRoom) + ' ' + role.roleName + '(s) to queue', moduleName);
            }
        }
    })
    if(Log.isInfoEnabled() && rolesAdded) {
        Log.info(rolesAdded + ' roles were added to the spawn queue. Queue contents: ' + JSON.stringify(room.memory.spawnQueue), moduleName)
    }
}