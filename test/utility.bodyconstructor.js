var Log = require('logging.log');

var moduleName = 'utility.bodyconstructor';
var BodyConstructor = {};
module.exports = BodyConstructor;

BodyConstructor.BODY_PART_COSTS = {
    MOVE:           50,
    WORK:           100,
    CARRY:          50,
    ATTACK:         80,
    RANGED_ATTACK:  150,
    HEAL:           250,
    CLAIM:          600,
    TOUGH:          10
  };

  BodyConstructor.PRIORITY = {
    HIGH:   1,
    MEDIUM: 2,
    LOW:    4
  };
  
  BodyConstructor.BODY_PART_LIMIT = 50;

  BodyConstructor.constructBody = function(priorityMap, energyLimit) {
    var BODY_PART_COSTS = BodyConstructor.BODY_PART_COSTS;
    var energyConsumed = 0;
    var partsToInclude = Object.keys(priorityMap);
    var constructedBody = [];
    for(var i = 0; energyConsumed < energyLimit && constructedBody.length < BodyConstructor.BODY_PART_LIMIT; i++) {
      partsToInclude.forEach( function(bodyPart) {
        if(i % priorityMap[bodyPart] === 0) {
          var newCost = energyConsumed + BODY_PART_COSTS[bodyPart];
          if(newCost <= energyLimit) {
            constructedBody.push(bodyPart);
            energyConsumed = newCost;
          } else {
            _.pull(partsToInclude, bodyPart);
          }
        }
      });
    }
    return constructedBody;
  };