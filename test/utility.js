var Log = require('logging.log');
var Notifier = require('utility.notifier');

var moduleName = 'utility';
var Utility = {};
module.exports = Utility;

Utility.gc = function() {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            Notifier.notifyOfCreepDeath(Memory.creeps[name]);
            delete Memory.creeps[name];
        }
    }
};