var RoleCommon = require('role.common');
var Log = require('logging.log');
var ResourceManager = require('control.resourcemanager');
var BodyConstructor = require('utility.bodyconstructor');
var EnergySourceManager = require('control.resourcemanager.energysource');

var moduleName = 'role.resource.miner';
var Role = {};
module.exports = Role;

Role.roleName = 'miner';
Role.desired = 3;
Role.priority = 2;
Role.bodyPartMap        = {};
Role.bodyPartMap[MOVE]  = BodyConstructor.PRIORITY.LOW;
Role.bodyPartMap[CARRY] = BodyConstructor.PRIORITY.LOW;
Role.bodyPartMap[WORK]  = BodyConstructor.PRIORITY.HIGH;

Role.MODE_MOVE = 'move';
Role.MODE_CONSTRUCT = 'construct';
Role.MODE_HARVEST = 'harvest';

Role.partLimitMap        = {};
Role.partLimitMap[MOVE]  = 2;
Role.partLimitMap[CARRY] = 1;
Role.partLimitMap[WORK]  = MAX_ALLOWED_ENERGY_SOURCE_DRAIN / HARVEST_POWER;


Role.run = function(creep) {
    RoleCommon.run(creep);
    
    if(creep.memory.assignedSourceId === undefined) {
        ResourceManager.assignSource(creep);
    }
    
    var source = Game.getObjectById(creep.memory.assignedSourceId);
    var container = Game.getObjectById(creep.memory.assignedContainerId);
    if(creep.memory.mode = Role.MODE_MOVE) {
        creep.moveTo(source);
        if(creep.pos.nearTo(source)) {
            creep.memory.mode = Role.MODE_CONSTRUCT;
            Role.placeContainerSite(creep);
        }
    } else if(creep.memory.mode = Role.MODE_CONSTRUCT) {
        creep.harvest(source);
        creep.build(container);
        if(Game.getObjectById(creep.memory.assignedContainerId) === null) {
            creep.memory.mode = Role.MODE_HARVEST;
            EnergySourceManager.assignContainer(creep);
        }
    } else if(creep.memory.mode = Role.MODE_HARVEST) {
        creep.harvest(source);
        creep.transfer(container, RESOURCE_ENERGY)
    } else {
        if(Log.isErrorEnabled()) {
            Log.error(creep.name ' does not have a mode defined!');
            creep.memory.mode = Role.MODE_MOVE;
        }
    }
}; 

Role.create = function(spawn, room) {
    var name = RoleCommon.createName(Role.roleName, room.name);
    spawn.createCreep()
};

Role.constructBody = function(energyLimit) {
    return BodyConstructor.constructBody(Role.bodyPartMap, energyLimit, Role.partLimitMap);
};

Role.placeContainerSite = function(creep) {
    creep.memory.assignedContainerId = null; //TODO
}

Role.assignContainer = function(creep) {
    var container = creep.pos.findInRange(FIND_MY_STRUCTURES, 1, {filter: {structureType: STRUCTURE_CONTAINER}});
    if(container.length === 0) {
        return -1;
    } else {
        creep.memory.
    }
}