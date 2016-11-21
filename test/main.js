var RoleManager = require('control.rolemanager');
var SpawnManager = require('control.spawnmanager');
var ResourceManager = require('control.resourcemanager');
var Utility = require('utility');
var Log = require('logging.log');

var moduleName = 'main'; 

module.exports.loop = function () {

    Utility.gc();
    
    var creep = Game.creeps[Object.keys(Game.creeps)[0]];
    if(creep !== undefined) {
        //console.log('creep energy drain = ' + require('role.common').calculateEnergyDrain(creep));
        //ResourceManager.assignSource(creep);
    }
    /* var BodyConstructor = require('utility.bodyconstructor');
    var PRIORITY = BodyConstructor.PRIORITY;
    var priorityMap = {move: PRIORITY.LOW, carry: PRIORITY.LOW, work: PRIORITY.HIGH};
    var body = BodyConstructor.constructBody(priorityMap, 550, {CARRY: 1});
    console.log(JSON.stringify(body)); */
    
    SpawnManager.manageSpawns();
    
    _.forEach(_.values(Game.creeps), (creep) => RoleManager.assignWorkByRole(creep) );
};