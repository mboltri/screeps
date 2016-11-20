var BodyConstructor = {};

BodyConstructor.BODY_PARTS = {};
BodyConstructor.BODY_PARTS[MOVE]           = {NAME: MOVE,          IMPORTANCE: 8};
BodyConstructor.BODY_PARTS[WORK]           = {NAME: WORK,          IMPORTANCE: 2};
BodyConstructor.BODY_PARTS[CARRY]          = {NAME: CARRY,         IMPORTANCE: 7};
BodyConstructor.BODY_PARTS[ATTACK]         = {NAME: ATTACK,        IMPORTANCE: 3};
BodyConstructor.BODY_PARTS[RANGED_ATTACK]  = {NAME: RANGED_ATTACK, IMPORTANCE: 4};
BodyConstructor.BODY_PARTS[HEAL]           = {NAME: HEAL,          IMPORTANCE: 6};
BodyConstructor.BODY_PARTS[CLAIM]          = {NAME: CLAIM,         IMPORTANCE: 5};
BodyConstructor.BODY_PARTS[TOUGH]          = {NAME: TOUGH,         IMPORTANCE: 1};

BodyConstructor.PRIORITY = {
    HIGH:   1,
    MEDIUM: 2,
    LOW:    4
};

BodyConstructor.BODY_PART_LIMIT = MAX_CREEP_SIZE;

BodyConstructor.constructBody = function(priorityMap, energyLimit, partLimitMap) {
    var BODY_PARTS = BodyConstructor.BODY_PARTS;
    var energyConsumed = 0;
    var partsToInclude = Object.keys(priorityMap);
    var constructedBody = [];
    var partLimits = partLimitMap === undefined ? [] : partLimitMap;
    
    //build part limit map
    partsToInclude.forEach( function(bodyPart) {
        if(partLimits[bodyPart] === undefined) {
            partLimits[bodyPart] = BodyConstructor.BODY_PART_LIMIT;
        }
    });
    
    for(var i = 0; energyConsumed < energyLimit && constructedBody.length < BodyConstructor.BODY_PART_LIMIT && i < 1000; i++) {
        partsToInclude.forEach( function(bodyPart) {
            if(i % priorityMap[bodyPart] === 0) {
                var newCost = energyConsumed + BODYPART_COST[bodyPart];
                if(newCost <= energyLimit && partLimits[bodyPart] > 0) {
                    var insertIndex = _.sortedIndex(_.map(constructedBody, 'IMPORTANCE'), BODY_PARTS[bodyPart].IMPORTANCE);
                    constructedBody.splice(insertIndex, 0, BODY_PARTS[bodyPart]);
                    energyConsumed = newCost;
                    partLimits[bodyPart]--;
                } else {
                    _.pull(partsToInclude, bodyPart);
                }
            }
        });
    }
    return _.map(constructedBody, 'NAME');
};

var PRIORITY = BodyConstructor.PRIORITY;

/* Test 1 */
var priorityMap = {move: PRIORITY.LOW, carry: PRIORITY.LOW, work: PRIORITY.HIGH};
var body = BodyConstructor.constructBody(priorityMap, 550, {CARRY: 1});
console.log(JSON.stringify(body));