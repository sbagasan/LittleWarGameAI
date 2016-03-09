/// <reference path="./ZChip-API.ts"/>

// The possible actions that can be taken by the construction commander.
enum ConstructionCommanderAction{
  Expand,
  BuildHouse,
  BuildWatchtower,
  BuildForge,
  BuildBarracks,
  UpgradeAttack,
  TrainWorker,
  TrainFighters
}

// Provides access to cached copies of scope data.
class Cache{
  private _scope: ZChipAPI.Scope;

  // Gets a list of the player's idle workers.
  private _idleWorkers: ZChipAPI.Unit[];
  get idleWorkers(): ZChipAPI.Unit[]{
    if(this._idleWorkers == null){
      this._idleWorkers = this._scope.getUnits({type: ZChipAPI.UnitType.Worker, order: ZChipAPI.OrderType.Stop, player: this._scope.playerNumber});
    }

    return this._idleWorkers;
  };

  // Gets a list of the player's mining workers.
  private _miningWorkers: ZChipAPI.Unit[];
  get miningWorkers(): ZChipAPI.Unit[]{
    if(this._miningWorkers == null){
      this._miningWorkers = this._scope.getUnits({type: ZChipAPI.UnitType.Worker, order: ZChipAPI.OrderType.Mine, player: this._scope.playerNumber});
    }

    return this._miningWorkers;
  };

  // Gets a list of the players idle of mining workers availible for other tasks.
  private _availibleWorkers: ZChipAPI.Unit[];
  get availibleWorkers(): ZChipAPI.Unit[]{
    if(this._availibleWorkers == null){
      this._availibleWorkers = this.idleWorkers.concat(this.miningWorkers);
    }

    return this._availibleWorkers;
  };

  // Gets a list of the player's workers which are repairing or building.
  private _repairingWorkers: ZChipAPI.Unit[];
  get repairingWorkers(): ZChipAPI.Unit[]{
    if(this._repairingWorkers == null){
      this._repairingWorkers = this._scope.getUnits({type: ZChipAPI.UnitType.Worker, order: ZChipAPI.OrderType.Repair, player: this._scope.playerNumber});
    }

    return this._repairingWorkers;
  };

  // Gets a list of the player's workers.
  private _workers: ZChipAPI.Worker[];
  get workers(): ZChipAPI.Worker[]{
    if(this._workers == null){
      this._workers = <ZChipAPI.Worker[]>this._scope.getUnits({type: ZChipAPI.UnitType.Worker, player: this._scope.playerNumber});
    }

    return this._workers;
  };

  // Gets a list of the player's soldiers.
  private _soldiers: ZChipAPI.Unit[];
  get soldiers(): ZChipAPI.Unit[]{
    if(this._soldiers == null){
      this._soldiers = this._scope.getUnits({type: "Soldier", player: this._scope.playerNumber});
    }

    return this._soldiers;
  };

  // Gets a list of the player's archers.
  private _archers: ZChipAPI.Unit[];
  get archers(): ZChipAPI.Unit[]{
    if(this._archers == null){
      this._archers = this._scope.getUnits({type: "Archer", player: this._scope.playerNumber});
    }

    return this._archers;
  };

  // Gets a list of the player's army units.
  private _army: ZChipAPI.Unit[];
  get army(): ZChipAPI.Unit[]{
    if(this._army == null){
      this._army = this._scope.getUnits({notOftype: ZChipAPI.UnitType.Worker, player: this._scope.playerNumber});
    }

    return this._army;
  };

  // Gets a list of the player's units.
  private _units: ZChipAPI.Unit[];
  get units(): ZChipAPI.Unit[]{
    if(this._units == null){
      this._units = this._scope.getUnits({player: this._scope.playerNumber});
    }

    return this._units;
  };

