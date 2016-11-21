var RoleUpgrader = require('role.maintenance.upgrader');
var RoleHarvester = require('role.resource.harvester');
var RoleBuilder = require('role.maintenance.builder');

var RoleIndex = [RoleUpgrader, RoleHarvester, RoleBuilder];
module.exports = RoleIndex;

//TODO add a memory object to contain body types, counts, etc