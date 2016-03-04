// First time through game loop.
if(this.initialized == undefined){
	console.log(scope);
	// Set Variables.

	// Determines if the scripts initialization has already occured.
	this.initialized = true;

	// The AI's player number.
	this.player = scope.getMyPlayerNumber();

	// The AI's team number.
	this.team = scope.getMyTeamNumber();

	// The AI's starting position.
	this.startPosition = scope.getStartLocationForPlayerNumber(this.Player);

	// The height of the map being played on.
	this.mapHeight = scope.getMapHeight();

	// The width of the map being played on.
	this.mapWidth = scope.getMapWidth();

	// A scout unit used to explore the map.
	this.scout = null;

	// An ordered collection of mine locations to scout.
	this.scoutOrder = [];

	// The minimum spacing around non castle buildings.
	this.baseSpacing = 2;

	// The number of watchtowers to build for each castle the player owns.
	this.watchtowersPerCastle = 0;

	// The maximum number of workers that should work each goldmine.
	this.workersPerGoldmine = 11;

	// The minimum army size the AI should have, under which only defensive behaviour will occur.
	this.minimumArmySize = 1;

	// The minimum army size the AI must attain before they become aggressive.
	this.attackArmySize = 10;

	// The number of additional troops the AI must have before investing in the next unit upgrade level.
	this.upgradeArmySize = 5;

	// A value indicating whether the AI should attack known or suspected enemy bases.
	this.attackMode = false;

	// The maximum diameter around the AIs base that it will try to build in.
	this.maxBaseSize = 30;

	// The team number of the neutral units.
	this.neutralTeam = 0;

	// The current mine (if any) targeted for expansion.
	this.expansionMine = null;

	// The maximum distance workers are allowed to remote mine under normal circumstances.
	this.maxGoldmineDistance = 10;

	// The maximum number of houses required to reach population cap.
	this.maxHouses = 10;

	// The name to use in the chat window.
	this.chatName = "ZChip";

	// The radius around a mine in which a castle cannot be built.
	this.minimumMineRadius = 7;

	// The amount of damage a unit must receive in one AI cycle to be considered under attack.
	this.attackedDamageThreshold = 10;

	// A list of goldmines suspected to harbour enemy bases.
	this.suspectedBases = [];

	// How close a unit must get to a goldmine to determine if there is an enemy base there.
	this.checkMineForBaseDistance = 2;

	// A list of player numbers participating in the game.
	var players = scope.getArrayOfPlayerNumbers();

	// A list of the AI's allies.
	this.allies = [];

	// A list of the AI's Opponents.
	this.opponents = [];
	for(i = 0; i < players.length; i++){
		var playerNumber = players[i];
		if(scope.getTeamNumber(playerNumber) == this.team){
			this.allies.push(playerNumber);
		}
		else if(playerNumber == 0){
			continue;
		}
		else{
			this.opponents.push(playerNumber);
		}
	}

	// A function that takes in a list of units, and a dictionary of their hit points last AI cycle and determines which of them has been attacked.
	this.getAttackedUnits = function(units, oldHitpoints){
		var attackedUnits = [];
		for(var i = 0; i < units.length; i++){
			var unit = units[i];
			var unitId = unit.getValue("id");
			var oldUnitHitpoints = oldHitpoints[unitId];
			if(oldUnitHitpoints != null && oldUnitHitpoints - this.getCurrentHP() > this.attackedDamageThreshold){
				attackedUnits.push(unit);
			}
		}

		return attackedUnits;
	}

	// Gets a dictionary with the current hit points of a set of units.
	this.getUnitHitpoints = function(units){
		var hitpoints = [];
		for(var i = 0; i < units.length; i++){
			var unit = units[i];
			hitpoints[unit.getValue("id")] = unit.getCurrentHP();
		}

		return hitpoints;
	}


	// Determines if a position is too close to a gold mine to build a castle.
	this.tooCloseToGoldMine = function(x, y){
		for(var i = 0; i < this.currentCycle.mines.length; i++){
			var mine = this.currentCycle.mines[i];
			var distance = this.getDistance(x, y, mine.getX(), mine.getY());
			if(distance < this.minimumMineRadius){
				return true;
			}
		}

		return false;
	};

	// Gets the distance between two points. (As the crow flies)
	this.getDistance = function(x1, y1, x2, y2){
		return Math.sqrt(Math.pow(x2 - x1,2)+ Math.pow(y2 - y1, 2));
	};

	// Say something in the chat window.
	this.say = function(message){
		scope.chatMsg(this.chatName + ": " + message);
	};

	// Thinks something in the chat window.
	this.think = function(message){
		scope.chatMsg(this.chatName + " is thinking: " + message);
	};

	// Gets the closest unit out of a list of units.
	this.getClosest = function(referenceUnit, targetUnits){
		var closest = null;
		var closestDistance = 99999;
		for(var i = 0; i < targetUnits.length; i++){
			var targetUnit = targetUnits[i];
			var distanceToTarget = this.getDistance(referenceUnit.getX(), referenceUnit.getY(), targetUnit.getX(), targetUnit.getY());
			if(distanceToTarget < closestDistance){
				closest = targetUnit;
				closestDistance = distanceToTarget;
			}
		}

		return closest;
	};

	// Assigns idle workers to mine.
	this.assignIdleWorkers = function(){
		console.log("Assigning Idle Workers.");
		var workers = scope.getUnits({type: "Worker", order: "Stop", player: this.player});

		for (var i = 0; i < workers.length; i++){
			var worker = workers[i];
			var closestBase = this.getClosest(worker, this.currentCycle.bases);
			if(closestBase != null){
				var closestMine = this.getClosest(closestBase, this.currentCycle.undepletedMines);
				if(closestMine != null){
					scope.order("Mine", [worker], {unit: closestMine}, false);
				}
			}
		}
	};

	// Determines if a castle can be built at the specified location.
	this.canPlaceCastle = function(x, y, mapWidth, mapHeight){
		if(x < 0 || y < 0 || x >= mapWidth || y >= mapHeight){
			return false;
		}

		var size = scope.getTypeFieldValue("castle", "size");

		for(var i = x ; i < x + size + 1 ; i++){
			for(var j = y; j < y + size + 1; j++){
				var positionPathable = scope.positionIsPathable(i, j);
				var positionOnRamp = scope.fieldIsRamp(i, j);
				var tooClose = this.tooCloseToGoldMine(i, j);
				if(!positionPathable || positionOnRamp || tooClose){
					return false;
				}
			}
		}

		return true;
	}

	// Determines if a building of the specified size can be built at the specified location.
	this.canPlaceBuilding = function(x, y, size, mapWidth, mapHeight, baseSpacing){
		if(x < 0 || y < 0 || x >= mapWidth || y >= mapHeight){
			return false;
		}

		for(var i = x - baseSpacing; i < x + size + baseSpacing; i++){
			for(var j = y - baseSpacing; j < y + size + baseSpacing; j++){
				var positionPathable = scope.positionIsPathable(i, j);
				var positionOnRamp = scope.fieldIsRamp(i, j);
				if(!positionPathable || positionOnRamp){
					return false;
				}
			}
		}

		return true;
	};

	// Spirals outward from a location, and returns an {x,y} coodinate of the first location that passes the validation.
	this.spiralSearch = function(startX, startY, validation){
		var x = 0,
			y = 0,
			delta = [0, -1],
			width = this.maxBaseSize,
			height = this.maxBaseSize;

		for (i = Math.pow(Math.max(width, height), 2); i>0; i--) {
			if ((-width/2 < x && x <= width/2)
					&& (-height/2 < y && y <= height/2)) {
				if(validation(startX + x,startY + y)){
					return {x: startX + x, y: startY + y};
				}
			}

			if (x === y
					|| (x < 0 && x === -y)
					|| (x > 0 && x === 1-y)){
				delta = [-delta[1], delta[0]]
			}

			x = x + delta[0];
			y = y + delta[1];
		}

		return null;
	}

	// Places a building of the specified type as close as it can to the specified castle.
	this.buildBuildingNearBuilding = function(baseBuilding, buildingType, checkMineRadius){
		console.log("Building " + buildingType);
		var cost = scope.getTypeFieldValue(buildingType.toLowerCase(), "cost");
		if(cost > scope.getGold()){
			return false;
		}

		var nonBuildingWorkers = [];
		for(var i = 0; i < this.currentCycle.workers.length; i++){
			var worker = this.currentCycle.workers[i];
			if(worker.getCurrentOrderName() == "Mine" || worker.getCurrentOrderName() == "Stop"){
				nonBuildingWorkers.push(worker);
			}
		}

		var closestWorker = this.getClosest(baseBuilding, nonBuildingWorkers);

		if(closestWorker == null){
			return false;
		}

		var buildingSize = scope.getTypeFieldValue(buildingType.toLowerCase(), "size");
		var self = this;
		var searchValidation;

		if(checkMineRadius == true){
			searchValidation = function(x, y){
				return self.canPlaceCastle(x, y, self.mapWidth, self.mapHeight);
			};
		}
		else{
			searchValidation = 	function(x, y){
				return self.canPlaceBuilding(x, y, buildingSize, self.mapWidth, self.mapHeight, self.baseSpacing);
			};
		}

		var buildPosition = this.spiralSearch(
			baseBuilding.getX(),
			baseBuilding.getY(),
			searchValidation
		);

		if(buildPosition == null){
			this.think("My base is too small.");
			this.baseSpacing = 1;
			this.maxBaseSize = this.maxBaseSize + 5;
			return false;
		}

		scope.order("Build " + buildingType, [closestWorker], {x: buildPosition.x, y: buildPosition.y}, false);
		return true;
	}

	// Gets all the upgrades in progress.
	this.getUpgradeOrders = function(){
		var forges = scope.getBuildings({type: "Forge", player: this.player});
		var upgrades = [];
		for(var i = 0; i < forges.length; i++){
			var forge = forges[i];

			var upgrade = forge.getUnitTypeNameInProductionQueAt(1);
			if(upgrade != null){
				upgrades.push(upgrade);
			}
		}

		return upgrades;
	}

	// Gets all the buildings workers are assigned to build.
	this.getBuildOrders = function(){
		var buildings = [];

		for(var i = 0; i < this.currentCycle.workers.length; i++){
			var worker = this.currentCycle.workers[i];
			var order = worker.getCurrentOrderName();

			if(order.startsWith("Build")){
				buildings.push(order.substring(6));
			}
		}

		return buildings;
	}

	// If units are adjacent to a mine, we no longer suspect an enemy base there.
	this.clearSuspicion = function(){
		var newSuspectedBases = [];
		for(var i = 0; i < this.suspectedBases.length; i++){
			var mine = this.suspectedBases[i];
			var clear = false;

			for(var j = 0; j < this.currentCycle.playerUnits.length; j++){
				var unit = this.currentCycle.playerUnits[j];
				if(this.getDistance(mine.getX(), mine.getY(), unit.getX(), unit.getY()) < this.checkMineForBaseDistance){
					clear = true;
				}
			}

			if(clear == false){
				newSuspectedBases.push(mine);
			}
		}

		this.suspectedBases = newSuspectedBases;
	}

	// Return the army to the base. The scout is excluded.
	this.returnArmyToBase = function(){
		var base = this.chooseBase();
		for(var i = 0; i < this.currentCycle.army.length; i++){
			var fighter = this.currentCycle.army[i];
			if(this.scout == null || !fighter.equals(this.scout)){
				scope.order("Moveto", [fighter], {unit: base});
			}
		}
	}

	// Gives combat units their orders.
	this.executeCombatOrders = function(){
		var i;
		console.log("Executing Combat Orders.");

		if(this.scout === undefined){
			this.scout = null;
		}

		if(this.scout != null && this.scout.getCurrentHP() < 1){
			if(this.scout.targetUnit != null){
				this.suspectedBases.push(this.scout.targetUnit);
				this.scout = null;
			}
		}

		if(this.attackMode == false && this.currentCycle.army.length > this.attackArmySize){
			this.think("I'm ready to attack!");
			this.attackMode = true;
		}
		else if(this.attackMode == true && this.currentCycle.army.length < this.minimumArmySize){
			this.think("My army has been decimated!");
			this.attackMode = false;
		}

		console.log("Attack Mode:" + this.attackMode);

		if(this.currentCycle.enemyUnits.length > 0){
			for(i = 0; i < this.currentCycle.army.length; i++){
				var fighter = this.currentCycle.army[i];
				if(this.scout == null || !fighter.equals(this.scout)){
					scope.order("AMove", [fighter], scope.getCenterOfUnits(this.currentCycle.enemyUnits));
				}
			}
		}
		else if(this.expansionMine != null){
			scope.order("AMove", this.currentCycle.army, {x: this.expansionMine.getX(), y: this.expansionMine.getY()});
		}
		else if(this.attackMode == false){
			this.returnArmyToBase();
		}
		else if(this.attackMode == true && this.currentCycle.enemyBuildings.length > 0){
			// TODO prioritize target.
			var targetBuilding = this.currentCycle.enemyBuildings[0];
			scope.order("AMove", this.currentCycle.army, {x: targetBuilding.getX(), y: targetBuilding.getY()});
		}
		else if(this.attackMode == true && this.suspectedBases.length > 0){

		}
		else{
			this.returnArmyToBase();
		}

		if(this.currentCycle.army.length > this.minimumArmySize && this.scout == null){
			this.scout = this.currentCycle.army[0];
			scope.order("Stop", [this.scout]);
			this.think("I've selected a new scout.");
		}

		if(this.scoutOrder.length == 0){
			var mines = this.prioritizeScoutMines();
			this.scoutOrder = this.scoutOrder.concat(mines);
		}

		if(this.scout != null){
			if(this.scout.getCurrentOrderName() == "Stop"){
				var mine = this.scoutOrder.shift();
				scope.order("Moveto", [this.scout], {unit: mine});
				this.think("Let's take a look over here...");
			}
		}
	};

	// Returns a prioritized list of mines to send the scout to.
	this.prioritizeScoutMines = function(){
		console.log("Prioritizing scouting");
		for (var i = 0; i < this.opponents.length; i++){
			var opponent = this.opponents[i];
			// TODO: prioritize enemy start locations.
			console.log(opponent);
			console.log(scope.getStartLocationForPlayerNumber(opponent));
		}

		return this.currentCycle.mines;
	};

	// Establishes the priorities for resource use.
	this.establishBuildPriority = function(){
		console.log("Prioritizing Build Order.");

		var priority = [];

		if(this.expansionMine != null){
			priority.push("expansion");
			return priority;
		}

		if(scope.getCurrentSupply() + 6 >= scope.getMaxSupply() && this.currentCycle.houses.length < this.maxHouses - this.currentCycle.castles.length){
			priority.push("house");
		}

		if(this.currentCycle.workers.length < this.workersPerGoldmine){
			priority.push("worker");
		}

		if(this.currentCycle.watchtowers.length < this.currentCycle.castles.length * this.watchtowersPerCastle){
			priority.push("watchtower");
		}

		if(this.currentCycle.forges.length < 1 && this.currentCycle.soldiers.length + this.currentCycle.archers.length > this.upgradeArmySize){
			priority.push("forge");
			if(scope.getGold() < scope.getTypeFieldValue("forge", "cost")){
				return priority;
			}
		}

		var damageUpgradeLevel = scope.getUpgradeLevel("Damage");
		if(this.currentCycle.forges.length > 0 && damageUpgradeLevel < 5 && this.currentCycle.army.length / this.upgradeArmySize > damageUpgradeLevel){
			priority.push("upgrade");
			if(this.getUpgradeOrders().length < this.currentCycle.forges.length && scope.getGold() < scope.getTypeFieldValue("upgattack", "cost") + (damageUpgradeLevel * 60)){
				return priority;
			}
		}

		priority.push("fighters");

		priority.push("barracks");

		return priority;
	};

	// Selects the most recently created base, assumed to be the one with the most gold left.
	this.chooseBase = function(){
		var castles = this.currentCycle.bases.sort(function(a, b){
			return b.getValue("tickOfCreation") - a.getValue("tickOfCreation");
		});
		return castles[0];
	};

	// Chooses a mine at which to expand if an expansion is deemed necessary.
	this.considerExpansion = function(){
		var castleCost = scope.getTypeFieldValue("castle", "cost");
		console.log("Considering Expansion");
		var previousBase = this.chooseBase();
		if(previousBase == null){
			//TODO: Whatever shall we do? Our base has been destroyed!
			this.expansionMine = null;
			return;
		}

		var closestMine = this.getClosest(previousBase, this.currentCycle.undepletedMines);
		if(closestMine == null){
			// Give up! There is no more gold to be had!
			this.expansionMine = null;
			return;
		}

		if(
			this.getDistance(closestMine.getX(), closestMine.getY(), previousBase.getX(), previousBase.getY()) > this.maxGoldmineDistance
			&& closestMine.getValue("gold") > castleCost
		){
			console.log("Reactive expansion");
			this.expansionMine  = closestMine;
			return;
		}

		if(closestMine.getValue("gold") < castleCost){
			var expansionCandidates = this.currentCycle.undepletedMines.filter(function(m){
				return m !== closestMine;
			});

			var nextMine = this.getClosest(previousBase, expansionCandidates);
			if(nextMine == null){
				// Give up! There is no more gold to be had!
				this.expansionMine = null;
				return;
			}

			if(
				this.getDistance(nextMine.getX(), nextMine.getY(), previousBase.getX(), previousBase.getY()) > this.maxGoldmineDistance
				&& nextMine.getValue("gold") > castleCost
			){
				console.log("Premptive expansion");
				this.expansionMine = nextMine;
				return;
			}
		}

		this.expansionMine = null;
		return;
	}

	// Builds buildings and trains units based off a priority queue
	this.executeBuildOrders = function(priority){
		console.log("Executing Build Orders.");
		console.log(priority);

		var workOrder;
		var buildingInProgress = false;
		if(this.currentCycle.playerBuildings.length + this.getBuildOrders().length != this.currentCycle.completeBuildings.length){
			buildingInProgress = true;
		}

		while(priority.length > 0){
			workOrder = priority.shift();

			if(workOrder == "expansion"){
				if(!buildingInProgress){
					var buildingStarted = this.buildBuildingNearBuilding(this.expansionMine, "Castle", true);
					if(buildingStarted){
						buildingInProgress = true;
						this.think("A man's home is his castle.");
					}
				}
			}

			if(workOrder == "house"){
				if(!buildingInProgress){
					var base = this.chooseBase();
					var buildingStarted = this.buildBuildingNearBuilding(base, "House", false);
					if(buildingStarted){
						buildingInProgress = true;
						this.think("We require additional pylons.");
					}
				}
			}

			if(workOrder == "worker"){
				var castles = this.currentCycle.castles;
				for(var i = 0; i < castles.length; i++){
					var castle = castles[i];
					if(castle.getUnitTypeNameInProductionQueAt(1) == null){
						scope.order("Train Worker", [castle], {}, false);
					}
				}
			}

			if(workOrder == "watchtower"){
				if(!buildingInProgress){
					var base = this.chooseBase();
					var buildingStarted = this.buildBuildingNearBuilding(base, "Watchtower", false);
					if(buildingStarted){
						buildingInProgress = true;
						this.think("Wolves beware!");
					}
				}
			}

			if(workOrder == "forge"){
				if(!buildingInProgress){
					var base = this.chooseBase();
					var buildingStarted = this.buildBuildingNearBuilding(base, "Forge", false);
					if(buildingStarted){
						buildingInProgress = true;
						this.think("Harder, better, faster, stronger.");
					}
				}
			}

			if(workOrder == "barracks"){
				if(!buildingInProgress){
					var base = this.chooseBase();
					var buildingStarted = this.buildBuildingNearBuilding(base, "Barracks", false);
					if(buildingStarted){
						buildingInProgress = true;
					}
				}
			}

			if(workOrder == "upgrade"){
				for(var i = 0; i < this.currentCycle.forges.length; i++){
					var forge = this.currentCycle.forges[i];
					if(forge.getUnitTypeNameInProductionQueAt(1) == null){
						scope.order("Attack Upgrade", [forge], {}, false);
					}
				}
			}

			if(workOrder == "fighters"){
				for(var i = 0; i < this.currentCycle.barracks.length; i++){
					var barrack = this.currentCycle.barracks[i];
					if(barrack.getUnitTypeNameInProductionQueAt(1) == null){
						if(this.currentCycle.soldiers.length > this.currentCycle.archers.length){
							scope.order("Train Archer", [barrack], {}, false);
						}
						else{
							scope.order("Train Soldier", [barrack], {}, false);
						}
					}
				}

			}
		}
	};

	// Repairs damaged buildings, or finishes buildings that were left incomplete.
	this.rebuildRepair = function(){
		var repairingWorkers = scope.getUnits({type: "Worker", player: this.player, order: "Repair"});
		var stoppedWorkers = scope.getUnits({type: "Worker", player: this.player, order: "Stop"});
		var miningWorkers = scope.getUnits({type: "Worker", player: this.player, order: "Mine"});
		var availibleWorkers = stoppedWorkers.concat(miningWorkers);
		var worker;
		var building;

		if(this.currentCycle.playerBuildings.length - this.currentCycle.completeBuildings > repairingWorkers.length){
			for(var j = 0; j < this.currentCycle.playerBuildings.length; j ++){
				building = this.currentCycle.playerBuildings[j];
				if(building.getRemainingBuildTime() != undefined && building.getRemainingBuildTime() != null && building.getRemainingBuildTime() > 0){
					worker = this.getClosest(building, availibleWorkers);
					if(worker != null){
						scope.order("Repair", [worker], {unit: building});
					}
				}
			}
		}

		if(repairingWorkers.length == 0){
			for(var i = 0; i < this.currentCycle.completeBuildings.length; i++){
				building = this.currentCycle.completeBuildings[i];

				if(building.getCurrentHP() < scope.getTypeFieldValue(building.getTypeName().toLowerCase(), "hp")){
					worker = this.getClosest(building, availibleWorkers);
					if(worker != null){
						scope.order("Repair", [worker], {unit: building});
						this.think("This is why we can't have nice things.");
					}
				}
			}
		}
	}

	// Gets all reusable information in the current game cycle.
	this.loadCurrentCycle = function(){
		var currentCycle = {};
		currentCycle.idleWorkers = scope.getUnits({type: "Worker", order: "Stop", player: this.player});
		currentCycle.miningWorkers = scope.getUnits({type: "Worker", player: this.player, order: "Mine"});
		currentCycle.availibleWorkers = currentCycle.idleWorkers.concat(currentCycle.miningWorkers);
		currentCycle.repairingWorkers = scope.getUnits({type: "Worker", player: this.player, order: "Repair"});
		currentCycle.soldiers = scope.getUnits({type: "Soldier", player: this.player});
		currentCycle.archers = scope.getUnits({type: "Archer", player: this.player});
		currentCycle.army = currentCycle.soldiers.concat(currentCycle.archers);
		currentCycle.workers = scope.getUnits({type: "Worker", player: this.player});
		currentCycle.playerUnits = scope.getUnits({player : this.player});

		currentCycle.buildings = scope.getBuildings({});
		currentCycle.playerBuildings = scope.getBuildings({player: this.player});
		currentCycle.completeBuildings = scope.getBuildings({player: this.player, onlyFinshed: true});
		currentCycle.castles = scope.getBuildings({type: "Castle", player: this.player});
		currentCycle.bases = currentCycle.castles;
		currentCycle.mines = scope.getBuildings({type: "Goldmine"});
		currentCycle.barracks = scope.getBuildings({type: "Barracks", player: this.player, onlyFinshed: true});
		currentCycle.forges = scope.getBuildings({type: "Forge", player: this.player, onlyFinshed: true});
		currentCycle.watchtowers = scope.getBuildings({type: "Watchtower", player: this.player});
		currentCycle.houses = scope.getBuildings({type: "House", player: this.player});

		var nonAlliedBuildings = scope.getBuildings({enemyOf: this.player});
		currentCycle.enemyBuildings = [];
		for(var i = 0; i < nonAlliedBuildings.length; i++){
			var building = nonAlliedBuildings[i];

			if(!building.isNeutral()){
				currentCycle.enemyBuildings.push(building);
			}
		}

		var nonAlliedUnits = scope.getUnits({enemyOf: this.player});
		currentCycle.enemyUnits = [];
		for(var i = 0; i < nonAlliedUnits.length; i++){
			var unit = nonAlliedUnits[i];

			if(!unit.isNeutral()){
				currentCycle.enemyUnits.push(unit);
			}
		}

		currentCycle.undepletedMines = [];
		for(var j = 0; j < currentCycle.mines.length; j++){
			var mine = currentCycle.mines[j];
			if(mine.getValue("gold") > 0){
				currentCycle.undepletedMines.push(mine);
			}
		}

		return currentCycle;
	};

	this.say("Prepare for oblivion!");
}

this.currentCycle = this.loadCurrentCycle();

console.log("SuspectedBases");
console.log(this.suspectedBases);

if(this.scout != null){
	console.log("Scout");
	console.log(this.scout);
}


this.considerExpansion();
this.assignIdleWorkers();
this.rebuildRepair();
this.executeBuildOrders(this.establishBuildPriority());
this.clearSuspicion();
this.executeCombatOrders();