  // Gets a list of the player's buildings.
  private _buildings: ZChipAPI.Building[];
  get buildings(): ZChipAPI.Building[]{
    if(this._buildings == null){
      this._buildings = this._scope.getBuildings({player: this._scope.playerNumber});
    }

    return this._buildings;
  };

  // Gets a list of the player's complete buildings.
  private _completeBuildings: ZChipAPI.Building[];
  get completeBuildings(): ZChipAPI.Building[]{
    if(this._completeBuildings == null){
      this._completeBuildings = this._scope.getBuildings({player: this._scope.playerNumber, onlyFinshed: true});
    }

    return this._completeBuildings;
  };

  // Gets a list of the player's castles.
  private _castles: ZChipAPI.ProductionBuilding[];
  get castles(): ZChipAPI.ProductionBuilding[]{
    if(this._castles == null){
      this._castles = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: "Castle"});
    }

    return this._castles;
  };

  // Gets a list of the mines on the map.
  private _mines: ZChipAPI.Mine[];
  get mines(): ZChipAPI.Mine[]{
    if(this._mines == null){
      this._mines = this._scope.getBuildings({type: "Goldmine"}).map(
        (building: ZChipAPI.Building) =>{
          return <ZChipAPI.Mine>building;
        }
      );
    }

    return this._mines;
  };

  // Gets a list of the player's barracks.
  private _barracks: ZChipAPI.ProductionBuilding[];
  get barracks(): ZChipAPI.ProductionBuilding[]{
    if(this._barracks == null){
      this._barracks = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: "Barracks"});
    }

    return this._barracks;
  };

  // Gets a list of the player's forges.
  private _forges: ZChipAPI.Building[];
  get forges(): ZChipAPI.Building[]{
    if(this._forges == null){
      this._forges = this._scope.getBuildings({player: this._scope.playerNumber, type: "Forge"});
    }

    return this._forges;
  };

  // Gets a list of the player's watchtowers.
  private _watchtowers: ZChipAPI.Building[];
  get watchtowers(): ZChipAPI.Building[]{
    if(this._watchtowers == null){
      this._watchtowers = this._scope.getBuildings({player: this._scope.playerNumber, type: "Watchtower"});
    }

    return this._watchtowers;
  };

  // Gets a list of the player's houses.
  private _houses: ZChipAPI.Building[];
  get houses(): ZChipAPI.Building[]{
    if(this._houses == null){
      this._houses = this._scope.getBuildings({player: this._scope.playerNumber, type: "House"});
    }

    return this._houses;
  };

  // Gets a list of enemy buildings that have been discoverd.
  private _enemyBuildings: ZChipAPI.Building[];
  get enemyBuildings(): ZChipAPI.Building[]{
    if(this._enemyBuildings == null){
      this._enemyBuildings = this._scope.getBuildings({enemyOf: this._scope.playerNumber}).filter(
        (building: ZChipAPI.Building) => {
          return !building.isNeutral;
        }
      );
    }

    return this._enemyBuildings;
  }

  // Gets a list of enemy units that are visible.
  private _enemyUnits: ZChipAPI.Unit[];
  get enemyUnits():ZChipAPI.Unit[]{
    if(this._enemyUnits == null){
      this._enemyUnits = this._scope.getUnits({enemyOf: this._scope.playerNumber}).filter(
        (unit: ZChipAPI.Unit) =>{
          return !unit.isNeutral;
        }
      );
    }

    return this._enemyUnits;
  }

  private _undepletedMines: ZChipAPI.Mine[];
  get undepletedMines():ZChipAPI.Mine[]{
    if(this._undepletedMines == null){
      this._undepletedMines = this.mines.filter(
        (mine: ZChipAPI.Mine) => {
          return mine.gold > 0;
        }
      );
    }

    return this._undepletedMines;
  }

  constructor(scope: ZChipAPI.Scope){
    this._scope = scope;
  }
}

// A base commander class that holds the scope and cache.
class CommanderBase{
  // A cache of data from the scope object.
  protected _cache: Cache;

