var Log = require('logging.log');

var moduleName = 'role.common';
var RoleCommon = {};
module.exports = RoleCommon;

RoleCommon.run = function(creep) {
    
};

RoleCommon.createGeneric = function(spawn, roleName) {
    spawn.createCreep(RoleCommon.simpleBody, null, {'roleName': roleName})
};

RoleCommon.simpleBody = [MOVE, CARRY, WORK];