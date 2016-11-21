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
    if(creep.pos.isNearTo(source)) {
        creep.moveTo(source);
    }
    if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
        
    }
};

Role.create = function(spawn) {
    RoleCommon.createGeneric(spawn, Role.roleName);
};

Role.constructBody = function(energyLimit) {
    return BodyConstructor.constructBody(Role.bodyPartMap, energyLimit, );
};