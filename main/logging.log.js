var Log = {};
module.exports = Log;

Log.LOG_LEVELS = {DEBUG: 'DEBUG', INFO: 'INFO', WARN: 'WARN', ERROR: 'ERROR', NONE: 'NONE'};
Log.INCLUDE_MODULES_ALL = 'ALL';

Log.level = Log.LOG_LEVELS.INFO;
Log.includeModules = Log.INCLUDE_MODULES_ALL;

Log.isDebugEnabled = function() {
    return Log.level == Log.LOG_LEVELS.DEBUG;
}

Log.isInfoEnabled = function() {
    return Log.level == Log.LOG_LEVELS.INFO || Log.isDebugEnabled();
}

Log.isWarnEnabled = function() {
    return Log.level == Log.LOG_LEVELS.WARN || Log.isInfoEnabled();
}

Log.isErrorEnabled = function() {
    return Log.level == Log.LOG_LEVELS.ERROR || Log.isWarnEnabled();
}

Log.debug = function(message, moduleName) {
    if(Log.isDebugEnabled()) {
        Log._logStatement(Log.LOG_LEVELS.DEBUG, message, moduleName);
    }
}

Log.info = function(message, moduleName) {
    if(Log.isInfoEnabled()) {
        Log._logStatement(Log.LOG_LEVELS.INFO, message, moduleName);
    }
}

Log.warn = function(message, moduleName) {
    if(Log.isWarnEnabled()) {
        Log._logStatement(Log.LOG_LEVELS.WARN, message, moduleName);
    }
}

Log.error = function(message, moduleName) {
    if(Log.isErrorEnabled()) {
        Log._logStatement(Log.LOG_LEVELS.ERROR, message, moduleName);
    }
}

Log._logStatement = function(logLevel, message, moduleName) {
    if(typeof moduleName == 'undefined') {
        if(Log.includeModules == Log.INCLUDE_MODULES_ALL) { //only log messages with no module if there is no filter on modules
            console.log(logLevel + ': ' + message);
        }
    } else if(Log.includeModules == Log.INCLUDE_MODULES_ALL || _.includes(Log.includeModules, moduleName)) {
        console.log(logLevel + ' [' + moduleName + ']: ' + message);
    } else {
        
    }
}