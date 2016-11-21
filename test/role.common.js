var Log = require('logging.log');
var Notifier = require('utility.notifier');

var moduleName = 'role.common';
var RoleCommon = {};
module.exports = RoleCommon;

RoleCommon.SIMPLE_BODY = [WORK, WORK, CARRY, MOVE];
//if a creep has less than this number of ticks to live, it will notify of its death and commit suicide
RoleCommon.END_OF_LIFE_LIMIT = 5; 

RoleCommon.run = function(creep) {
    if(creep.ticksToLive < RoleCommon.END_OF_LIFE_LIMIT) {
        Notifier.notifyOfCreepDeath(creep);
        creep.suicide();
        return -1;
    }
};

RoleCommon.createGeneric = function(spawn, roleName) {
    spawn.createCreep(RoleCommon.SIMPLE_BODY, null, {'roleName': roleName});
};