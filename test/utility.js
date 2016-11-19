var Log = require('logging.log');

var moduleName = 'utility';
var Utility = {};
module.exports = Utility;

Utility.gc = function() {
    for(let name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
        }
    }
}