  // The scope object.
  protected _scope: ZChipAPI.Scope

  // Sets the scope and the scope cache. Should be called once per cycle.
  setScope(scope: ZChipAPI.Scope, cache: Cache){
    this._scope = scope;
    this._cache = cache;
  }

  constructor(){
  }
}

class EconomyCommander extends CommanderBase{
  // The maximum distance workers are allowed to remote mine under normal circumstances.
  private _maxMineDistance: number;

  // The maximum number of workers that should work each goldmine.
  private _maxWorkersPerGoldmine: number;

  constructor(maxMineDistance: number, maxWorkersPerGoldmine: number){
    super();

    this._maxMineDistance = maxMineDistance;
    this._maxWorkersPerGoldmine = maxWorkersPerGoldmine;
  }

  // Gets the desired number of workers.
  get targetWorkerCount(): number{
    // TODO: Adjust for worker splitting.
    return this._maxWorkersPerGoldmine;
  }

  // Chooses a mine to expand to, or returns null if no expansion is warranted.
  considerExpansion(currentBase: ZChipAPI.Building): ZChipAPI.Mine{
    console.log("Considering Expansion");
    if(currentBase == null){
      // TODO: Choose a better action if we have no base.
      return null;
    }

    var castleCost: number = this._scope.getBuildingTypeFieldValue(ZChipAPI.BuildingType.Castle, ZChipAPI.TypeField.Cost);
    var closestMine: ZChipAPI.Mine = <ZChipAPI.Mine>this._scope.getClosest(currentBase, this._cache.undepletedMines);
    if(closestMine == null){
      // Give up. There is no more gold to be had.
      return null;
    }

    if(
			this._scope.getDistance(closestMine.x, closestMine.y, currentBase.x, currentBase.y) > this._maxMineDistance
			&& closestMine.gold > castleCost
		){
			console.log("Reactive expansion");
			return closestMine;
		}

    if(closestMine.gold < castleCost){
      var expansionCandidates = this._cache.undepletedMines.filter(function(m){
				return m !== closestMine;
			});

      var nextMine: ZChipAPI.Mine = <ZChipAPI.Mine>this._scope.getClosest(currentBase, expansionCandidates);
      if(nextMine == null){
        // Give up. There is no more gold to be had.
        return null;
      }

      if(
        this._scope.getDistance(nextMine.x, nextMine.y, currentBase.x, currentBase.y)> this._maxMineDistance
        && nextMine.gold > castleCost
      ){
        console.log("Premptive expansion");
        return nextMine;
      }
    }

    return null;
  }

  // Assigns idle workers to mine.
  assignIdleWorkers(){
    console.log("Assigning Idle Workers.");

    // Not using cache, because worker orders may have changed.
    var workers = <ZChipAPI.Worker[]>this._scope.getUnits({type: ZChipAPI.UnitType.Worker, order: ZChipAPI.OrderType.Stop, player: this._scope.playerNumber});

    for (var i = 0; i < workers.length; i++){
      var worker = workers[i];
      var closestBase = this._scope.getClosest(worker, this._cache.castles);
      if(closestBase != null){
        var closestMine = <ZChipAPI.Mine>this._scope.getClosest(closestBase, this._cache.undepletedMines);
        if(closestMine != null){
          worker.mine(closestMine);
        }
      }
    }
  };
}

class ConstructionCommander extends CommanderBase{
  // The minimum spacing around non castle buildings.
  private _baseSpacing: number;

  // The number of watchtowers to build for each castle the player owns.
  private _watchtowersPerCastle: number;

  // The maximum diameter around the AIs base that it will try to build in.
  private _maxBaseSize: number;

  // The number of free supply left before a farm will be constructed.
  private _supplyBuffer: number;

