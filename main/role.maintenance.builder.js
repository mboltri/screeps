var RoleCommon = require('role.common');
var Log = require('logging.log');

var moduleName = 'role.maintenance.builder';
var Role = {};
module.exports = Role;

Role.roleName = 'builder';
Role.desired = 3;
Role.priority = 6;

Role.REPAIR_RATIO = 0.75;

Role.run = function(creep) {

    var code = RoleCommon.run(creep);
    if(code !== 0) {
        return;
    }

    if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
    }

    if(creep.memory.building) {
        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
        if(targets.length) {
            var target = creep.pos.findClosestByPath(targets);
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        } else { //if nothing to build, look for objects to repair
            var needsRepair = creep.room.find(FIND_STRUCTURES, {filter: function(structure){return structure.hits / structure.hitsMax < Role.REPAIR_RATIO} });
            if(needsRepair.length > 0) {
                var toRepair = creep.pos.findClosestByPath(needsRepair);
                if(creep.repair(toRepair) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(toRepair);
                }
            } else { //if nothing to build or repair, behave like a harvester
                require('role.resource.harvester').run(creep);
            }
        }
    } else {
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