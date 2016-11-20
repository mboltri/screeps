var OK= 0;
var ERR_NOT_OWNER = -1;
var ERR_NO_PATH = -2;
var ERR_NAME_EXISTS = -3;
var ERR_BUSY = -4;
var ERR_NOT_FOUND = -5;
var ERR_NOT_ENOUGH_ENERGY = -6;
var ERR_NOT_ENOUGH_RESOURCES = -6;
var ERR_INVALID_TARGET = -7;
var ERR_FULL = -8;
var ERR_NOT_IN_RANGE = -9;
var ERR_INVALID_ARGS = -10;
var ERR_TIRED = -11;
var ERR_NO_BODYPART = -12;
var ERR_NOT_ENOUGH_EXTENSIONS = -6;
var ERR_RCL_NOT_ENOUGH = -14;
var ERR_GCL_NOT_ENOUGH = -15;

var FIND_EXIT_TOP = 1;
var FIND_EXIT_RIGHT = 3;
var FIND_EXIT_BOTTOM = 5;
var FIND_EXIT_LEFT = 7;
var FIND_EXIT = 10;
var FIND_CREEPS = 101;
var FIND_HOSTILE_CREEPS = 103;
var FIND_SOURCES_ACTIVE = 104;
var FIND_SOURCES = 105;
var FIND_DROPPED_ENERGY = 106;
var FIND_DROPPED_RESOURCES = 106;
var FIND_STRUCTURES = 107;
var FIND_MY_STRUCTURES = 108;
var FIND_HOSTILE_STRUCTURES = 109;
var FIND_FLAGS = 110;
var FIND_CONSTRUCTION_SITES = 111;
var FIND_MY_SPAWNS = 112;
var FIND_HOSTILE_SPAWNS = 113;
var FIND_MY_CONSTRUCTION_SITES = 114;
var FIND_HOSTILE_CONSTRUCTION_SITES = 115;
var FIND_MINERALS = 116;
var FIND_NUKES = 117;

var TOP = 1;
var TOP_RIGHT = 2;
var RIGHT = 3;
var BOTTOM_RIGHT = 4;
var BOTTOM = 5;
var BOTTOM_LEFT = 6;
var LEFT = 7;
var TOP_LEFT = 8;

var COLOR_RED = 1;
var COLOR_PURPLE = 2;
var COLOR_BLUE = 3;
var COLOR_CYAN = 4;
var COLOR_GREEN = 5;
var COLOR_YELLOW = 6;
var COLOR_ORANGE = 7;
var COLOR_BROWN = 8;
var COLOR_GREY = 9;
var COLOR_WHITE = 10;

var LOOK_CREEPS = "creep";
var LOOK_ENERGY = "energy";
var LOOK_RESOURCES = "resource";
var LOOK_SOURCES = "source";
var LOOK_MINERALS = "mineral";
var LOOK_STRUCTURES = "structure";
var LOOK_FLAGS = "flag";
var LOOK_CONSTRUCTION_SITES = "constructionSite";
var LOOK_NUKES = "nuke";
var LOOK_TERRAIN = "terrain";

var OBSTACLE_OBJECT_TYPES = ["spawn", "creep", "wall", "source", "constructedWall", "extension", "link", "storage", "tower", "observer", "powerSpawn", "powerBank", "lab", "terminal","nuker"];

var MOVE = "move";
var WORK = "work";
var CARRY = "carry";
var ATTACK = "attack";
var RANGED_ATTACK = "ranged_attack";
var TOUGH = "tough";
var HEAL = "heal";
var CLAIM = "claim";

var BODYPART_COST = {
    "move": 50,
    "work": 100,
    "attack": 80,
    "carry": 50,
    "heal": 250,
    "ranged_attack": 150,
    "tough": 10,
    "claim": 600
};

var CREEP_LIFE_TIME = 1500;
var CREEP_CLAIM_LIFE_TIME = 500;
var CREEP_CORPSE_RATE = 0.2;

