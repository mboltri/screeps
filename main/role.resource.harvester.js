var RoleCommon = require('role.common');
var Log = require('logging.log');

var moduleName = 'role.resource.harvester';
var Role = {};
module.exports = Role;

Role.roleName = 'harvester';
Role.desired = 5;
Role.priority = 3;

Role.run = function(creep, index) {
    var code = RoleCommon.run(creep);
    if(code !== 0) {
        return;
    }
    
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                structure.energy < structure.energyCapacity;
        }
    });
    if(targets.length > 0) {
        var target = Game.getObjectById(creep.memory.target);
        if(target === null) {
            target = creep.pos.findClosestByPath(targets);
            creep.memory.target = target.id;
        } else {
            var seededRand = (Game.creeps.harvester7.id).replace(/a|b|c|d|e|f/g, '') % 10;
            if(Game.time % 10 === seededRand) {
                target = creep.pos.findClosestByPath(targets);
                creep.memory.target = target.id;
            }
        }
        if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            var sourceToUse = creep.memory.preferredSource;
            if(sourceToUse === undefined) {
                sourceToUse = index % 3 === 0 ? 1 : 0;
                creep.memory.preferredSource = sourceToUse;
            }
            if(creep.harvest(sources[sourceToUse]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[sourceToUse]);
            }
        } else {
            var code = creep.transfer(target, RESOURCE_ENERGY);
            if(code === ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            } else {
                creep.memory.target = undefined;
            } 
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