  // Repair dammaged buildings or finishes buildings that were left incomplete.
  rebuildAndRepair(){
    var repairingWorkers: ZChipAPI.Worker[] = < ZChipAPI.Worker[]>this._scope.getUnits({type: ZChipAPI.UnitType.Worker, player:this._scope.playerNumber, order: ZChipAPI.OrderType.Repair});
    var stoppedWorkers : ZChipAPI.Worker[] = < ZChipAPI.Worker[]> this._scope.getUnits({type: ZChipAPI.UnitType.Worker, player:this._scope.playerNumber, order: ZChipAPI.OrderType.Stop});
    var miningWorkers : ZChipAPI.Worker[] = < ZChipAPI.Worker[]> this._scope.getUnits({type: ZChipAPI.UnitType.Worker, player:this._scope.playerNumber, order: ZChipAPI.OrderType.Mine});
    var availibleWorkers:ZChipAPI.Worker[] = stoppedWorkers.concat(miningWorkers);

    if(this._cache.buildings.length - this._cache.completeBuildings.length > repairingWorkers.length){
			for(let i: number = 0; i < this._cache.buildings.length; i++){
				let building: ZChipAPI.Building = this._cache.buildings[i];
				if(!building.isFinished){
					let worker: ZChipAPI.Worker = <ZChipAPI.Worker>this._scope.getClosest(building, availibleWorkers);
					if(worker != null){
						worker.repair(building);
					}
				}
			}
		}

		if(repairingWorkers.length == 0){
			for(let i:number = 0; i < this._cache.completeBuildings.length; i++){
				let building = this._cache.completeBuildings[i];

				if(building.hitpoints < this._scope.getBuildingTypeFieldValue(building.type, ZChipAPI.TypeField.MaxHitpoints)){
					let worker: ZChipAPI.Worker = <ZChipAPI.Worker>this._scope.getClosest(building, availibleWorkers);
					if(worker != null){
            this._scope.chatMessage("General Z is thinking: This is why we can't have nice things.");
            worker.repair(building);
					}
				}
			}
    }
  }

  // Determines if a building can be placed at the specified location.
  canPlaceBuilding(type:ZChipAPI.BuildingType, x:number, y:number, margin: number ): boolean{
    var size = this._scope.getBuildingTypeFieldValue(type, ZChipAPI.TypeField.Size);

    for(let i = x - margin; i < x + size + margin; i++){
      for(let j = y - margin; j < y + size + margin; j++){
        if(x < 0 || y < 0 || x >= this._scope.mapWidth || y > this._scope.mapHeight) {
          return false;
        }

        var positionPathable:boolean = this._scope.positionIsPathable(i, j);
        var positionOnRamp:boolean = this._scope.positionIsOnRamp(i, j);
        var positionIsNearMine:boolean = null;

        // We don't care if we're near a mine unless it is a castle.
        if(type = ZChipAPI.BuildingType.Castle){
          positionIsNearMine= this._scope.positionIsNearMine(i, j);
        }

        if(!positionPathable || positionOnRamp || positionIsNearMine){
          return false;
        }
      }
    }

    return true;
  }

  // Attpmts to build the specified building at a position. Returns true if success, otherwise false.
  buildBuildingNearBuilding(baseBuilding: ZChipAPI.Building, type: ZChipAPI.BuildingType):boolean{
    console.log("Building " + type.toString());
    var cost = this._scope.getBuildingTypeFieldValue(type, ZChipAPI.TypeField.Cost);
    if(cost > this._scope.currentGold){
      return false;
    }

    // Not using cache, because worker orders may have changed.
    var nonBuildingWorkers: ZChipAPI.Worker[] = [];
    for(var i = 0; i < this._cache.workers.length; i++){
      var worker = this._cache.workers[i];
      if(worker.currentOrder == ZChipAPI.OrderType.Mine || worker.currentOrder == ZChipAPI.OrderType.Stop){
        nonBuildingWorkers.push(worker);
      }
    }

    var closestWorker: ZChipAPI.Worker = <ZChipAPI.Worker>this._scope.getClosest(baseBuilding, nonBuildingWorkers);

    if(closestWorker == null){
      return false;
    }

    var buildPosition: ZChipAPI.Point = Util.spiralSearch(
      baseBuilding.x,
      baseBuilding.y,
      (x:number, y:number):boolean =>{
        return this.canPlaceBuilding(type, x, y, this._baseSpacing);
      },
      this._maxBaseSize);

    if(buildPosition == null){
      this._scope.chatMessage("General Z is thinking: My base is too small.");
      this._baseSpacing = 1;
      this._maxBaseSize += 5;
      return false;
    }

    closestWorker.build(type, buildPosition.x, buildPosition.y);
    return true;
  }