var CARRY_CAPACITY = 50;
var HARVEST_POWER = 2;
var HARVEST_MINERAL_POWER = 1;
var REPAIR_POWER = 100;
var DISMANTLE_POWER = 50;
var BUILD_POWER = 5;
var ATTACK_POWER = 30;
var UPGRADE_CONTROLLER_POWER = 1;
var RANGED_ATTACK_POWER = 10;
var HEAL_POWER = 12;
var RANGED_HEAL_POWER = 4;
var REPAIR_COST = 0.01;
var DISMANTLE_COST = 0.005;

var RAMPART_DECAY_AMOUNT = 300;
var RAMPART_DECAY_TIME = 100;
var RAMPART_HITS = 1;
var RAMPART_HITS_MAX = {2: 300000, 3: 1000000, 4: 3000000, 5: 10000000, 6: 30000000, 7: 100000000, 8: 300000000};

var ENERGY_REGEN_TIME = 300;
var ENERGY_DECAY = 1000;

var SPAWN_HITS = 5000;
var SPAWN_ENERGY_START = 300;
var SPAWN_ENERGY_CAPACITY = 300;
var CREEP_SPAWN_TIME = 3;
var SPAWN_RENEW_RATIO = 1.2;

var SOURCE_ENERGY_CAPACITY = 3000;
var SOURCE_ENERGY_NEUTRAL_CAPACITY = 1500;
var SOURCE_ENERGY_KEEPER_CAPACITY = 4000;

var WALL_HITS = 1;
var WALL_HITS_MAX = 300000000;

var EXTENSION_HITS = 1000;
var EXTENSION_ENERGY_CAPACITY = {0: 50, 1: 50, 2: 50, 3: 50, 4: 50, 5: 50, 6: 50, 7: 100, 8: 200};

var ROAD_HITS = 5000;
var ROAD_WEAROUT = 1;
var ROAD_DECAY_AMOUNT = 100;
var ROAD_DECAY_TIME = 1000;

var LINK_HITS = 1000;
var LINK_HITS_MAX = 1000;
var LINK_CAPACITY = 800;
var LINK_COOLDOWN = 1;
var LINK_LOSS_RATIO = 0.03;

var STORAGE_CAPACITY = 1000000;
var STORAGE_HITS = 10000;

var STRUCTURE_SPAWN = "spawn";
var STRUCTURE_EXTENSION = "extension";
var STRUCTURE_ROAD = "road";
var STRUCTURE_WALL = "constructedWall";
var STRUCTURE_RAMPART = "rampart";
var STRUCTURE_KEEPER_LAIR = "keeperLair";
var STRUCTURE_PORTAL = "portal";
var STRUCTURE_CONTROLLER = "controller";
var STRUCTURE_LINK = "link";
var STRUCTURE_STORAGE = "storage";
var STRUCTURE_TOWER = "tower";
var STRUCTURE_OBSERVER = "observer";
var STRUCTURE_POWER_BANK = "powerBank";
var STRUCTURE_POWER_SPAWN = "powerSpawn";
var STRUCTURE_EXTRACTOR = "extractor";
var STRUCTURE_LAB = "lab";
var STRUCTURE_TERMINAL = "terminal";
var STRUCTURE_CONTAINER = "container";
var STRUCTURE_NUKER = "nuker";

var CONSTRUCTION_COST = {
    "spawn": 15000,
    "extension": 3000,
    "road": 300,
    "constructedWall": 1,
    "rampart": 1,
    "link": 5000,
    "storage": 30000,
    "tower": 5000,
    "observer": 8000,
    "powerSpawn": 100000,
    "extractor": 5000,
    "lab": 50000,
    "terminal": 100000,
    "container": 5000,
    "nuker": 100000
};
var CONSTRUCTION_COST_ROAD_SWAMP_RATIO = 5;

