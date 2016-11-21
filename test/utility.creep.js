var Log = require('logging.log');

var moduleName = 'utility.creep';
var CreepUtility = {};
module.exports = CreepUtility;

CreepUtility.calculateEnergyDrain = function(creep) {
    var workParts = CreepUtility.countBodyPartsByType(creep, WORK);
    var energyDrain = workParts * HARVEST_POWER;
    creep.memory.energyDrain = energyDrain;
    return energyDrain;
};

CreepUtility.countBodyPartsByType = function(creep, partType) {
    return _.filter(creep.body, {type: partType}).length
};