  // Gets a list of all the buildings that are ordered but are not currently being built.
  getPendingBuildOrders(): ZChipAPI.BuildingType[]{
    var buildings: ZChipAPI.BuildingType[] = [];

    for(let i = 0; i < this._cache.workers.length; i++){
      var building: ZChipAPI.BuildingType = this._cache.workers[i].currentlyBuilding;
      if(building != null){
        buildings.push(building);
      }
    }

    return buildings;
  }

  // TODO: Get Current Upgrades.

  // Executes the build orders as determined by the priority.
  executeBuildOrders(priority: ConstructionCommanderAction[], expansionTarget: ZChipAPI.Mine, currentBase:ZChipAPI.Building, prefferedArmyUnit: ZChipAPI.UnitType){
    console.log("Executing Build Orders.");

    var buildingInProgress = false;
    if(this._cache.buildings.length + this.getPendingBuildOrders().length > this._cache.completeBuildings.length){
      buildingInProgress = true;
    }

    while(priority.length > 0){
      let workOrder: ConstructionCommanderAction = priority.shift();

      switch(workOrder){
        case ConstructionCommanderAction.Expand:
          if(!buildingInProgress && expansionTarget != null){
            let buildingStarted = this.buildBuildingNearBuilding(expansionTarget, ZChipAPI.BuildingType.Castle);

            if(buildingStarted){
              buildingInProgress = true;
              this._scope.chatMessage("General Z is thinking: A man's home is his castle.");
            }
          }
          break;
        case ConstructionCommanderAction.BuildHouse:
          if(!buildingInProgress){
            let buildingStarted = this.buildBuildingNearBuilding(currentBase, ZChipAPI.BuildingType.House);

            if(buildingStarted){
              buildingInProgress = true;
              this._scope.chatMessage("General Z is thinking: We require additional pylons.");
            }
          }
          break;
        case ConstructionCommanderAction.TrainWorker:
          for(let i = 0; i < this._cache.castles.length; i++){
            let castle: ZChipAPI.ProductionBuilding = this._cache.castles[i];

            if(castle.getUnitProductionAtQueue(0) == null){
              castle.trainUnit(ZChipAPI.UnitType.Worker);
            }
          }
          break;
        case ConstructionCommanderAction.BuildWatchtower:
          if(!buildingInProgress){
            let buildingStarted = this.buildBuildingNearBuilding(currentBase, ZChipAPI.BuildingType.Watchtower);

            if(buildingStarted){
              buildingInProgress = true;
              this._scope.chatMessage("General Z is thinking: Wolves beware!");
            }
          }
          break;
        case ConstructionCommanderAction.BuildForge:
          if(!buildingInProgress){
            let buildingStarted = this.buildBuildingNearBuilding(currentBase, ZChipAPI.BuildingType.Forge);

            if(buildingStarted){
              buildingInProgress = true;
              this._scope.chatMessage("General Z is thinking: Harder, better, faster, stronger.");
            }
          }
          break;
        case ConstructionCommanderAction.BuildBarracks:
          if(!buildingInProgress){
            let buildingStarted = this.buildBuildingNearBuilding(currentBase, ZChipAPI.BuildingType.Barracks);

            if(buildingStarted){
              buildingInProgress = true;
            }
          }
          break;
        case ConstructionCommanderAction.TrainFighters:
          for(let i = 0; i < this._cache.barracks.length; i++){
            let singleBarracks = this._cache.barracks[i];

            if(singleBarracks.getUnitProductionAtQueue(0) == null){
              singleBarracks.trainUnit(prefferedArmyUnit);
            }
          }
          break;
        // TODO: Upgrades.
      }
    }
  }

