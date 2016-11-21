var Log = require('logging.log');
var ResourceManager = require('control.resourcemanager');

var moduleName = 'utility.notifier';
var Notifier = {};
module.exports = Notifier;

Notifier.notifyOfCreepDeath = function(creep) {
    ResourceManager.handleCreepDeath(creep);
}