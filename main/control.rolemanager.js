var RoleIndex = require('control.roleindex');
var Log = require('logging.log');

var moduleName = 'control.rolemanager';
var RoleManager = {};
module.exports = RoleManager;

RoleManager.assignWorkByRole = function(creep) {
    RoleIndex.forEach( function(role) {
        if(creep.memory.roleName == role.roleName) {
            role.run(creep);
        }
    });
};

RoleManager.getCreepCountByRolesInRoom = function(room) {
    
    var creepMap = {};
    var roleNames = _.map(RoleIndex, 'roleName');
    var creepRoles = _.map(room.find(FIND_MY_CREEPS), 'memory.roleName');
    var arrLen = creepRoles.length;
    
    if(Log.isDebugEnabled()) {
        Log.debug('init getCreepCountForAllRoles, roleNames='+roleNames, moduleName);
    }
    
    roleNames.forEach( function(roleName) {
        _.pull(creepRoles, roleName);
        creepMap[roleName] = arrLen - creepRoles.length;
        arrLen = creepRoles.length;
    });
    if(Log.isInfoEnabled()) {
        Log.info('creep counts='+JSON.stringify(creepMap), moduleName);
    }
    return creepMap;
};

RoleManager.getCreepCountForRole = function(roleName) {
 return _.filter(Game.creeps, (creep) => creep.memory.roleName == roleName);
};