  establishBuildPriority(expansionTarget: ZChipAPI.Mine, desiredWorkers: number, upgradeRatio: number):ConstructionCommanderAction[]{
    console.log("Prioritizing Build Order.");
    var priorityQueue: ConstructionCommanderAction[] = [];

    if(expansionTarget != null){
      priorityQueue.push(ConstructionCommanderAction.Expand);
      return priorityQueue;
    }

    if(this._scope.currentSupply + this._supplyBuffer >= this._scope.maxAvailableSupply && this._scope.maxAvailableSupply <= this._scope.supplyCap){
      priorityQueue.push(ConstructionCommanderAction.BuildHouse);
    }

    if(this._cache.workers.length < desiredWorkers){
      priorityQueue.push(ConstructionCommanderAction.TrainWorker);
    }

    if(this._cache.watchtowers.length < this._cache.castles.length * this._watchtowersPerCastle){
      priorityQueue.push(ConstructionCommanderAction.BuildWatchtower);
    }

    if(this._cache.forges.length < 1 && this._cache.army.length > upgradeRatio){
      priorityQueue.push(ConstructionCommanderAction.BuildForge);

      if(this._scope.currentGold < this._scope.getBuildingTypeFieldValue(ZChipAPI.BuildingType.Forge, ZChipAPI.TypeField.Cost)){
        return priorityQueue;
      }
    }

    // TODO: upgrades.

    priorityQueue.push(ConstructionCommanderAction.TrainFighters);

    priorityQueue.push(ConstructionCommanderAction.BuildBarracks);

    return priorityQueue;
  }

  constructor(baseSpacing: number, watchtowersPerCastle: number, supplyBuffer: number){
    super();
    this._baseSpacing = baseSpacing;
    this._watchtowersPerCastle = watchtowersPerCastle;
    this._supplyBuffer = supplyBuffer;

    this._maxBaseSize = 30;
  }
}

class CombatCommander extends CommanderBase{
  // A scout unit used to explore the map.
  scout: ZChipAPI.Unit;

  // An ordered collection of mine locations to scout.
  scoutOrder: ZChipAPI.Mine[];

  // The minimum army size the AI should have, under which only defensive behaviour will occur.
  minimumArmySize: number;

  // The minimum army size the AI must attain before they become aggressive.
  attackArmySize: number;

  // The number of additional troops the AI must have before investing in the next unit upgrade level.
  private _upgradeRatio: number;
  get upgradeRatio():number{
    return this._upgradeRatio;
  }

  // A value indicating whether the AI should attack known or suspected enemy bases.
  attackMode: boolean;

  // The amount of damage a unit must receive in one AI cycle to be considered under attack.
  attackedDamageThreshold: number;

  // A list of goldmines suspected to harbour enemy bases.
  suspectedBases: ZChipAPI.Unit[];

  // How close a unit must get to a goldmine to determine if there is an enemy base there.
  checkMineForBaseDistance: number;

  // Returns a list of mines to scout in priority order.
  getScoutMinePriority(): ZChipAPI.Mine[]{
    console.log("Prioritizing scouting");
    // TODO: Prioritize enemy start locations.

    return this._cache.mines;
  }

  // Gets the type of unit the army needs most right now.
  get prefferedArmyUnit(): ZChipAPI.UnitType{
    if(this._cache.soldiers.length > this._cache.archers.length){
      return ZChipAPI.UnitType.Archer;
    }
    else{
      return ZChipAPI.UnitType.Soldier;
    }
  }

