var RoleManager = require('control.rolemanager');
var SpawnManager = require('control.spawnmanager');
var ResourceManager = require('control.resourcemanager');
var Utility = require('utility');
var Log = require('logging.log');
const Profiler = require('tools.profiler');

var moduleName = 'main'; 

Profiler.enable();
module.exports.loop = function() {
    Profiler.wrap(function() {
        Utility.gc();
        SpawnManager.manageSpawns();
        
        _.forEach(_.values(Game.creeps), (creep) => RoleManager.assignWorkByRole(creep) );
    });
};