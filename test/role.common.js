var Log = require('logging.log');
var Notifier = require('utility.notifier');

var moduleName = 'role.common';
var RoleCommon = {};
module.exports = RoleCommon;

RoleCommon.SIMPLE_BODY = [WORK, WORK, CARRY, MOVE];

RoleCommon.run = function(creep) {
    if(creep.memory.name === undefined) {
        creep.memory.name = creep.name;
    }
};

RoleCommon.createGeneric = function(spawn, roleName) {
    spawn.createCreep(RoleCommon.SIMPLE_BODY, null, {'roleName': roleName});
};