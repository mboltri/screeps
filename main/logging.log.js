var Log = {};
module.exports = Log;

Log.LOG_LEVELS = {DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3, NONE: 4};
Log.INCLUDE_MODULES_ALL = 'ALL';

Log.level = Log.LOG_LEVELS.INFO;
Log.includeModules = Log.INCLUDE_MODULES_ALL;

Log.isDebugEnabled = function() {
    return Log.level <= Log.LOG_LEVELS.DEBUG;
};

Log.isInfoEnabled = function() {
    return Log.level <= Log.LOG_LEVELS.INFO;
};

Log.isWarnEnabled = function() {
    return Log.level <= Log.LOG_LEVELS.WARN;
};

Log.isErrorEnabled = function() {
    return Log.level <= Log.LOG_LEVELS.ERROR;
};

Log.debug = function(message, moduleName) {
    if(Log.isDebugEnabled()) {
        Log._logStatement('DEBUG', message, moduleName);
    }
};

Log.info = function(message, moduleName) {
    if(Log.isInfoEnabled()) {
        Log._logStatement('INFO', message, moduleName);
    }
};

Log.warn = function(message, moduleName) {
    if(Log.isWarnEnabled()) {
        Log._logStatement('WARN', message, moduleName);
    }
};

Log.error = function(message, moduleName) {
    if(Log.isErrorEnabled()) {
        Log._logStatement('ERROR', message, moduleName);
    }
};

Log._logStatement = function(logLevel, message, moduleName) {
    if(typeof moduleName == 'undefined') {
        if(Log.includeModules == Log.INCLUDE_MODULES_ALL) { //only log messages with no module if there is no filter on modules
            console.log('T'+Game.time + ' ' + logLevel + ': ' + message);
        }
    } else if(Log.includeModules == Log.INCLUDE_MODULES_ALL || _.includes(Log.includeModules, moduleName)) {
        console.log('T'+Game.time + ' ' + logLevel + ' [' + moduleName + ']: ' + message);
    } else {
        
    }
};