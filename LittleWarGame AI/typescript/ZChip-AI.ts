/// <reference path="./ZChip-API.ts"/>
/// <reference path="./Common.ts"/>
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
      this._soldiers = this._scope.getUnits({type: ZChipAPI.UnitType.Soldier, player: this._scope.playerNumber});
    }

    return this._soldiers;
  };

  // Gets a list of the player's archers.
  private _archers: ZChipAPI.Unit[];
  get archers(): ZChipAPI.Unit[]{
    if(this._archers == null){
      this._archers = this._scope.getUnits({type: ZChipAPI.UnitType.Archer, player: this._scope.playerNumber});
    }

    return this._archers;
  };

  // Gets a list of the player's army units.
  private _army: ZChipAPI.Unit[];
  get army(): ZChipAPI.Unit[]{
    if(this._army == null){
      this._army = this._scope.getUnits({notOfType: ZChipAPI.UnitType.Worker, player: this._scope.playerNumber});
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
      this._completeBuildings = this._scope.getBuildings({player: this._scope.playerNumber, onlyFinished: true});
    }

    return this._completeBuildings;
  };

  // Gets a list of the player's castles.
  private _castles: ZChipAPI.ProductionBuilding[];
  get castles(): ZChipAPI.ProductionBuilding[]{
    if(this._castles == null){
      this._castles = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.Castle});
    }

    return this._castles;
  };

  // Gets a list of the mines on the map.
  private _mines: ZChipAPI.Mine[];
  get mines(): ZChipAPI.Mine[]{
    if(this._mines == null){
      this._mines = this._scope.getBuildings({type: ZChipAPI.BuildingType.Mine}).map(
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
      this._barracks = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.Barracks});
    }

    return this._barracks;
  };

  // Gets a list of the player's forges.
  private _forges: ZChipAPI.ProductionBuilding[];
  get forges(): ZChipAPI.ProductionBuilding[]{
    if(this._forges == null){
      this._forges = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.Forge});
    }

    return this._forges;
  };

  // Gets a list of the player's watchtowers.
  private _watchtowers: ZChipAPI.Building[];
  get watchtowers(): ZChipAPI.Building[]{
    if(this._watchtowers == null){
      this._watchtowers = this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.Watchtower});
    }

    return this._watchtowers;
  };

  // Gets a list of the player's houses.
  private _houses: ZChipAPI.Building[];
  get houses(): ZChipAPI.Building[]{
    if(this._houses == null){
      this._houses = this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.House});
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

  // Gets a list of enemy units that are visible.
  private _enemyArmy: ZChipAPI.Unit[];
  get enemyArmy():ZChipAPI.Unit[]{
    if(this._enemyArmy == null){
      this._enemyArmy = this._scope.getUnits({enemyOf: this._scope.playerNumber, notOfType: ZChipAPI.UnitType.Worker}).filter(
        (unit: ZChipAPI.Unit) =>{
          return !unit.isNeutral;
        }
      );
    }

    return this._enemyArmy;
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

  // The maximum number of goldmines to work at the same time.
  private _maxActiveMines: number;

  constructor(maxMineDistance: number, maxWorkersPerGoldmine: number, maxActiveMines: number){
    super();

    this._maxMineDistance = maxMineDistance;
    this._maxWorkersPerGoldmine = maxWorkersPerGoldmine;
    this._maxActiveMines = maxActiveMines;
    this._cachedMineDistances = [];
  }

  // Gets the desired number of workers.
  get targetWorkerCount(): number{
    // TODO: Adjust for worker splitting.
    return this._maxWorkersPerGoldmine * this.activeMines.length;
  }

  get activeMines(): ZChipAPI.Mine[]{
    let activeMines: ZChipAPI.Mine[] = [];
    for(let i = 0; i < this._cache.castles.length; i++){
      let castle = this._cache.castles[i];
      let mines = this.getMinesOrderedByProximity(castle, true);

      for(let j = 0; j < mines.length; j++){
        let mine = mines[j]
        if(this._scope.getDistanceBetweenBuildings(castle, mine) < this._maxMineDistance){
          activeMines.push(mine);
        }
      }
    }

    return activeMines;
  }

  private _cachedMineDistances: ZChipAPI.Mine[][];

  // Gets the mines ordered by proximity to the specified building.
  private getMinesOrderedByProximity(building: ZChipAPI.Building, undepleted:boolean): ZChipAPI.Mine[]{
    if(this._cachedMineDistances[building.id] == null){
      this._cachedMineDistances[building.id] = this.orderMinesByProximityToBuilding(building, this._cache.mines);
    }

    let mines = this._cachedMineDistances[building.id];

    if(undepleted){
      let undepletedMines: ZChipAPI.Mine[] = [];
      for(let i = 0; i < mines.length; i++){
        if(mines[i].gold > 0){
          undepletedMines.push(mines[i]);
        }
      }

      return undepletedMines;
    }
    else{
      return mines;
    }
  }

  // Orders the mines by their proximity (by ground) to the designated building.
  private orderMinesByProximityToBuilding(targetBuilding:ZChipAPI.Building, mines:ZChipAPI.Mine[]): ZChipAPI.Mine[]{
    var mineDistances: number[] = [];
    for(let i = 0; i < mines.length; i++){
      let mine = mines[i];
      mineDistances[mine.id] = this._scope.getDistanceBetweenBuildings(mine, targetBuilding);
    }

    var reachableMines = mines.filter((m: ZChipAPI.Mine):boolean =>{
      if(mineDistances[m.id] == null){
        return false;
      }
      else{
        return true;
      }
    });

    return reachableMines.sort((a: ZChipAPI.Mine, b: ZChipAPI.Mine) =>{
      return mineDistances[a.id] - mineDistances[b.id];
    });
  }

  // Chooses a mine to expand to, or returns null if no expansion is warranted.
  considerExpansion(currentBase: ZChipAPI.Building): ZChipAPI.Mine{
    if(currentBase == null){
      // TODO: Choose a better action if we have no base.
      return null;
    }

    var orderedMines: ZChipAPI.Mine[] = this.getMinesOrderedByProximity(currentBase, true);
    var castleCost: number = this._scope.getBuildingTypeFieldValue(ZChipAPI.BuildingType.Castle, ZChipAPI.TypeField.Cost);
    // DEBUG: Earlier testing of expansion code.
    castleCost = 4900;

    for(let i = 0; i < orderedMines.length; i++){
      let candidate: ZChipAPI.Mine = orderedMines[i];
      let distanceToMine : number = this._scope.getDistanceBetweenBuildings(candidate, currentBase);

      if(distanceToMine == null){
        // Can't find a path, keep looking.
        continue;
      }
      else if(distanceToMine < this._maxMineDistance && candidate.gold > castleCost){
        // Close enough to mine without expanding, has enough gold. Don't expand.
        return null;
      }
      else if(candidate.gold > castleCost){
        // Only expand to this mine if it is worth the cost.

        return candidate;
      }

      // Keep looking.
    }

    // No more suitable mines. Give up.
    return null;
  }

  // Assigns idle workers to mine.
  assignIdleWorkers(){
    // Not using cache, because worker orders may have changed.
    var idleWorkers: ZChipAPI.Worker[] = <ZChipAPI.Worker[]>this._scope.getUnits({type: ZChipAPI.UnitType.Worker, order: ZChipAPI.OrderType.Stop, player: this._scope.playerNumber});
    var activeMines:ZChipAPI.Mine[] = this.activeMines;

    if(activeMines.length > 0){
      let miners: number[] = [];
      let workers: ZChipAPI.Worker[] = this._cache.workers;

      // Count the number of miners currently mining each mine.
      for(let i = 0; i < activeMines.length; i++){
        let activeMine = activeMines[i];
        miners[activeMine.id] = 0;

        for(let j = 0; j < workers.length; j++){
          let worker = workers[j];
          if(worker.targetMine != null && worker.targetMine.equals(activeMine)){
            miners[activeMine.id] += 1;
          }
        }
      }

      // Send each miner to the currently least mined mine.
      for(let i = 0; i < idleWorkers.length; i++){
        let leastMinedMine = null;
        let minMiners = Number.MAX_VALUE;
        let worker = idleWorkers[i];
        for(let j = 0; j < activeMines.length; j++){
          let activeMine = activeMines[j];
          let minesMiners = miners[activeMine.id];
          if(minesMiners < minMiners){
            minMiners = minesMiners;
            leastMinedMine = activeMine;
          }
        }

        worker.mine(leastMinedMine);
        miners[leastMinedMine.id] += 1;
      }
    }
    else{
      for (let i = 0; i < idleWorkers.length; i++){
        var worker = idleWorkers[i];
        var closestBase:ZChipAPI.ProductionBuilding = <ZChipAPI.ProductionBuilding>this._scope.getClosestByGround(worker.x, worker.y, this._cache.castles);
        if(closestBase != null){
          var orderedMines =this.getMinesOrderedByProximity(closestBase, true);
          var closestMine = orderedMines[0];
          if(closestMine != null){
            worker.mine(closestMine);
          }
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

  // The maximum distance from a mine to build a castle.
  private _maxMineDistance: number;

  // Repair dammaged buildings or finishes buildings that were left incomplete.
  rebuildAndRepair(){
    var repairingWorkers: ZChipAPI.Worker[] = < ZChipAPI.Worker[]>this._scope.getUnits({type: ZChipAPI.UnitType.Worker, player:this._scope.playerNumber, order: ZChipAPI.OrderType.Repair});
    var stoppedWorkers : ZChipAPI.Worker[] = < ZChipAPI.Worker[]> this._scope.getUnits({type: ZChipAPI.UnitType.Worker, player:this._scope.playerNumber, order: ZChipAPI.OrderType.Stop});
    var miningWorkers : ZChipAPI.Worker[] = < ZChipAPI.Worker[]> this._scope.getUnits({type: ZChipAPI.UnitType.Worker, player:this._scope.playerNumber, order: ZChipAPI.OrderType.Mine});
    var availibleWorkers:ZChipAPI.Worker[] = stoppedWorkers.concat(miningWorkers);

    if(this._cache.buildings.length - this._cache.completeBuildings.length > repairingWorkers.length){
			for(let i: number = 0; i < this._cache.buildings.length; i++){
				let building: ZChipAPI.Building = this._cache.buildings[i];
				if(building.isUnderConstruction){
					let worker: ZChipAPI.Worker = <ZChipAPI.Worker>this._scope.getClosestByGround(building.x, building.y, availibleWorkers);
					if(worker != null){
            this._scope.chatMessage("General Z is thinking: Don't start something you can't finish.");
						worker.repair(building);
					}
				}
			}
		}

		if(repairingWorkers.length == 0){
			for(let i:number = 0; i < this._cache.completeBuildings.length; i++){
				let building = this._cache.completeBuildings[i];

				if(building.hitpoints < this._scope.getBuildingTypeFieldValue(building.type, ZChipAPI.TypeField.MaxHitpoints)){
					let worker: ZChipAPI.Worker = <ZChipAPI.Worker>this._scope.getClosestByGround(building.x, building.y, availibleWorkers);
					if(worker != null){
            this._scope.chatMessage("General Z is thinking: This is why we can't have nice things.");
            worker.repair(building);
					}
				}
			}
    }
  }

  // DEBUG: map
  TEST(){
    console.log("TEST");
    for(let i = 0; i < this._scope.mapHeight; i++){
      var column = "";
      for(let j = 0; j < this._scope.mapWidth; j++){
        if(!this._scope.positionIsPathable(j, i)){
          column = column + "X";
        }
        else if(this._scope.positionIsOnRamp(j, i)){
          column = column + "R";
        }
        else if(this._scope.positionIsBlocked(j, i)){
          column = column + "U";
        }
        else if(this._scope.positionIsNearMine(j, i)){
          column = column + "M";
        }
        else{
          column = column + " ";
        }
      }
      console.log(column);
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
        if(! positionPathable){
          return false;
        }

        var positionOnRamp:boolean = this._scope.positionIsOnRamp(i, j);
        if(positionOnRamp){
          return false;
        }

        var positionIsBlocked: boolean = this._scope.positionIsBlocked(i, j);
        if(positionIsBlocked){
          return false;
        }

        var positionTooNearMine:boolean = false;

        // We don't care if we're near a mine unless it is a castle.
        if(type == ZChipAPI.BuildingType.Castle){
          positionTooNearMine= this._scope.positionIsNearMine(i, j);
        }

        if(positionTooNearMine){
          return false;
        }
      }
    }

    return true;
  }

  getDistanceToBuildSite(baseBuilding: ZChipAPI.Building, type: ZChipAPI.BuildingType, x: number, y:number){
    var perimiter1 = this._scope.getBuildingPerimeterPoints(baseBuilding);
    var buildingSize = this._scope.getBuildingTypeFieldValue(type, ZChipAPI.TypeField.Size);
    if(perimiter1 == null){
      return null;
    }

    var perimiter2 = this._scope.getPerimeterPoints(buildingSize, x, y);
    if(perimiter2 == null){
      return null;
    }

    var closestPair = this._scope.estimateClosestPair(perimiter1, perimiter2);
    if(closestPair == null){
      return null;
    }

    return this._scope.getGroundDistance(closestPair.point1.x, closestPair.point1.y, closestPair.point2.x, closestPair.point2.y);
  }

  // Attpmts to build the specified building at a position. Returns true if success, otherwise false.
  buildCastleNearGoldmine(goldmine: ZChipAPI.Building, maxDistance: number):boolean{
    var cost = this._scope.getBuildingTypeFieldValue(ZChipAPI.BuildingType.Castle, ZChipAPI.TypeField.Cost);
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

    var closestWorker: ZChipAPI.Worker = <ZChipAPI.Worker>this._scope.getClosestByGround(goldmine.x, goldmine.y, nonBuildingWorkers);

    if(closestWorker == null){
      return false;
    }

    var buildPosition: ZChipAPI.Point = Common.Util.spiralSearch(
      Math.floor(goldmine.x + (goldmine.size / 2)),
      Math.floor(goldmine.y + (goldmine.size / 2)),
      (function(self:ConstructionCommander, base: ZChipAPI.Building):(x:number, y:number) => boolean {
        return function(x:number, y:number):boolean{
          let canPlace = self.canPlaceBuilding(ZChipAPI.BuildingType.Castle, x, y, 1);
          if(!canPlace){
            return false;
          }

          let distanceToPosition = self.getDistanceToBuildSite(base, ZChipAPI.BuildingType.Castle, x, y);
          let tooFar = distanceToPosition == null || distanceToPosition > maxDistance;
          if(tooFar){
            return false;
          }

          return true;
        }
      })(this, goldmine),
      this._maxBaseSize);

    if(buildPosition == null){
      return false;
    }

    closestWorker.build(ZChipAPI.BuildingType.Castle, buildPosition.x, buildPosition.y);
    return true;
  }

  // Attpmts to build the specified building at a position. Returns true if success, otherwise false.
  buildBuildingNearBuilding(baseBuilding: ZChipAPI.Building, type: ZChipAPI.BuildingType):boolean{
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

    var closestWorker: ZChipAPI.Worker = <ZChipAPI.Worker>this._scope.getClosestByGround(baseBuilding.x, baseBuilding.y, nonBuildingWorkers);

    if(closestWorker == null){
      return false;
    }

    var buildPosition: ZChipAPI.Point = Common.Util.spiralSearch(
      Math.floor(baseBuilding.x + (baseBuilding.size / 2)),
      Math.floor(baseBuilding.y + (baseBuilding.size / 2)),
      (function(self:ConstructionCommander, buildingPlacementType: ZChipAPI.BuildingType, base: ZChipAPI.Building):(x:number, y:number) => boolean {
        return function(x:number, y:number):boolean{
          let canPlace = self.canPlaceBuilding(buildingPlacementType, x, y, self._baseSpacing);
          let distanceToPosition = self.getDistanceToBuildSite(base, buildingPlacementType, x, y);
          let tooFar = distanceToPosition == null || distanceToPosition > self._maxBaseSize;
          return canPlace && ! tooFar;
        }
      })(this, type, baseBuilding),
      this._maxBaseSize);

    if(buildPosition == null){
      this._scope.chatMessage("General Z is thinking: My base is too small.");
      this._baseSpacing = 1;
      this._maxBaseSize += 10;
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

  // Gets a list of all upgrades currently underway.
  getUpgradesInProgress(): ZChipAPI.UpgradeType[]{
    var upgrades: ZChipAPI.UpgradeType[] = [];

    // TODO: For all production buildings.
    for(let i = 0; i < this._cache.forges.length; i++){
      var upgrader: ZChipAPI.ProductionBuilding = this._cache.forges[i];
      var upgrade = upgrader.getUpgradeProductionAtQueue(0);
      if(upgrade != null){
        upgrades.push(upgrade);
      }
    }

    return upgrades;
  }

  // Executes the build orders as determined by the priority.
  executeBuildOrders(priority: ConstructionCommanderAction[], expansionTarget: ZChipAPI.Mine, currentBase:ZChipAPI.Building, prefferedArmyUnit: ZChipAPI.UnitType){
    var buildingInProgress = false;
    if(this._cache.buildings.length + this.getPendingBuildOrders().length > this._cache.completeBuildings.length){
      buildingInProgress = true;
    }

    while(priority.length > 0){
      let workOrder: ConstructionCommanderAction = priority.shift();

      switch(workOrder){
        case ConstructionCommanderAction.Expand:
          if(!buildingInProgress && expansionTarget != null){
            let buildingStarted = this.buildCastleNearGoldmine(expansionTarget, this._maxMineDistance);

            if(buildingStarted){
              buildingInProgress = true;
              this._scope.chatMessage("General Z is thinking: A man's home is his castle.");
            }
          }
          break;
        case ConstructionCommanderAction.BuildHouse:
          if(!buildingInProgress && currentBase != null){
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

            if(!castle.isBusy){
              castle.trainUnit(ZChipAPI.UnitType.Worker);
            }
          }
          break;
        case ConstructionCommanderAction.BuildWatchtower:
          if(!buildingInProgress && currentBase != null){
            let buildingStarted = this.buildBuildingNearBuilding(currentBase, ZChipAPI.BuildingType.Watchtower);

            if(buildingStarted){
              buildingInProgress = true;
              this._scope.chatMessage("General Z is thinking: Wolves beware!");
            }
          }
          break;
        case ConstructionCommanderAction.BuildForge:
          if(!buildingInProgress && currentBase != null){
            let buildingStarted = this.buildBuildingNearBuilding(currentBase, ZChipAPI.BuildingType.Forge);

            if(buildingStarted){
              buildingInProgress = true;
              this._scope.chatMessage("General Z is thinking: Harder, better, faster, stronger.");
            }
          }
          break;
        case ConstructionCommanderAction.BuildBarracks:
          if(!buildingInProgress && currentBase != null){
            let buildingStarted = this.buildBuildingNearBuilding(currentBase, ZChipAPI.BuildingType.Barracks);

            if(buildingStarted){
              buildingInProgress = true;
            }
          }
          break;
        case ConstructionCommanderAction.TrainFighters:
          for(let i = 0; i < this._cache.barracks.length; i++){
            let singleBarracks = this._cache.barracks[i];

            if(!singleBarracks.isBusy){
              singleBarracks.trainUnit(prefferedArmyUnit);
            }
          }
          break;
        case ConstructionCommanderAction.UpgradeAttack:
          for(let i = 0; i < this._cache.forges.length; i++){
            let forge = <ZChipAPI.ProductionBuilding>this._cache.forges[i];

            if(!forge.isBusy){
              forge.researchUpgrade(ZChipAPI.UpgradeType.AttackUpgrades);
            }
          }
        break;
      }
    }
  }

  establishBuildPriority(expansionTarget: ZChipAPI.Mine, desiredWorkers: number, upgradeRatio: number):ConstructionCommanderAction[]{
    var priorityQueue: ConstructionCommanderAction[] = [];

    if(expansionTarget != null && this._cache.workers.length > 0){
      priorityQueue.push(ConstructionCommanderAction.Expand);
      return priorityQueue;
    }

    if(this._scope.currentSupply + this._supplyBuffer >= this._scope.maxAvailableSupply && this._scope.maxAvailableSupply < this._scope.supplyCap){
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

      if(this._scope.currentGold < this._scope.getBuildingTypeFieldValue(ZChipAPI.BuildingType.Forge, ZChipAPI.TypeField.Cost) && this._cache.army.length >= this._cache.enemyArmy.length){
        return priorityQueue;
      }
    }

    let damageUpgradeLevel = this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.AttackUpgrades);
    // TODO: 5 is a magic number. Baaad.
    if(this._cache.forges.length > 0 && damageUpgradeLevel < 5 && this._cache.army.length / upgradeRatio > damageUpgradeLevel){
      priorityQueue.push(ConstructionCommanderAction.UpgradeAttack);

      let upgradeCost = this._scope.getUpgradeTypeFieldValue(ZChipAPI.UpgradeType.AttackUpgrades, ZChipAPI.TypeField.Cost) + (damageUpgradeLevel * 60);
      if(this.getUpgradesInProgress().length < this._cache.forges.length && this._scope.currentGold < upgradeCost){
        return priorityQueue;
      }
    }


    priorityQueue.push(ConstructionCommanderAction.TrainFighters);

    priorityQueue.push(ConstructionCommanderAction.BuildBarracks);

    return priorityQueue;
  }

  constructor(baseSpacing: number, watchtowersPerCastle: number, supplyBuffer: number, maxMineDistance: number){
    super();
    this._baseSpacing = baseSpacing;
    this._watchtowersPerCastle = watchtowersPerCastle;
    this._supplyBuffer = supplyBuffer;
    this._maxMineDistance = maxMineDistance;

    this._maxBaseSize = 30;
  }
}

class CombatCommander extends CommanderBase{
  // A scout unit used to explore the map.
  scout: ZChipAPI.Unit;

  // An ordered collection of mine locations to scout.
  scoutOrder: ZChipAPI.Mine[];

  // The current target for the scout.
  currentScoutTarget: ZChipAPI.Mine;

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
  suspectedBases: ZChipAPI.Mine[];

  // How close a unit must get to a goldmine to determine if there is an enemy base there.
  checkMineForBaseDistance: number;

  // A list of the hitpoints last turn.
  private _oldHitpoints: number[];

  // Returns a list of mines to scout in priority order.
  getScoutMinePriority(): ZChipAPI.Mine[]{
    if(this.scoutOrder == null){
      var scoutOrder = [];
      var players = this._scope.players;
      for(let i: number = 0; i < players.length; i++){
        var player = players[i];
        var location = this._scope.getStartPosition(players[i]);
        if(player != this._scope.playerNumber){
          var startingMine = this._scope.getClosestByGround(location.x, location.y, this._cache.mines);
          scoutOrder.push(startingMine);
        }
      }

      return scoutOrder;
    }


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

  // Filters the scout out of the collection of units and returns the result.
  excludeScoutFromUnits(units: ZChipAPI.Unit[]): ZChipAPI.Unit[]{
    var nonScoutUnits: ZChipAPI.Unit[] = units.filter((unit: ZChipAPI.Unit) => {
      if(this.scout != null && this.scout.equals(unit)){
        return false;
      }

      return true;
    });

    return nonScoutUnits;
  }

  // Commands the indicated units to all focus on a single enemy.
  setFocusFireBehaviour(units: ZChipAPI.Unit[], target: ZChipAPI.GameEntity){
    for(let i = 0; i < units.length; i++){
      units[i].attack(target);
    }
  }

  // Commands the indicated units to flee if they are under attack.
  setBehaviourCoward(units: ZChipAPI.Unit[]){
    if(this._cache.enemyArmy.length == 0){
      return;
    }

    let runaways: ZChipAPI.Unit[] = this.getAttackedUnits(units, this._oldHitpoints);
    let center = this._scope.getCenterOfUnits(this._cache.enemyArmy);

    for(let i = 0; i < runaways.length; i++){
      let runaway = runaways[i];
      let x = runaway.x - center.x;
      let y = runaway.y - center.y;
      runaway.move(runaway.x + x, runaway.y + y);
    }
  }

  // Commands all specified units to attack the lowest health target in their range.
  setBehaviourVulture(units: ZChipAPI.Unit[]){
    var enemyArmy = this._cache.enemyArmy;
    var sortedEnemies = enemyArmy.sort((a:ZChipAPI.Unit, b:ZChipAPI.Unit): number => {
      return a.hitpoints - b.hitpoints;
    });

    for(let i = 0 ; i < units.length; i++){
      let unit = units[i];
      let type = unit.type;
      let range = this._scope.getUnitTypeFieldValue(type, ZChipAPI.TypeField.Range);
      for(let j = 0; j < sortedEnemies.length; j++){
        let enemy = sortedEnemies[j];

        if(this._scope.getDistance(unit.x, unit.y, enemy.x, enemy.y) < range){
          unit.attack(enemy);
          break;
        }
      }
    }
  }

  // Returns the unit to the specified building.
  returnArmyToBase(base: ZChipAPI.Building):void{
    var nonScoutArmy = this.excludeScoutFromUnits(this._cache.army);
    for(let i = 0; i < nonScoutArmy.length; i++){
      var fighter = nonScoutArmy[i];
      fighter.moveTo(base);
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

  // Determines if any units are close enough to a mine to clear suspicion from it.
  private clearSuspicionFromScoutedMines(): void{
    this.suspectedBases = this.suspectedBases.filter((m:ZChipAPI.Mine):boolean =>{
      for(let j = 0; j < this._cache.units.length; j++){
        let unit = this._cache.units[j];
        if(this._scope.getDistance(unit.x, unit.y, m.x, m.y) < this.checkMineForBaseDistance){
          this._scope.chatMessage("General Z is thinking: Ain't nobody here but us chickens.");
          return false;
        }
      }

      return true;
    });
  }

  // Orders units other than the scout to attack move to the coordinate.
  private attackExcludeScout(x:number, y:number):void{
    var nonScoutArmy = this.excludeScoutFromUnits(this._cache.army);
    for(let i = 0; i < nonScoutArmy.length; i++){
      var fighter = nonScoutArmy[i];
      fighter.attackTo(x, y);
    }
  }

  // Selects a scout and orders that scout to move.
  private issueScoutOrders():void{
    if(this.scout == undefined){
      this.scout = null;
    }

    if(this.scoutOrder == null || this.scoutOrder.length == 0){
      this.scoutOrder = this.getScoutMinePriority();
    }

    if(this.scout != null && this.scout.hitpoints <= 0){
      this._scope.chatMessage("General Z is thinking: Perhaps the enemy was guarding a base.");
      this.suspectedBases.push(this.currentScoutTarget);
      this.scout = null;
    }

    if(
      this._cache.army.length > this.minimumArmySize
      && this.scout == null
      && this._cache.enemyArmy.length == 0
      && this.suspectedBases.length + this._cache.enemyBuildings.length < 1){
      // TODO: limit or prioritize unit type so expensive units aren't used.
			this.scout = this._cache.army[0];
			this.scout.stop();
			this._scope.chatMessage("General Z is thinking: I've selected a new scout.");
		}

		if(this.scout != null){
			if(this.scout.currentOrder == ZChipAPI.OrderType.Stop){
				var mine = this.scoutOrder.shift();
        this.currentScoutTarget = mine;
				this.scout.moveTo(mine);
				this._scope.chatMessage("General Z is thinking: Let's take a look over here...");
			}
		}
  }

  // Sets or unsets attack mode.
  private setAttackMode():void{
    if(this.attackMode == false && this._cache.army.length > this.attackArmySize){
      this._scope.chatMessage("General Z is thinking: I'm ready to attack!");
      this.attackMode = true;
    }
    else if(this.attackMode == true && this._cache.army.length < this.minimumArmySize){
      this._scope.chatMessage("General Z is thinking: My army has been decimated!");
      this.attackMode = false;
    }
  }

  // Issues general attack and retreat orders.
  private issueGeneralOrders(expansionTarget: ZChipAPI.Mine, primaryBase: ZChipAPI.Building):void{
    if(this._cache.enemyUnits.length > 0){
      let target = this._scope.getCenterOfUnits(this._cache.enemyUnits);
      this.attackExcludeScout(target.x, target.y);
    }
    else if(expansionTarget != null){
      this.attackExcludeScout(expansionTarget.x, expansionTarget.y);
    }
    else if(this.attackMode == false  && primaryBase != null){
      this.returnArmyToBase(primaryBase);
    }
    else if(this.attackMode == true && this._cache.enemyBuildings.length > 0){
      // TODO prioritize target.
      var targetBuilding = this._cache.enemyBuildings[0];
      this.attackExcludeScout(targetBuilding.x, targetBuilding.y);
    }
    else if(this.attackMode == true && this.suspectedBases.length > 0){
      if(this.suspectedBases.length > 0){
        var targetMine = this.suspectedBases[0];
        this.attackExcludeScout(targetMine.x, targetMine.y);
      }
    }
    else if(primaryBase != null){
      this.returnArmyToBase(primaryBase);
    }
    else{
      let unitCenter = this._scope.getCenterOfUnits(this._cache.units);
      this.attackExcludeScout(unitCenter.x, unitCenter.y);
    }
  }

  // Issues individual micro commands.
  private issueMicroOrders(): void{
    //var combatArchers = this.excludeScoutFromUnits(this._cache.archers);

    //var archerCenter = this._scope.getCenterOfUnits(combatArchers);
    //var enemies = this._cache.enemyArmy;
    //var mostCentralEnemy = this._scope.getClosest(archerCenter.x, archerCenter.y, enemies);

    //this.setFocusFireBehaviour(combatArchers, mostCentralEnemy);
    //this.setBehaviourVulture(combatArchers);
    //this.setBehaviourCoward(combatArchers);
  }

  // Issues all combat orders to units.
  executeCombatOrders(expansionTarget: ZChipAPI.Mine, primaryBase: ZChipAPI.Building):void{
    this.clearSuspicionFromScoutedMines();

    this.setAttackMode();

    this.issueScoutOrders();

    this.issueGeneralOrders(expansionTarget, primaryBase);

    this.issueMicroOrders();

    this.pullWorkers();

    this._oldHitpoints = this.getUnitHitpoints(this._cache.army);
  }

  private pullWorkers():void {
    var enemies: ZChipAPI.Unit[] = this._cache.enemyArmy;
    var workers: ZChipAPI.Worker[] = this._cache.workers;
    // TODO: Settings stuff should be passed in.
    if(enemies.length > this._cache.army.length && workers.length /  Settings.workerAttackRatio > enemies.length){
      for(let i = 0; i < workers.length; i++){
        var worker: ZChipAPI.Worker = workers[i];
        var closestEnemy: ZChipAPI.Unit = <ZChipAPI.Unit>this._scope.getClosestByGround(worker.x, worker.y, enemies)
        var distanceToTarget: number = this._scope.getGroundDistance(worker.x, worker.y, closestEnemy.x, closestEnemy.y)
        if(distanceToTarget != null && distanceToTarget > Settings.workerDefenceDistance){
          worker.attack(closestEnemy);
        }
      }
    }
  }

  constructor(minimumArmySize:number, attackArmySize:number, upgradeRatio: number, attackedDamageThreshold:number, checkMineForBaseDistance:number){
    super();
    this.minimumArmySize = minimumArmySize;
    this.attackArmySize = attackArmySize;
    this._upgradeRatio = upgradeRatio;
    this.attackedDamageThreshold = attackedDamageThreshold;

    this.scout = null;
    this.scoutOrder = null;
    this.attackMode = false;
    this.suspectedBases = [];
    this.checkMineForBaseDistance = checkMineForBaseDistance;
  }
}

class GrandCommander extends CommanderBase{
  // Object to handle worker mining and expansions.
  economyCommander: EconomyCommander;

  // Object to handle base and unit construction.
  constructionCommander: ConstructionCommander;

  // Object to handle combat unit orders.
  combatCommander: CombatCommander;

  // Run test code that only need to run once on startup.
  singleRunTest():void{
    console.log("Running Single Test");
    // this.constructionCommander.TEST();
    /*var result = Common.Util.spiralSearch(43.5, 54.5, (x:number, y:number):boolean =>{
      return this._scope.positionIsPathable(x,y);
    }, 20);

    console.log("Spiral Finished");
    console.log(result);
    console.log(this._scope.positionIsPathable(result.x, result.y));*/
    // console.log(this._cache.workers[0]);
  }

  executeOrders():void{
    var primaryBase:ZChipAPI.Building = this.selectPrimaryBase();

    // Economic Orders.
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
    if(this._cache.castles.length > 0){
      let prioritizedCastles = this._cache.castles.sort((a, b) =>{
        return b.creationCycle - a.creationCycle;
      });

      return prioritizedCastles[0];
    }
    else{
      return null;
    }
  }

  setScope(scope: ZChipAPI.Scope, cache:Cache){
    super.setScope(scope, cache);
    this.economyCommander.setScope(scope, cache);
    this.constructionCommander.setScope(scope, cache);
    this.combatCommander.setScope(scope, cache);
  }

  constructor(){
    super();
    this.combatCommander = new CombatCommander(Settings.minimumArmySize, Settings.attackArmySize, Settings.upgradeRatio, Settings.attackedDamageThreshold, Settings.checkMineForBaseDistance);
    this.economyCommander = new EconomyCommander(Settings.maxMineDistance, Settings.maxWorkersPerGoldmine, Settings.maxActiveMines);
    this.constructionCommander =  new  ConstructionCommander(Settings.baseSpacing, Settings.watchtowersPerCastle, Settings.supplyBuffer, Settings.maxMineDistance);
  }
}

// A class with static values that determine the AI's behaviour.
class Settings{
  static minimumArmySize: number = 3;
  static attackArmySize:number= 10;
  static upgradeRatio:number = 1; // Should be 5.
  static attackedDamageThreshold: number = 1;
  static maxMineDistance: number = 15;
  static maxWorkersPerGoldmine:number = 10;
  static baseSpacing: number = 2;
  static watchtowersPerCastle: number = 0; // Should be 1.
  static supplyBuffer: number = 6;
  static workerDefenceDistance: number = 5;
  static workerAttackRatio: number = 2;
  static checkMineForBaseDistance: number = 4;
  static maxActiveMines: number = 2;
}
