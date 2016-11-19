var RoleIndex = require('control.roleindex');
var RoleManager = require('control.rolemanager');
var Log = require('logging.log');

var moduleName = 'control.spawnmanager';
var SpawnManager = {};
module.exports = SpawnManager;

SpawnManager.SPAWN_QUEUE_REFRESH_RATE = 10; //how many ticks to wait before reevaluating the Spawn Queue

SpawnManager.manageSpawns = function() {
    _.values(Game.rooms).forEach( function(room) {
        if(Memory.tickCounter % SpawnManager.SPAWN_QUEUE_REFRESH_RATE == 0) {
            SpawnManager.manageSpawnQueue(room);
        }
        var spawnQueue = Memory.myRooms[room.name].spawnQueue;
        if(spawnQueue == false) {
            return; //if the spawn queue is empty, no need for further evaluations
        }
        _.values(room.find(FIND_MY_SPAWNS)).forEach( function(spawn) {
            if(!spawn.spawning && spawnQueue) {
                var toSpawn = Memory.myRooms[room.name].spawnQueue.shift();
                _.find(RoleIndex, {'roleName': toSpawn}).create(spawn);
                if(Log.isInfoEnabled() && spawn.spawning) {
                    Log.info('spawn "' + spawn.name + '" is spawning a new ' + toSpawn, moduleName)
                }
            }
        })
    })
}

SpawnManager.manageSpawnQueue = function(room) {
    if(Memory.myRooms[room.name] == undefined) {
        if(Log.isDebugEnabled()) {
            Log.debug(room.name + ' doesnt exist in Memory.myRooms, creating...', moduleName);
        }
        Memory.myRooms[room.name] = {};
        Memory.myRooms[room.name].spawnQueue = [];
    }
    if(Memory.myRooms[room.name].spawnQueue == undefined) {
        if(Log.isDebugEnabled()) {
            Log.debug(room.name + ' doesnt have a spawnQueue, creating...', moduleName);
        }
        Memory.myRooms[room.name].spawnQueue = [];
    }
    
    var spawnQueue = Memory.myRooms[room.name].spawnQueue
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
            spawnQueue.push(role.roleName);
            for(var i = 0; i < role.desired - inRoom; i++) {
                Memory.myRooms[room.name].spawnQueue = spawnQueue;
                rolesAdded++;
            }
            if(Log.isDebugEnabled()) {
                Log.debug('Added ' + (role.desired - inRoom) + ' ' + role.roleName + '(s) to queue', moduleName);
                Log.debug('(After adding) room "' + room.name + '": ' + inRoom + ' ' + role.roleName + 's exist, ' + inQueue + ' are in queue, ' + role.desired + ' are desired', moduleName);
            }
        }
    })
    if(Log.isInfoEnabled() && rolesAdded) {
        Log.info(rolesAdded + ' roles were added to the spawn queue. Queue contents: ' + JSON.stringify(Memory.myRooms[room.name].spawnQueue), moduleName)
    }
}