  // A function that takes in a list of units, and a dictionary of their hit points last AI cycle and determines which of them has been attacked.
  getAttackedUnits(units: ZChipAPI.Unit[], oldHitpoints: number[]):ZChipAPI.Unit[] {
    var attackedUnits = [];
    for(var i = 0; i < units.length; i++){
			var unit = units[i];
			var oldUnitHitpoints = oldHitpoints[unit.id];
			if(oldUnitHitpoints != null && oldUnitHitpoints - unit.hitpoints > this.attackedDamageThreshold){
				attackedUnits.push(unit);
			}
		}

    return attackedUnits;
  }

  // Returns the unit to the specified building.
  returnArmyToBase(base: ZChipAPI.Building):void{
    for(let i = 0; i < this._cache.army.length; i++){
      var fighter = this._cache.army[i];

      if(this.scout == null || !fighter.equals(this.scout)){
        fighter.moveTo(base);
      }
    }
  }

  // Gets a dictionary with the current hit points of a set of units.
	getUnitHitpoints(units: ZChipAPI.Unit[]):number[]{
		var hitpoints = [];
		for(var i = 0; i < units.length; i++){
			var unit = units[i];
			hitpoints[unit.id] = unit.hitpoints;
		}

		return hitpoints;
	}

  // TODO: Clear suspcion from mines.

  // Orders units other than the scout to attack move to the coordinate.
  private attackExcludeScout(x:number, y:number):void{
    for(let i = 0; i < this._cache.army.length; i++){
      var fighter = this._cache.army[i];
      if(this.scout == null || !fighter.equals(this.scout)){
        fighter.attackTo(x, y);
      }
    }
  }

  executeCombatOrders(expansionTarget: ZChipAPI.Mine, primaryBase: ZChipAPI.Building):void{
    console.log("Executing Combat Orders.");
    if(this.scout == undefined){
      this.scout = null;
    }

    if(this.scout != null && this.scout.hitpoints < 1){
      // TODO: Add suspected bases.
      this.scout = null;
    }

    if(this.attackMode == false && this._cache.army.length > this.attackArmySize){
      this._scope.chatMessage("General Z is thinking: I'm ready to attack!");
      this.attackMode = true;
    }
    else if(this.attackMode == true && this._cache.army.length < this.minimumArmySize){
      this._scope.chatMessage("General Z is thinking: My army has been decimated!");
      this.attackMode = false;
    }

    if(this._cache.enemyUnits.length > 0){
      let target = this._scope.getCenterOfUnits(this._cache.enemyUnits);
      this.attackExcludeScout(target.x, target.y);
		}
		else if(expansionTarget != null){
      this.attackExcludeScout(expansionTarget.x, expansionTarget.y);
		}
		else if(this.attackMode == false){
			this.returnArmyToBase(primaryBase);
		}
		else if(this.attackMode == true && this._cache.enemyBuildings.length > 0){
			// TODO prioritize target.
			var targetBuilding = this._cache.enemyBuildings[0];
      this.attackExcludeScout(targetBuilding.x, targetBuilding.y);
		}
		else if(this.attackMode == true && this.suspectedBases.length > 0){
      // TODO: Also check out suspected bases.
		}
		else{
			this.returnArmyToBase(primaryBase);
		}

		if(this._cache.army.length > this.minimumArmySize && this.scout == null){
			this.scout = this._cache.army[0];
			this.scout.stop();
			this._scope.chatMessage("General Z is thinking: I've selected a new scout.");
		}

		if(this.scoutOrder.length == 0){
			var mines = this.getScoutMinePriority();
			this.scoutOrder = this.scoutOrder.concat(mines);
		}

		if(this.scout != null){
			if(this.scout.currentOrder == ZChipAPI.OrderType.Stop){
				var mine = this.scoutOrder.shift();
				this.scout.moveTo(mine);
				this._scope.chatMessage("General Z is thinking: Let's take a look over here...");
			}
		}
  }

