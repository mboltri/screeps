var Log = require('logging.log');

var moduleName = 'utility.position';
var PositionUtility = {};
module.exports = PositionUtility;

PositionUtility.TERRAIN_WALL = 'wall';
PositionUtility.TERRAIN_SWAMP = 'swamp';
PositionUtility.TERRAIN_PLAIN = 'plain';

PositionUtility.getTerrainAroundObject = function(object) {
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

PositionUtility.countPassableTerrain = function(terrainArr) {
    var passable = 0;
    _.forEach(terrainArr, (terrain) => passable += terrain === PositionUtility.TERRAIN_WALL ? 0 : 1 );
    return passable;
}