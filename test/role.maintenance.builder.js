var RoleCommon = require('role.common');
var Log = require('logging.log');
var ResourceManager = require('control.resourcemanager');

var moduleName = 'role.maintenance.builder';
var Role = {};
module.exports = Role;

Role.roleName = 'builder';
Role.desired = 1;
Role.priority = 6;

Role.run = function(creep) {

    RoleCommon.run(creep);

    if(creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
    }
    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
    }
    var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if(creep.memory.building) {
        if(targets.length) {
            if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        } else { //if nothing to build, behave like a harvester
            require('role.resource.harvester').run(creep);
        }
    } else {
        if(creep.memory.assignedSourceId === undefined) {
            ResourceManager.assignSource(creep);
        }
        var source = Game.getObjectById(creep.memory.assignedSourceId);
        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
        if(targets.length) {
            creep.build(targets[0])
        }
    }
};

Role.create = function(spawn) {
    RoleCommon.createGeneric(spawn, Role.roleName);
};

Role.constructBody = function(energyLimit) {
    return RoleCommon.SIMPLE_BODY;
};