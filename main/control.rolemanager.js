var RoleIndex = require('control.roleindex');
var Log = require('logging.log');

var moduleName = 'control.rolemanager';
var RoleManager = {};
module.exports = RoleManager;

RoleManager.assignWorkByRole = function(creep) {
    for(let i in RoleIndex) {
        var role = RoleIndex[i];
        if(creep.memory.roleName == role.roleName) {
            if(creep.memory.fallback = role.run(creep)) {
                role.fallback.run(creep);
            }
        }
    }
}

RoleManager.getCreepCountByRolesInRoom = function(room) {
    
    var creepMap = {};
    var roleNames = _.map(RoleIndex, 'roleName');
    var creepRoles = _.map(room.find(FIND_MY_CREEPS), 'memory.roleName');
    var arrLen = creepRoles.length;
    
    if(Log.isDebugEnabled()) {
        Log.debug('init getCreepCountForAllRoles, roleNames='+roleNames, moduleName);
    }
    
    for(var i in roleNames) {
        var roleName = roleNames[i];
        if(Log.isDebugEnabled()) {
            Log.debug('i='+i+' before pull. arrLen='+arrLen+', creepRoles.length='+creepRoles.length, moduleName);
        }
        _.pull(creepRoles, roleName);
        if(Log.isDebugEnabled()) {
            Log.debug('i='+i+' after pull. arrLen='+arrLen+', creepRoles.length='+creepRoles.length, moduleName);
        }
        creepMap[roleName] = arrLen - creepRoles.length;
        arrLen = creepRoles.length;
    }
    if(Log.isInfoEnabled()) {
        Log.info('creep counts='+JSON.stringify(creepMap), moduleName);
    }
    return creepMap;
}

RoleManager.getCreepCountForRole = function(roleName) {
 return _.filter(Game.creeps, (creep) => creep.memory.roleName == roleName);
}