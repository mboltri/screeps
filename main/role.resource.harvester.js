var RoleCommon = require('role.common');
var Log = require('logging.log');

var moduleName = 'role.resource.harvester';
var Role = {};
module.exports = Role;

Role.roleName = 'harvester';
Role.desired = 3;
Role.priority = 3;

Role.run = function(creep) {
    RoleCommon.run(creep);
    
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity;
        }
    });
    if(targets.length > 0) {
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        } else if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(targets[0]);
        }
    } else { //fallback
        return require('role.maintenance.upgrader').run(creep);
    }
};

Role.create = function(spawn) {
    RoleCommon.createGeneric(spawn, Role.roleName);
};

Role.constructBody = function(energyLimit) {
    return RoleCommon.simpleBody;
};