var Log = require('logging.log');

var moduleName = 'role.common';
var RoleCommon = {};
module.exports = RoleCommon;

RoleCommon.RENEW_LIMIT = 100;
RoleCommon.RENEW_TARGET = 1400;

RoleCommon.run = function(creep) {
    return 0;
};

RoleCommon.createGeneric = function(spawn, roleName) {
    if(Memory.creepIndex === undefined) {
        Memory.creepIndex = 0;
    }
    spawn.createCreep(RoleCommon.simpleBody, roleName + Memory.creepIndex++, {'roleName': roleName})
};

RoleCommon.simpleBody = [WORK, WORK, CARRY, MOVE, MOVE];