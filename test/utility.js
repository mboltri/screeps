var Log = require('logging.log');

var moduleName = 'utility';
var Utility = {};
module.exports = Utility;

Utility.TERRAIN_WALL = 'wall';
Utility.TERRAIN_SWAMP = 'swamp';
Utility.TERRAIN_PLAIN = 'plain';

Utility.gc = function() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
};

Utility.getTerrainAroundObject = function(object) {
    var origX = object.pos.x;
    var origY = object.pos.y;
    var room = object.room;
    var terrainArr = [];
    for(var xOffset = -1; xOffset <=1; xOffset++) {
        var currX = origX + xOffset;
        for(var yOffset = -1; yOffset <= 1; yOffset++) {
            var currY = origY + yOffset;
            if(xOffset !== 0 || yOffset !== 0) {
                terrainArr.push(Game.map.getTerrainAt(currX,currY,room.name));
            }
        }
    }
    return terrainArr;
};

Utility.countPassableTerrain = function(terrainArr) {
    var passable = 0;
    _.forEach(terrainArr, (terrain) => passable += terrain === Utility.TERRAIN_WALL ? 0 : 1 );
    return passable;
}