var CONTROLLER_LEVELS = {1: 200, 2: 45000, 3: 135000, 4: 405000, 5: 1215000, 6: 3645000, 7: 10935000};
var CONTROLLER_STRUCTURES = {
    "spawn": {0: 0, 1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 2, 8: 3},
    "extension": {0: 0, 1: 0, 2: 5, 3: 10, 4: 20, 5: 30, 6: 40, 7: 50, 8: 60},
    "link": {1: 0, 2: 0, 3: 0, 4: 0, 5: 2, 6: 3, 7: 4, 8: 6},
    "road": {0: 2500, 1: 2500, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
    "constructedWall": {1: 0, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
    "rampart": {1: 0, 2: 2500, 3: 2500, 4: 2500, 5: 2500, 6: 2500, 7: 2500, 8: 2500},
    "storage": {1: 0, 2: 0, 3: 0, 4: 1, 5: 1, 6: 1, 7: 1, 8: 1},
    "tower": {1: 0, 2: 0, 3: 1, 4: 1, 5: 2, 6: 2, 7: 3, 8: 6},
    "observer": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1},
    "powerSpawn": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1},
    "extractor": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1, 8: 1},
    "terminal": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 1, 7: 1, 8: 1},
    "lab": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 3, 7: 6, 8: 10},
    "container": {0: 5, 1: 5, 2: 5, 3: 5, 4: 5, 5: 5, 6: 5, 7: 5, 8: 5},
    "nuker": {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 1}
};
var CONTROLLER_DOWNGRADE = {1: 20000, 2: 5000, 3: 10000, 4: 20000, 5: 40000, 6: 60000, 7: 100000, 8: 150000};
var CONTROLLER_CLAIM_DOWNGRADE = 0.2;
var CONTROLLER_RESERVE = 1;
var CONTROLLER_RESERVE_MAX = 5000;
var CONTROLLER_MAX_UPGRADE_PER_TICK = 15;
var CONTROLLER_ATTACK_BLOCKED_UPGRADE = 1000;
var CONTROLLER_NUKE_BLOCKED_UPGRADE = 200;

var SAFE_MODE_DURATION = 20000;
var SAFE_MODE_COOLDOWN = 50000;
var SAFE_MODE_COST = 1000;

var TOWER_HITS = 3000;
var TOWER_CAPACITY = 1000;
var TOWER_ENERGY_COST = 10;
var TOWER_POWER_ATTACK = 600;
var TOWER_POWER_HEAL = 400;
var TOWER_POWER_REPAIR = 800;
var TOWER_OPTIMAL_RANGE = 5;
var TOWER_FALLOFF_RANGE = 20;
var TOWER_FALLOFF = 0.75;

var OBSERVER_HITS = 500;
var OBSERVER_RANGE = 10;

var POWER_BANK_HITS = 2000000;
var POWER_BANK_CAPACITY_MAX = 5000;
var POWER_BANK_CAPACITY_MIN = 500;
var POWER_BANK_CAPACITY_CRIT = 0.3;
var POWER_BANK_DECAY = 5000;
var POWER_BANK_HIT_BACK = 0.5;

var POWER_SPAWN_HITS = 5000;
var POWER_SPAWN_ENERGY_CAPACITY = 5000;
var POWER_SPAWN_POWER_CAPACITY = 100;
var POWER_SPAWN_ENERGY_RATIO = 50;

var EXTRACTOR_HITS = 500;
var EXTRACTOR_COOLDOWN = 5;

var LAB_HITS = 500;
var LAB_MINERAL_CAPACITY = 3000;
var LAB_ENERGY_CAPACITY = 2000;
var LAB_BOOST_ENERGY = 20;
var LAB_BOOST_MINERAL = 30;
var LAB_COOLDOWN = 10;
var LAB_REACTION_AMOUNT = 5;

var GCL_POW = 2.4;
var GCL_MULTIPLY = 1000000;
var GCL_NOVICE = 3;

var MODE_SIMULATION = "simulation";
var MODE_SURVIVAL = "survival";
var MODE_WORLD = "world";
var MODE_ARENA = "arena";

var TERRAIN_MASK_WALL = 1;
var TERRAIN_MASK_SWAMP = 2;
var TERRAIN_MASK_LAVA = 4;

var MAX_CONSTRUCTION_SITES = 100;
var MAX_CREEP_SIZE = 50;

