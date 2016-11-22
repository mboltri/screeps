var RoleManager = require('control.rolemanager');
var SpawnManager = require('control.spawnmanager');
var Utility = require('utility');
var Log = require('logging.log');

var moduleName = 'main'; 

module.exports.loop = function () {

    _.forEach(Game.rooms, function(room) {
       if(!room.controller.safeMode) {
           room.controller.activateSafeMode();
       }
    });

    Utility.gc();
    
    //console.log(Memory.myRooms['W62N27'].spawnQueue);
    SpawnManager.manageSpawns();
    
    var index = 0;
    _.values(Game.creeps).forEach( function(creep) {
        RoleManager.assignWorkByRole(creep, index);
        index++;
    });
};