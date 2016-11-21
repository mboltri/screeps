var RoleCommon = require('role.common');
var Log = require('logging.log');
var ResourceManager = require('control.resourcemanager');

var moduleName = 'role.resource.harvester';
var Role = {};
module.exports = Role;

Role.roleName = 'harvester';
Role.desired = 3;
Role.priority = 3;

Role.run = function(creep) {
    RoleCommon.run(creep);
    
    if(creep.memory.assignedSourceId === undefined) {
        ResourceManager.assignSource(creep);
    }
    
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity;
        }
    });
    if(targets.length > 0) {
        if(creep.carry.energy < creep.carryCapacity) {
            var source = Game.getObjectById(creep.memory.assignedSourceId);
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
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
    return RoleCommon.SIMPLE_BODY;
};