  constructor(minimumArmySize:number, attackArmySize:number, upgradeRatio: number, attackedDamageThreshold:number){
    super();
    this.minimumArmySize = minimumArmySize;
    this.attackArmySize = attackArmySize;
    this._upgradeRatio = upgradeRatio;
    this.attackedDamageThreshold = attackedDamageThreshold;

    this.scout = null;
    this.scoutOrder = [];
    this.attackMode = false;
    this.suspectedBases = [];
    this.checkMineForBaseDistance = 2;
  }
}

class GrandCommander extends CommanderBase{
  // Object to handle worker mining and expansions.
  economyCommander: EconomyCommander;

  // Object to handle base and unit construction.
  constructionCommander: ConstructionCommander;

  // Object to handle combat unit orders.
  combatCommander: CombatCommander;

  executeOrders():void{
    // Economic Orders.
    var primaryBase:ZChipAPI.Building = this.selectPrimaryBase();
    this.economyCommander.assignIdleWorkers();
    var expansionTarget: ZChipAPI.Mine = this.economyCommander.considerExpansion(primaryBase);

    // Build Orders.
    var constructionPriority: ConstructionCommanderAction[] = this.constructionCommander.establishBuildPriority(expansionTarget, this.economyCommander.targetWorkerCount, this.combatCommander.upgradeRatio);
    this.constructionCommander.executeBuildOrders(constructionPriority, expansionTarget, primaryBase, this.combatCommander.prefferedArmyUnit);
    this.constructionCommander.rebuildAndRepair();

    // Combat Orders.
    this.combatCommander.executeCombatOrders(expansionTarget, primaryBase);
  }

  // Selects the current primary base.
  selectPrimaryBase(): ZChipAPI.Building{
    var prioritizedCastles = this._cache.castles.sort((a, b) =>{
      return b.creationCycle - a.creationCycle;
    });

    return prioritizedCastles[0];
  }

  setScope(scope: ZChipAPI.Scope, cache:Cache){
    super.setScope(scope, cache);
    this.economyCommander.setScope(scope, cache);
    this.constructionCommander.setScope(scope, cache);
    this.combatCommander.setScope(scope, cache);
  }

  constructor(){
    super();
    this.combatCommander = new CombatCommander(Settings.minimumArmySize, Settings.attackArmySize, Settings.upgradeRatio, Settings.attackedDamageThreshold);
    this.economyCommander = new EconomyCommander(Settings.maxMineDistance, Settings.maxWorkersPerGoldmine);
    this.constructionCommander =  new  ConstructionCommander(Settings.baseSpacing, Settings.watchtowersPerCastle, Settings.supplyBuffer);
  }
}

// A class with static values that determine the AI's behaviour.
class Settings{
  static minimumArmySize: number = 3;
  static attackArmySize:number= 10;
  static upgradeRatio:number = 5;
  static attackedDamageThreshold: number = 10;
  static maxMineDistance: number = 10;
  static maxWorkersPerGoldmine:number = 10;
  static baseSpacing: number = 2;
  static watchtowersPerCastle: number = 1;
  static supplyBuffer: number = 6;
}


// Contains static utility methods.
class Util{
  // Begins at a point and spirals outwards. Returns the first point where validation succeeds.
  static spiralSearch(startX: number, startY: number, validator: (x:number, y:number)=>boolean, searchDiameter: number):ZChipAPI.Point{
    var x = 0,
      y = 0,
      delta = [0, -1],
      width = searchDiameter,
      height = searchDiameter;

    for (let i = Math.pow(Math.max(width, height), 2); i>0; i--) {
      if ((-width/2 < x && x <= width/2)
          && (-height/2 < y && y <= height/2)) {
        if(validator(startX + x,startY + y)){
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
}
