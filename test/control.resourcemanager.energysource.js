var PositionUtility = require('utility.position');
var CreepUtility = require('utility.creep');
var Log = require('logging.log');

var moduleName = 'control.resourcemanager.energysource';
var EnergySourceManager = {};
module.exports = EnergySourceManager;

/* how much energy can be drained from an energy source per tick 
 * such that the energy source won't be drained before it's 
 * next regeneration */
EnergySourceManager.MAX_ALLOWED_ENERGY_SOURCE_DRAIN = 10; 

EnergySourceManager.assignSource = function(sourceMiner, target) {
    var room = sourceMiner.room;
    
    //find sources based on the index in memory
    var indexedSources = _.values(room.memory.resourceIndex.energy.sources);
    if(indexedSources.length === 0) {
        EnergySourceManager.createEnergySourceIndex(room);    
    }    
    //only take the sources with the lowest current drain on their energy
    var assignableSources = _.filter(indexedSources, 
        (source) => EnergySourceManager._isAssignableSource(source, room)
    );
    if(Log.isDebugEnabled()) {
        Log.debug('room ' + room.name + ' has ' + indexedSources.length + ' energy sources; ' + 
            assignableSources.length + ' can be assigned');
    }
    
    var targetSource = EnergySourceManager._determineTargetSource(assignableSources, sourceMiner.pos);
    if(targetSource === null) {
        if(Log.isWarnEnabled()) {
            Log.warn('No assignable sources for creep ' + sourceMiner.name);
        }
        return -1;
    }
    sourceMiner.memory.assignedSourceId = targetSource;
    EnergySourceManager._updateSourceIndex(sourceMiner, targetSource);
    if(Log.isInfoEnabled()) {
        Log.info('creep ' + sourceMiner.name + ' was assigned to source ' + targetSource);
    }

    return 0;
};

EnergySourceManager._updateSourceIndex = function(sourceMiner, sourceId) {
    var room = sourceMiner.room;
    room.memory.resourceIndex.energy.sources[sourceId].assigned.push(sourceMiner.name);
    var energyDrain = sourceMiner.memory.energyDrainPotential;
    energyDrain = energyDrain === undefined ? CreepUtility.calculateEnergyDrain(sourceMiner) : energyDrain;
    room.memory.resourceIndex.energy.sources[sourceId].energyDrain += energyDrain ;
    if(Log.isDebugEnabled()) {
        Log.debug('source ' + sourceId + ' was assigned a new creep (' + 
            room.memory.resourceIndex.energy.sources[sourceId].assigned.length + '/' + 
            room.memory.resourceIndex.energy.sources[sourceId].maxAssigned + '); drain=' +  energyDrain);
    }
}

/**
 * A source can be assigned if it still has assignment capacity and is not exceeding 
 * the max allowed energy drain per tick. There is an exception for the last criteria 
 * if the room cannot yet support miners
 */
EnergySourceManager._isAssignableSource = function(source, room) {
    var maxAllowed = room.memory.resourceIndex.canSupportMiners ? source.maxAssigned : Math.ceil(source.maxAssigned * 1.5);
    return  source.assigned.length < maxAllowed &&
            (source.energyDrain < EnergySourceManager.MAX_ALLOWED_ENERGY_SOURCE_DRAIN ||
             !room.memory.resourceIndex.canSupportMiners); 
};

EnergySourceManager._determineTargetSource = function(assignableSources, pos) {
    var minEnergyDrain = _.min(_.map(assignableSources, 'energyDrain')); 
    var minAssignableSource = _.filter(assignableSources, {'energyDrain': minEnergyDrain})
    
    var targetSource;
    if(minAssignableSource.length === 0) {
        return null;
    } else if(minAssignableSource.length === 1) {
        targetSource = minAssignableSource[0].id;
    } else { //if there are multiple options, take the closest one
        var sourceObjects = _.map(minAssignableSource, (target) => Game.getObjectById(target.id) );
        targetSource = pos.findClosestByPath(sourceObjects).id;
    }
    return targetSource;
};

EnergySourceManager.createEnergySourceIndex = function(room){
    room.memory.resourceIndex.energy.sources = {};
    _.forEach(room.find(FIND_SOURCES), (s) => EnergySourceManager._addEnergySourceToIndex(s, room.memory.resourceIndex.energy.sources) );
    if(Log.isInfoEnabled()) {
        Log.info('energy source index created for room "' + room.name + '"; ' + 
            room.memory.resourceIndex.energy.sources.length + ' sources were identified');
    } 
};

EnergySourceManager._addEnergySourceToIndex = function(source, index) {
    var passableTerrain = PositionUtility.countPassableTerrain(PositionUtility.getTerrainAroundObject(source));
    index[source.id] = {id: source.id, assigned: [], maxAssigned: passableTerrain, energyDrain: 0, pos: source.pos};
};

EnergySourceManager.handleCreepDeath = function(creep) {
    var assignedSourceId = creep.assignedSourceId;
    if(assignedSourceId !== undefined) {
        var source = Game.getObjectById(assignedSourceId);
        _.pull(source.room.memory.resourceIndex.energy.sources[assignedSourceId].assigned, creep.name);
        source.room.memory.resourceIndex.energy.sources[assignedSourceId].energyDrain -= creep.energyDrain;
    }
};