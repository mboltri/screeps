var EnergySourceManager = require('control.resourcemanager.energysource');
var Utility = require('utility');
var Log = require('logging.log');

var moduleName = 'control.resourcemanager';
var ResourceManager = {};
module.exports = ResourceManager;

ResourceManager.assignSource = function(sourceMiner) {
    ResourceManager._createResourceIndex(sourceMiner.room);
    sourceMiner.room.memory.resourceIndex.canSupportMiners = ResourceManager._canSupportMiners(sourceMiner.room);
    return EnergySourceManager.assignSource(sourceMiner);
}

ResourceManager._createResourceIndex = function(room){
    if(room.memory.resourceIndex !== undefined && Object.keys(room.memory.resourceIndex).length > 0) {
        return; //resource index already exists
    }
    room.memory.resourceIndex = {};
    room.memory.resourceIndex.energy = {};
    EnergySourceManager.createEnergySourceIndex(room);
    room.memory.resourceIndex.canSupportMiners = ResourceManager._canSupportMiners(room);
    if(Log.isInfoEnabled()) {
        Log.info('resourceIndex created for room "' + room.name + '"')
    } 
};

ResourceManager._canSupportMiners = function(room) {
    return room.controller.level > 1;
}

ResourceManager.handleCreepDeath = function(creep){
    EnergySourceManager.handleCreepDeath(creep);
};