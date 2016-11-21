var Log = require('logging.log');
var ResourceManager = require('control.resourcemanager');

var moduleName = 'utility.notifier';
var Notifier = {};
module.exports = Notifier;

Notifier.notifyOfCreepDeath = function(creep) {
    if(Log.isInfoEnabled()) {
        Log.info(creep.name + ' (' + creep.roleName + ') has died', moduleName);
    }
    ResourceManager.handleCreepDeath(creep);
}