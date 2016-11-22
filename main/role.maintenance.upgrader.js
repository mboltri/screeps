var RoleCommon = require('role.common');
var Log = require('logging.log');

var moduleName = 'role.maintenance.upgrader';
var Role = {};
module.exports = Role;

Role.roleName = 'upgrader';
Role.desired = 2;
Role.priority = 5;

Role.run = function(creep) {
   var code = RoleCommon.run(creep);
    if(code !== 0) {
        return;
    }
    
   if(creep.memory.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrading = false;
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
        creep.memory.upgrading = true;
    }

    if(creep.memory.upgrading) {
        if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    else {
        var sources = creep.room.find(FIND_SOURCES);
        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
};

Role.create = function(spawn) {
    RoleCommon.createGeneric(spawn, Role.roleName);
};

Role.constructBody = function(energyLimit) {
    return RoleCommon.simpleBody;
};