var MINERAL_REGEN_TIME = 50000;
var MINERAL_MIN_AMOUNT = {
    "H": 35000,
    "O": 35000,
    "L": 35000,
    "K": 35000,
    "Z": 35000,
    "U": 35000,
    "X": 35000
};
var MINERAL_RANDOM_FACTOR = 2;

var MINERAL_DENSITY = {
    1: 15000,
    2: 35000,
    3: 70000,
    4: 100000
};
var MINERAL_DENSITY_PROBABILITY = {
    1: 0.1,
    2: 0.5,
    3: 0.9,
    4: 1.0
};
var MINERAL_DENSITY_CHANGE = 0.05;

var DENSITY_LOW = 1;
var DENSITY_MODERATE = 2;
var DENSITY_HIGH = 3;
var DENSITY_ULTRA = 4;

var TERMINAL_CAPACITY = 300000;
var TERMINAL_HITS = 3000;
var TERMINAL_SEND_COST = 0.1;
var TERMINAL_MIN_SEND = 100;

var CONTAINER_HITS = 250000;
var CONTAINER_CAPACITY = 2000;
var CONTAINER_DECAY = 5000;
var CONTAINER_DECAY_TIME = 100;
var CONTAINER_DECAY_TIME_OWNED = 500;

var NUKER_HITS = 1000;
var NUKER_COOLDOWN = 100000;
var NUKER_ENERGY_CAPACITY = 300000;
var NUKER_GHODIUM_CAPACITY = 5000;
var NUKE_LAND_TIME = 50000;
var NUKE_RANGE = 10;
var NUKE_DAMAGE = {
    0: 10000000,
    2: 5000000
};

var PORTAL_DECAY = 30000;

var ORDER_SELL = "sell";
var ORDER_BUY = "buy";

var MARKET_FEE = 0.05;

var FLAGS_LIMIT = 10000;

var SUBSCRIPTION_TOKEN = "token";

var RESOURCE_ENERGY = "energy";
var RESOURCE_POWER = "power";

var RESOURCE_HYDROGEN = "H";
var RESOURCE_OXYGEN = "O";
var RESOURCE_UTRIUM = "U";
var RESOURCE_LEMERGIUM = "L";
var RESOURCE_KEANIUM = "K";
var RESOURCE_ZYNTHIUM = "Z";
var RESOURCE_CATALYST = "X";
var RESOURCE_GHODIUM = "G";

var RESOURCE_HYDROXIDE = "OH";
var RESOURCE_ZYNTHIUM_KEANITE = "ZK";
var RESOURCE_UTRIUM_LEMERGITE = "UL";

var RESOURCE_UTRIUM_HYDRIDE = "UH";
var RESOURCE_UTRIUM_OXIDE = "UO";
var RESOURCE_KEANIUM_HYDRIDE = "KH";
var RESOURCE_KEANIUM_OXIDE = "KO";
var RESOURCE_LEMERGIUM_HYDRIDE = "LH";
var RESOURCE_LEMERGIUM_OXIDE = "LO";
var RESOURCE_ZYNTHIUM_HYDRIDE = "ZH";
var RESOURCE_ZYNTHIUM_OXIDE = "ZO";
var RESOURCE_GHODIUM_HYDRIDE = "GH";
var RESOURCE_GHODIUM_OXIDE = "GO";

var RESOURCE_UTRIUM_ACID = "UH2O";
var RESOURCE_UTRIUM_ALKALIDE = "UHO2";
var RESOURCE_KEANIUM_ACID = "KH2O";
var RESOURCE_KEANIUM_ALKALIDE = "KHO2";
var RESOURCE_LEMERGIUM_ACID = "LH2O";
var RESOURCE_LEMERGIUM_ALKALIDE = "LHO2";
var RESOURCE_ZYNTHIUM_ACID = "ZH2O";
var RESOURCE_ZYNTHIUM_ALKALIDE = "ZHO2";
var RESOURCE_GHODIUM_ACID = "GH2O";
var RESOURCE_GHODIUM_ALKALIDE = "GHO2";

