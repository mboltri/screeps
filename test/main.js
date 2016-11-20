var RoleManager = require('control.rolemanager');
var SpawnManager = require('control.spawnmanager');
var Utility = require('utility');
var Log = require('logging.log');

var moduleName = 'main'; 

module.exports.loop = function () {

    Utility.gc();
    
    //console.log(Memory.myRooms['W62N27'].spawnQueue);
    SpawnManager.manageSpawns();
    
    _.values(Game.creeps).forEach( function(creep) {
        RoleManager.assignWorkByRole(creep);
    });
};