var RESOURCE_CATALYZED_UTRIUM_ACID = "XUH2O";
var RESOURCE_CATALYZED_UTRIUM_ALKALIDE = "XUHO2";
var RESOURCE_CATALYZED_KEANIUM_ACID = "XKH2O";
var RESOURCE_CATALYZED_KEANIUM_ALKALIDE = "XKHO2";
var RESOURCE_CATALYZED_LEMERGIUM_ACID = "XLH2O";
var RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE = "XLHO2";
var RESOURCE_CATALYZED_ZYNTHIUM_ACID = "XZH2O";
var RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE = "XZHO2";
var RESOURCE_CATALYZED_GHODIUM_ACID = "XGH2O";
var RESOURCE_CATALYZED_GHODIUM_ALKALIDE = "XGHO2";

var REACTIONS = {
    H: {
        O: "OH",
        L: "LH",
        K: "KH",
        U: "UH",
        Z: "ZH",
        G: "GH"
    },
    O: {
        H: "OH",
        L: "LO",
        K: "KO",
        U: "UO",
        Z: "ZO",
        G: "GO"
    },
    Z: {
        K: "ZK",
        H: "ZH",
        O: "ZO"
    },
    L: {
        U: "UL",
        H: "LH",
        O: "LO"
    },
    K: {
        Z: "ZK",
        H: "KH",
        O: "KO"
    },
    G: {
        H: "GH",
        O: "GO"
    },
    U: {
        L: "UL",
        H: "UH",
        O: "UO"
    },
    OH: {
        UH: "UH2O",
        UO: "UHO2",
        ZH: "ZH2O",
        ZO: "ZHO2",
        KH: "KH2O",
        KO: "KHO2",
        LH: "LH2O",
        LO: "LHO2",
        GH: "GH2O",
        GO: "GHO2"
    },
    X: {
        UH2O: "XUH2O",
        UHO2: "XUHO2",
        LH2O: "XLH2O",
        LHO2: "XLHO2",
        KH2O: "XKH2O",
        KHO2: "XKHO2",
        ZH2O: "XZH2O",
        ZHO2: "XZHO2",
        GH2O: "XGH2O",
        GHO2: "XGHO2"
    },
    ZK: {
        UL: "G"
    },
    UL: {
        ZK: "G"
    },
    LH: {
        OH: "LH2O"
    },
    ZH: {
        OH: "ZH2O"
    },
    GH: {
        OH: "GH2O"
    },
    KH: {
        OH: "KH2O"
    },
    UH: {
        OH: "UH2O"
    },
    LO: {
        OH: "LHO2"
    },
    ZO: {
        OH: "ZHO2"
    },
    KO: {
        OH: "KHO2"
    },
    UO: {
        OH: "UHO2"
    },
    GO: {
        OH: "GHO2"
    },
    LH2O: {
        X: "XLH2O"
    },
    KH2O: {
        X: "XKH2O"
    },
    ZH2O: {
        X: "XZH2O"
    },
    UH2O: {
        X: "XUH2O"
    },
    GH2O: {
        X: "XGH2O"
    },
    LHO2: {
        X: "XLHO2"
    },
    UHO2: {
        X: "XUHO2"
    },
    KHO2: {
        X: "XKHO2"
    },
    ZHO2: {
        X: "XZHO2"
    },
    GHO2: {
        X: "XGHO2"
    }
};

var BOOSTS = {
    work: {
        UO: {
            harvest: 2
        },
        UHO2: {
            harvest: 3
        },
        XUHO2: {
            harvest: 4
        },
        LH: {
            build: 1.3,
            repair: 1.3
        },
        LH2O: {
            build: 1.65,
            repair: 1.65
        },
        XLH2O: {
            build: 2,
            repair: 2
        },
        ZH: {
            dismantle: 2
        },
        ZH2O: {
            dismantle: 3
        },
        XZH2O: {
            dismantle: 4
        },
        GH: {
            upgradeController: 1.3
        },
        GH2O: {
            upgradeController: 1.65
        },
        XGH2O: {
            upgradeController: 2
        }
    },
    attack: {
        UH: {
            attack: 2
        },
        UH2O: {
            attack: 3
        },
        XUH2O: {
            attack: 4
        }
    },
    ranged_attack: {
        KO: {
            rangedAttack: 2,
            rangedMassAttack: 2
        },
        KHO2: {
            rangedAttack: 3,
            rangedMassAttack: 3
        },
        XKHO2: {
            rangedAttack: 4,
            rangedMassAttack: 4
        }
    },
    heal: {
        LO: {
            heal: 2,
            rangedHeal: 2
        },
        LHO2: {
            heal: 3,
            rangedHeal: 3
        },
        XLHO2: {
            heal: 4,
            rangedHeal: 4
        }
    },
    carry: {
        KH: {
            capacity: 2
        },
        KH2O: {
            capacity: 3
        },
        XKH2O: {
            capacity: 4
        }
    },
    move: {
        ZO: {
            fatigue: 2
        },
        ZHO2: {
            fatigue: 3
        },
        XZHO2: {
            fatigue: 4
        }
    },
    tough: {
        GO: {
            damage: 0.7
        },
        GHO2: {
            damage: 0.5
        },
        XGHO2: {
            damage: 0.3
        }
    }
};


var BODYPARTS_ALL = [
    MOVE,
    WORK,
    CARRY,
    ATTACK,
    RANGED_ATTACK,
    TOUGH,
    HEAL,
    CLAIM
];

var RESOURCES_ALL = [
    RESOURCE_ENERGY,
    RESOURCE_POWER,

    RESOURCE_HYDROGEN,
    RESOURCE_OXYGEN,
    RESOURCE_UTRIUM,
    RESOURCE_KEANIUM,
    RESOURCE_LEMERGIUM,
    RESOURCE_ZYNTHIUM,
    RESOURCE_CATALYST,
    RESOURCE_GHODIUM,

    RESOURCE_HYDROXIDE,
    RESOURCE_ZYNTHIUM_KEANITE,
    RESOURCE_UTRIUM_LEMERGITE,

    RESOURCE_UTRIUM_HYDRIDE,
    RESOURCE_UTRIUM_OXIDE,
    RESOURCE_KEANIUM_HYDRIDE,
    RESOURCE_KEANIUM_OXIDE,
    RESOURCE_LEMERGIUM_HYDRIDE,
    RESOURCE_LEMERGIUM_OXIDE,
    RESOURCE_ZYNTHIUM_HYDRIDE,
    RESOURCE_ZYNTHIUM_OXIDE,
    RESOURCE_GHODIUM_HYDRIDE,
    RESOURCE_GHODIUM_OXIDE,

    RESOURCE_UTRIUM_ACID,
    RESOURCE_UTRIUM_ALKALIDE,
    RESOURCE_KEANIUM_ACID,
    RESOURCE_KEANIUM_ALKALIDE,
    RESOURCE_LEMERGIUM_ACID,
    RESOURCE_LEMERGIUM_ALKALIDE,
    RESOURCE_ZYNTHIUM_ACID,
    RESOURCE_ZYNTHIUM_ALKALIDE,
    RESOURCE_GHODIUM_ACID,
    RESOURCE_GHODIUM_ALKALIDE,

    RESOURCE_CATALYZED_UTRIUM_ACID,
    RESOURCE_CATALYZED_UTRIUM_ALKALIDE,
    RESOURCE_CATALYZED_KEANIUM_ACID,
    RESOURCE_CATALYZED_KEANIUM_ALKALIDE,
    RESOURCE_CATALYZED_LEMERGIUM_ACID,
    RESOURCE_CATALYZED_LEMERGIUM_ALKALIDE,
    RESOURCE_CATALYZED_ZYNTHIUM_ACID,
    RESOURCE_CATALYZED_ZYNTHIUM_ALKALIDE,
    RESOURCE_CATALYZED_GHODIUM_ACID,
    RESOURCE_CATALYZED_GHODIUM_ALKALIDE
];

var COLORS_ALL = [
    COLOR_RED,
    COLOR_PURPLE,
    COLOR_BLUE,
    COLOR_CYAN,
    COLOR_GREEN,
    COLOR_YELLOW,
    COLOR_ORANGE,
    COLOR_BROWN,
    COLOR_GREY,
    COLOR_WHITE
];