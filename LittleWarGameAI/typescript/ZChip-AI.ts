/// <reference path="./ZChip-API.ts"/>
/// <reference path="./Common.ts"/>
module ZChipAI {
  // The possible actions that can be taken by the construction commander.
  export enum BuildAction{
    BuildAdvancedWorkshop,
    BuildAnimalTestingLab,
    BuildBarracks,
    BuildChurch,
    BuildDragonsLair,
    BuildForge,
    BuildHouse,
    BuildMagesGuild,
    BuildSnakeCharmer,
    BuildWatchtower,
    BuildWolfDen,
    BuildWorkshop,
    ResearchFireball,
    TrainAirship,
    TrainArcher,
    TrainBallista,
    TrainBird,
    TrainCatapult,
    TrainDragon,
    TrainGatlingGun,
    TrainKnight,
    TrainMage,
    TrainPriest,
    TrainRaider,
    TrainSnake,
    TrainSoldier,
    TrainWerewolf,
    TrainWolves,
    TrainWorker,
    UpgradeArmour,
    UpgradeAttack,
    UpgradeCastle,
    UpgradeWolfDen,
    Expand
  }

  // Provides access to cached copies of scope data.
  export class Cache{
    private _scope: ZChipAPI.Scope;

    // Gets a list of the player's idle workers.
    private _idleWorkers: ZChipAPI.Unit[];
    get idleWorkers(): ZChipAPI.Unit[]{
      if(this._idleWorkers == null){
        this._idleWorkers = this._scope.getUnits({type: ZChipAPI.UnitType.Worker, order: ZChipAPI.OrderType.Stop, player: this._scope.playerNumber});
      }

      return this._idleWorkers;
    };

    // Gets a list of the player's wolves.
    private _wolves: ZChipAPI.Unit[];
    get wolves(): ZChipAPI.Unit[]{
      if(this._wolves == null){
        this._wolves = this._scope.getUnits({type: ZChipAPI.UnitType.Wolf, player: this._scope.playerNumber});
      }

      return this._wolves;
    }

    // Gets a list of the player's werewolves.
    private _werewolves: ZChipAPI.Unit[];
    get werewolves(): ZChipAPI.Unit[]{
      if(this._werewolves == null){
        this._werewolves = this._scope.getUnits({type: ZChipAPI.UnitType.Werewolf, player: this._scope.playerNumber});
      }

      return this._werewolves;
    }

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

    // Gets a list of the player's mages.
    private _mages: ZChipAPI.Unit[];
    get mages(): ZChipAPI.Unit[]{
      if(this._mages == null){
        this._mages = this._scope.getUnits({type: ZChipAPI.UnitType.Mage, player: this._scope.playerNumber});
      }

      return this._mages;
    };

    // Gets a list of the player's priests.
    private _priests: ZChipAPI.Unit[];
    get priests(): ZChipAPI.Unit[]{
      if(this._priests == null){
        this._priests = this._scope.getUnits({type: ZChipAPI.UnitType.Priest, player: this._scope.playerNumber});
      }

      return this._priests;
    };

    // Gets a list of the player's birds.
    private _birds: ZChipAPI.Unit[];
    get birds(): ZChipAPI.Unit[]{
      if(this._birds == null){
        this._birds = this._scope.getUnits({type: ZChipAPI.UnitType.Bird, player: this._scope.playerNumber});
      }

      return this._birds;
    };

    // Gets a list of the player's catapults.
    private _catapults: ZChipAPI.Unit[];
    get catapults(): ZChipAPI.Unit[]{
      if(this._catapults == null){
        this._catapults = this._scope.getUnits({type: ZChipAPI.UnitType.Catapult, player: this._scope.playerNumber});
      }

      return this._catapults;
    };

    // Gets a list of the player's ballistae.
    private _ballistae: ZChipAPI.Unit[];
    get ballistae(): ZChipAPI.Unit[]{
      if(this._ballistae == null){
        this._ballistae = this._scope.getUnits({type: ZChipAPI.UnitType.Ballista, player: this._scope.playerNumber});
      }

      return this._ballistae;
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

    private _unitProductionBuildings: ZChipAPI.ProductionBuilding[];
    get unitProductionBuildings():ZChipAPI.ProductionBuilding[]{
      if(this._unitProductionBuildings == null){
        this._unitProductionBuildings = [];
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.castles);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.fortresses);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.barracks);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.magesGuilds);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.workshops);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.advancedWorksops);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.churches);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.dragonLairs);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.wolfDens);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.workshops);
        this._unitProductionBuildings = this._unitProductionBuildings.concat(this.werewolfDens);
      }

      return this._unitProductionBuildings;
    }

    // Gets a list of the player's castles.
    private _castles: ZChipAPI.ProductionBuilding[];
    get castles(): ZChipAPI.ProductionBuilding[]{
      if(this._castles == null){
        this._castles = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.Castle});
      }

      return this._castles;
    };

    // Gets a list of the player's fortesses.
    private _fortresses: ZChipAPI.ProductionBuilding[];
    get fortresses(): ZChipAPI.ProductionBuilding[]{
      if(this._fortresses == null){
        this._fortresses = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.Fortress});
      }

      return this._fortresses;
    }

    // Gets a list of the player's bases.
    get bases(): ZChipAPI.ProductionBuilding[]{
      return this.castles.concat(this.fortresses);
    }

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

    // Gets a list of the player's barracks.
    private _magesGuilds: ZChipAPI.ProductionBuilding[];
    get magesGuilds(): ZChipAPI.ProductionBuilding[]{
      if(this._magesGuilds == null){
        this._magesGuilds = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.MagesGuild});
      }

      return this._magesGuilds;
    };

    // Gets a list of the player's barracks.
    private _workshops: ZChipAPI.ProductionBuilding[];
    get workshops(): ZChipAPI.ProductionBuilding[]{
      if(this._workshops == null){
        this._workshops = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.Workshop});
      }

      return this._workshops;
    };

    // Gets a list of the player's barracks.
    private _advancedWorkshops: ZChipAPI.ProductionBuilding[];
    get advancedWorksops(): ZChipAPI.ProductionBuilding[]{
      if(this._advancedWorkshops == null){
        this._advancedWorkshops = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.AdvancedWorkshop});
      }

      return this._advancedWorkshops;
    };

    // Gets a list of the player's barracks.
    private _churches: ZChipAPI.ProductionBuilding[];
    get churches(): ZChipAPI.ProductionBuilding[]{
      if(this._churches == null){
        this._churches = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.Church});
      }

      return this._churches;
    };

    // Gets a list of the player's barracks.
    private _animalTestingLabs: ZChipAPI.ProductionBuilding[];
    get animalTestingLabs(): ZChipAPI.ProductionBuilding[]{
      if(this._animalTestingLabs == null){
        this._animalTestingLabs = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.AnimalTestingLab});
      }

      return this._animalTestingLabs;
    };

    // Gets a list of the player's barracks.
    private _dragonLairs: ZChipAPI.ProductionBuilding[];
    get dragonLairs(): ZChipAPI.ProductionBuilding[]{
      if(this._dragonLairs == null){
        this._dragonLairs = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.DragonsLair});
      }

      return this._dragonLairs;
    };

    // Gets a list of the player's wolf dens.
    private _wolfDens: ZChipAPI.ProductionBuilding[];
    get wolfDens(): ZChipAPI.ProductionBuilding[]{
      if(this._wolfDens == null){
        this._wolfDens = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.WolvesDen});
      }

      return this._wolfDens;
    };

    // Gets a list of the player's wolf dens.
    private _werewolfDens: ZChipAPI.ProductionBuilding[];
    get werewolfDens(): ZChipAPI.ProductionBuilding[]{
      if(this._werewolfDens == null){
        this._werewolfDens = <ZChipAPI.ProductionBuilding[]>this._scope.getBuildings({player: this._scope.playerNumber, type: ZChipAPI.BuildingType.WerewolvesDen});
      }

      return this._werewolfDens;
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

    // The number of goldmines the ai should try to work at the same time.
    private _desiredActiveMines: number;

    // This caches the distance between buildings.
    private _cachedBuildingDistances: number[][];

    // The minimum number of workers that we should have before we consider using them for non essential tasks.
    private _minimumWorkers: number;

    constructor(maxMineDistance: number, maxWorkersPerGoldmine: number, maxActiveMines: number, desiredActiveMines: number, minimumWorkers: number){
      super();

      this._maxMineDistance = maxMineDistance;
      this._maxWorkersPerGoldmine = maxWorkersPerGoldmine;
      this._maxActiveMines = maxActiveMines;
      this._desiredActiveMines = desiredActiveMines;
      this._minimumWorkers = minimumWorkers;
      this._cachedBuildingDistances = [];
    }

    // Gets the number of workers that are available for non essential tasks.
    get disposableWorkers():number{
      let minimumDesiredWorkers = this._minimumWorkers;
      return this._cache.workers.length - minimumDesiredWorkers;
    }

    // Gets the desired number of workers.
    get targetWorkerCount(): number{
      // TODO: Adjust for worker splitting.
      return this._maxWorkersPerGoldmine * this.activeMines.length;
    }

    // Gets the mines close enough to our current bases to mine.
    get activeMines(): ZChipAPI.Mine[]{
      let activeMines: ZChipAPI.Mine[] = [];
      for(let i = 0; i < this._cache.bases.length; i++){
        let base = this._cache.bases[i];
        let mines = this.getMinesOrderedByProximity(base, true);

        for(let j = 0; j < mines.length; j++){
          let mine = mines[j]
          if(this.getCachedDistanceBetweenBuildings(base, mine) < this._maxMineDistance){
            activeMines.push(mine);

            if(activeMines.length >= this._maxActiveMines){
              return activeMines;
            }
          }
        }
      }

      return activeMines;
    }

    // Gets the distance between two buildings and caches it.
    private getCachedDistanceBetweenBuildings(building1: ZChipAPI.Building, building2:ZChipAPI.Mine): number{
      if(this._cachedBuildingDistances[building1.id] === undefined){
        this._cachedBuildingDistances[building1.id] = [];
      }

      if(this._cachedBuildingDistances[building1.id][building2.id] === undefined){
        this._cachedBuildingDistances[building1.id][building2.id] = this._scope.getDistanceBetweenBuildings(building1, building2);
      }

      return this._cachedBuildingDistances[building1.id][building2.id];
    }

    // Gets the mines ordered by proximity to the specified building.
    private getMinesOrderedByProximity(building: ZChipAPI.Building, undepleted:boolean): ZChipAPI.Mine[]{
      let reachableMines = this._cache.mines.filter((m: ZChipAPI.Mine):boolean =>{
        if(this.getCachedDistanceBetweenBuildings(building, m) == null){
          return false;
        }
        else{
          return true;
        }
      });

      let mines = reachableMines.sort(
        (a:ZChipAPI.Mine, b:ZChipAPI.Mine): number => {
          return (this.getCachedDistanceBetweenBuildings(building, a) - this.getCachedDistanceBetweenBuildings(building, b));
        }
      );

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

    // Chooses a mine to expand to, or returns null if no expansion is warranted.
    considerExpansion(currentBase: ZChipAPI.Building): ZChipAPI.Mine{
      if(currentBase == null){
        // TODO: Choose a better action if we have no base.
        return null;
      }

      if(this.activeMines.length >= this._desiredActiveMines){
        // We think we have enough mines.
        return null;
      }

      var orderedMines: ZChipAPI.Mine[] = this.getMinesOrderedByProximity(currentBase, true);
      var castleCost: number = this._scope.getBuildingTypeFieldValue(ZChipAPI.BuildingType.Castle, ZChipAPI.TypeField.Cost);

      for(let i = 0; i < orderedMines.length; i++){
        let candidate: ZChipAPI.Mine = orderedMines[i];
        if(this.activeMines.filter((a:ZChipAPI.Mine): boolean=>{
          return candidate.equals(a);
        }).length > 0){
          // Don't expand to the mine if we're already working it.

          continue;
        }

        let distanceToMine : number = this.getCachedDistanceBetweenBuildings(currentBase, candidate);

        if(distanceToMine == null){
          // Can't find a path, keep looking.
          continue;
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
        let workers: ZChipAPI.Worker[] = this._cache.workers;
        let miners: number[] = [];
        for(let i = 0; i < activeMines.length; i++){
          let activeMine = activeMines[i];
          miners[activeMine.id] = 0;
        }

        // Count the number of miners currently mining each mine.
        for(let i = 0; i < activeMines.length; i++){
          let activeMine = activeMines[i];

          for(let j = 0; j < workers.length; j++){
            let worker = workers[j];
            if(worker.currentOrder == ZChipAPI.OrderType.Mine){
              // TODO: Comparing Ids is kinda hax.
              if(worker.targetMineId != null && worker.targetMineId == activeMine.id){
                if(miners[activeMine.id] > this._maxWorkersPerGoldmine){
                  worker.stop();
                }
                else{
                  miners[activeMine.id] += 1;
                }
              }
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
            if(leastMinedMine == null || minesMiners < minMiners){
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
          var closestBase:ZChipAPI.ProductionBuilding = <ZChipAPI.ProductionBuilding>this._scope.getClosestByGround(worker.x, worker.y, this._cache.bases);
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

    // The maximum diameter around the AIs base that it will try to build in.
    private _maxBaseSize: number;

    // The number of free supply left before a farm will be constructed.
    private _supplyBuffer: number;

    // The maximum distance from a mine to build a castle.
    private _maxMineDistance: number;

    // The last location that the AI tried to build.
    private _lastBuildSite: ZChipAPI.Point;

    // A list of locations that the AI has tried to build at repeatedly.
    private _blacklistedBuildSites: ZChipAPI.Point[];

    private static getBuildingTypeFromAction(action: BuildAction): ZChipAPI.BuildingType{
      switch(action){
        case BuildAction.BuildAdvancedWorkshop:
          return ZChipAPI.BuildingType.AdvancedWorkshop;
        case BuildAction.BuildAnimalTestingLab:
          return ZChipAPI.BuildingType.AnimalTestingLab;
        case BuildAction.BuildBarracks:
          return ZChipAPI.BuildingType.Barracks;
        case BuildAction.BuildChurch:
          return ZChipAPI.BuildingType.Church;
        case BuildAction.BuildDragonsLair:
          return ZChipAPI.BuildingType.DragonsLair;
        case BuildAction.BuildMagesGuild:
          return ZChipAPI.BuildingType.MagesGuild;
        case BuildAction.BuildSnakeCharmer:
          return ZChipAPI.BuildingType.SnakeCharmer;
        case BuildAction.BuildForge:
          return ZChipAPI.BuildingType.Forge;
        case BuildAction.BuildHouse:
          return ZChipAPI.BuildingType.House;
        case BuildAction.BuildWatchtower:
          return ZChipAPI.BuildingType.Watchtower;
        case BuildAction.BuildWolfDen:
          return ZChipAPI.BuildingType.WolvesDen;
        case BuildAction.BuildWorkshop:
          return ZChipAPI.BuildingType.Workshop;
      }
    }

    private static getUnitTypeFromAction(action: BuildAction): ZChipAPI.UnitType{
      switch(action){
        case BuildAction.TrainAirship:
          return ZChipAPI.UnitType.Airship;
        case BuildAction.TrainArcher:
          return ZChipAPI.UnitType.Archer;
        case BuildAction.TrainBallista:
          return ZChipAPI.UnitType.Ballista;
        case BuildAction.TrainBird:
          return ZChipAPI.UnitType.Bird;
        case BuildAction.TrainCatapult:
          return ZChipAPI.UnitType.Catapult;
        case BuildAction.TrainDragon:
          return ZChipAPI.UnitType.Dragon;
        case BuildAction.TrainGatlingGun:
          return ZChipAPI.UnitType.GatlingGun;
        case BuildAction.TrainKnight:
          return ZChipAPI.UnitType.Knight;
        case BuildAction.TrainMage:
          return ZChipAPI.UnitType.Mage;
        case BuildAction.TrainPriest:
          return ZChipAPI.UnitType.Priest;
        case BuildAction.TrainRaider:
          return ZChipAPI.UnitType.Raider;
        case BuildAction.TrainSnake:
          return ZChipAPI.UnitType.Snake;
        case BuildAction.TrainSoldier:
          return ZChipAPI.UnitType.Soldier;
        case BuildAction.TrainWerewolf:
          return ZChipAPI.UnitType.Werewolf;
        case BuildAction.TrainWolves:
          return ZChipAPI.UnitType.Wolf;
        case BuildAction.TrainWorker:
          return ZChipAPI.UnitType.Worker;
      }
    }

    // Repair dammaged buildings or finishes buildings that were left incomplete.
    rebuildAndRepair(disposableWorkers: number){
      // Don't pull workers away from their other duties uness we can spare them.
      if(disposableWorkers < 1){
        return;
      }

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

  		if(repairingWorkers.length == 0 && availibleWorkers.length > 0){
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
          if(i < 0 || j < 0 || i >= this._scope.mapWidth || j > this._scope.mapHeight) {
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

          // If we try to build in the same spot twice in a row, something has gone wrong and we probably can't actually build there.
          if(this._lastBuildSite != null && i == this._lastBuildSite.x && j == this._lastBuildSite.y){
            let alreadyInBlacklist = false;

            for(let k = 0; k < this._blacklistedBuildSites.length; k++){
              let blacklistedSite = this._blacklistedBuildSites[k];

              if(blacklistedSite.x == this._lastBuildSite.x && blacklistedSite.y == this._lastBuildSite.y){
                alreadyInBlacklist = true;
                continue;
              }
            }

            if(!alreadyInBlacklist){
              this._blacklistedBuildSites.push(this._lastBuildSite);
            }
          }

          for(let k = 0; k < this._blacklistedBuildSites.length; k++){
            let blacklistedSite = this._blacklistedBuildSites[k];

            if(blacklistedSite.x == i && blacklistedSite.y == j){
              return false;
            }
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
    buildCastleNearGoldmine(goldmine: ZChipAPI.Building, maxMineDistance: number):boolean{
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
            let canPlace = self.canPlaceBuilding(ZChipAPI.BuildingType.Castle, x, y, 0);
            if(!canPlace){
              return false;
            }

            let distanceToPosition = self.getDistanceToBuildSite(base, ZChipAPI.BuildingType.Castle, x, y);
            let tooFar = distanceToPosition == null || distanceToPosition > maxMineDistance;
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

      this._lastBuildSite = buildPosition;
      closestWorker.build(ZChipAPI.BuildingType.Castle, buildPosition.x, buildPosition.y);
      return true;
    }

    // Attempts to build the specified building at a position. Returns true if success, otherwise false.
    buildBuildingNearBuilding(baseBuilding: ZChipAPI.Building, type: ZChipAPI.BuildingType):boolean{
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
        this._maxBaseSize += 10;
        return false;
      }

      this._lastBuildSite = buildPosition;
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

    getBuildActionCost(action : BuildAction):number{
      var cost: number;
      cost = 0;
      
      let damageUpgradeLevel = this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.AttackUpgrades);
      let armourUpgradLevel = this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.ArmourUpgrades);

      switch(action){
        case BuildAction.Expand:
          let castleType = ZChipAPI.BuildingType.Castle;
          cost = this._scope.getBuildingTypeFieldValue(castleType, ZChipAPI.TypeField.Cost);
          break;
        case BuildAction.BuildWolfDen:
        case BuildAction.BuildBarracks:
        case BuildAction.BuildAdvancedWorkshop:
        case BuildAction.BuildAnimalTestingLab:
        case BuildAction.BuildChurch:
        case BuildAction.BuildDragonsLair:
        case BuildAction.BuildForge:
        case BuildAction.BuildMagesGuild:
        case BuildAction.BuildSnakeCharmer:
        case BuildAction.BuildHouse:
        case BuildAction.BuildWorkshop:
          let buildingType = ConstructionCommander.getBuildingTypeFromAction(action);
          cost = this._scope.getBuildingTypeFieldValue(buildingType, ZChipAPI.TypeField.Cost);
          break;
        case BuildAction.BuildWatchtower:
          let watchtowerType = ConstructionCommander.getBuildingTypeFromAction(action);
          var watchtowers = this._scope.getBuildings({type:watchtowerType}).length;
          cost = this._scope.getBuildingTypeFieldValue(watchtowerType, ZChipAPI.TypeField.Cost) + (25 * watchtowers); //TODO: 25 is a magic number:baad.
          break;
        case BuildAction.TrainAirship:
        case BuildAction.TrainArcher:
        case BuildAction.TrainBallista:
        case BuildAction.TrainBird:
        case BuildAction.TrainCatapult:
        case BuildAction.TrainDragon:
        case BuildAction.TrainGatlingGun:
        case BuildAction.TrainKnight:
        case BuildAction.TrainMage:
        case BuildAction.TrainPriest:
        case BuildAction.TrainRaider:
        case BuildAction.TrainSnake:
        case BuildAction.TrainSoldier:
        case BuildAction.TrainWerewolf:
        case BuildAction.TrainWolves:
        case BuildAction.TrainWorker:
          let unitType = ConstructionCommander.getUnitTypeFromAction(action);
          cost = this._scope.getUnitTypeFieldValue(unitType, ZChipAPI.TypeField.Cost);
          break;
        case BuildAction.UpgradeCastle:
          cost = this._scope.getUpgradeTypeFieldValue(ZChipAPI.UpgradeType.FortressUpgrade, ZChipAPI.TypeField.Cost);
        case BuildAction.UpgradeWolfDen:
          cost = this._scope.getUpgradeTypeFieldValue(ZChipAPI.UpgradeType.WerewolvesDenUpgrade, ZChipAPI.TypeField.Cost);
          break;
        case BuildAction.UpgradeAttack:
          cost = Math.max(this._scope.getUpgradeTypeFieldValue(ZChipAPI.UpgradeType.AttackUpgrades, ZChipAPI.TypeField.Cost)) + ((damageUpgradeLevel + armourUpgradLevel) * 60);
          break;
        case BuildAction.UpgradeArmour:
          cost = Math.max(this._scope.getUpgradeTypeFieldValue(ZChipAPI.UpgradeType.ArmourUpgrades, ZChipAPI.TypeField.Cost)) + ((damageUpgradeLevel + armourUpgradLevel) * 60);
          break;
        case BuildAction.ResearchFireball:
          cost = this._scope.getUpgradeTypeFieldValue(ZChipAPI.UpgradeType.FireballUpgrade, ZChipAPI.TypeField.Cost);
          break;
      }
      return cost;
    }

    // Executes the build orders as determined by the priority.
    executeBuildOrders(priority: BuildPriorityItem[], expansionTarget: ZChipAPI.Mine, currentBase:ZChipAPI.Building){
      var disposableGold: number = this._scope.currentGold;
      var cost: number;
      var buildingInProgress :boolean= false;
      var actionSucceeded :boolean;
      if(this.getPendingBuildOrders().length > 0){
        buildingInProgress = true;
      }

      while(priority.length > 0){
        let workOrder: BuildPriorityItem = priority.shift();
        actionSucceeded = false;

        cost = this.getBuildActionCost(workOrder.buildAction);
        if(cost > disposableGold && workOrder.saveUpFor){
          return;
        }
        else if(cost > disposableGold){
          continue;
        }

        switch(workOrder.buildAction){
          case BuildAction.Expand:            
            if(!buildingInProgress && expansionTarget != null){
              actionSucceeded = this.buildCastleNearGoldmine(expansionTarget, this._maxMineDistance);

              if(actionSucceeded){
                buildingInProgress = true;
                this._scope.chatMessage("General Z is thinking: A man's home is his castle.");
              }
            }
            break;
          case BuildAction.BuildWolfDen:
          case BuildAction.BuildBarracks:
            let tierTwoBuildingType = ConstructionCommander.getBuildingTypeFromAction(workOrder.buildAction);            
            let completedHouses = this._cache.houses.filter(x => x.isUnderConstruction == false);

            if(!buildingInProgress && currentBase != null && completedHouses.length > 0){
              actionSucceeded = this.buildBuildingNearBuilding(currentBase, tierTwoBuildingType);

              if(actionSucceeded){
                buildingInProgress = true;
              }
            }
            break;
          case BuildAction.BuildAdvancedWorkshop:
          case BuildAction.BuildAnimalTestingLab:
          case BuildAction.BuildChurch:
          case BuildAction.BuildDragonsLair:
          case BuildAction.BuildForge:
          case BuildAction.BuildMagesGuild:
          case BuildAction.BuildSnakeCharmer:
          case BuildAction.BuildHouse:
          case BuildAction.BuildWatchtower:
          case BuildAction.BuildWorkshop:
            let buildingType = ConstructionCommander.getBuildingTypeFromAction(workOrder.buildAction);
            if(!buildingInProgress && currentBase != null){
              actionSucceeded = this.buildBuildingNearBuilding(currentBase, buildingType);

              if(actionSucceeded){
                buildingInProgress = true;
              }
            }
            break;
            case BuildAction.TrainAirship:
            case BuildAction.TrainArcher:
            case BuildAction.TrainBallista:
            case BuildAction.TrainBird:
            case BuildAction.TrainCatapult:
            case BuildAction.TrainDragon:
            case BuildAction.TrainGatlingGun:
            case BuildAction.TrainKnight:
            case BuildAction.TrainMage:
            case BuildAction.TrainPriest:
            case BuildAction.TrainRaider:
            case BuildAction.TrainSnake:
            case BuildAction.TrainSoldier:
            case BuildAction.TrainWerewolf:
            case BuildAction.TrainWolves:
            case BuildAction.TrainWorker:
              let unitType = ConstructionCommander.getUnitTypeFromAction(workOrder.buildAction);
              let producerTypes = this._scope.getProducers(unitType);

              let productionBuildings = this._cache.unitProductionBuildings;
              for(let i = 0; i < productionBuildings.length; i++){
                let productionBuilding = productionBuildings[i];

                for(let j = 0; j < producerTypes.length; j++){
                  if(productionBuilding.type == producerTypes[j] && !productionBuilding.isBusy){
                    actionSucceeded = productionBuilding.trainUnit(unitType);
  
                    if(actionSucceeded){
                      break;
                    }
                  }
                }
              }
              break;
          case BuildAction.UpgradeCastle:
            for(let i = 0; i < this._cache.castles.length; i++){
              let castle = <ZChipAPI.ProductionBuilding>this._cache.castles[i];

              if(!castle.isBusy){
                actionSucceeded = castle.researchUpgrade(ZChipAPI.UpgradeType.FortressUpgrade);
                break;
              }
            }
            break;
          case BuildAction.UpgradeWolfDen:
            for(let i = 0; i < this._cache.wolfDens.length; i++){
              let den = <ZChipAPI.ProductionBuilding>this._cache.wolfDens[i];

              if(!den.isBusy){
                actionSucceeded = den.researchUpgrade(ZChipAPI.UpgradeType.WerewolvesDenUpgrade);
                break;
              }
            }
            break;
          case BuildAction.ResearchFireball:
            for(let i = 0; i < this._cache.magesGuilds.length; i++){
              let guild = <ZChipAPI.ProductionBuilding>this._cache.magesGuilds[i];

              if(!guild.isBusy){
                actionSucceeded = guild.researchUpgrade(ZChipAPI.UpgradeType.FireballUpgrade);
                break;
              }
            }
            break;
          case BuildAction.UpgradeAttack:
            for(let i = 0; i < this._cache.forges.length; i++){
              let forge = <ZChipAPI.ProductionBuilding>this._cache.forges[i];

              if(!forge.isBusy){
                actionSucceeded = forge.researchUpgrade(ZChipAPI.UpgradeType.AttackUpgrades);
                break;
              }
            }
            break;
          case BuildAction.UpgradeArmour:
            for(let i = 0; i < this._cache.forges.length; i++){
              let forge = <ZChipAPI.ProductionBuilding>this._cache.forges[i];

              if(!forge.isBusy){
                actionSucceeded = forge.researchUpgrade(ZChipAPI.UpgradeType.ArmourUpgrades);
                break;
              }
            }
            break;
        }

        if(actionSucceeded || workOrder.saveUpFor){
          disposableGold -= cost;
        }
      }
    }

    constructor(baseSpacing: number, supplyBuffer: number, maxMineDistance: number){
      super();
      this._baseSpacing = baseSpacing;
      this._supplyBuffer = supplyBuffer;
      this._maxMineDistance = maxMineDistance;
      this._lastBuildSite = null;
      this._blacklistedBuildSites = [];

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

    // A value indicating whether the AI should attack known or suspected enemy bases.
    attackMode: boolean;

    // A list of goldmines suspected to harbour enemy bases.
    suspectedBases: ZChipAPI.Mine[];

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
          if(location != null && player != this._scope.playerNumber){
            var startingMine = this._scope.getClosestByGround(location.x, location.y, this._cache.mines);
            scoutOrder.push(startingMine);
          }
        }

        return scoutOrder;
      }


      return this._cache.mines;
    }

    // A function that takes in a list of units, and a dictionary of their hit points last AI cycle and determines which of them has been attacked.
    getAttackedUnits(units: ZChipAPI.Unit[], oldHitpoints: number[], damageThreshold: number):ZChipAPI.Unit[] {
      var attackedUnits = [];
      for(var i = 0; i < units.length; i++){
  			var unit = units[i];
  			var oldUnitHitpoints = oldHitpoints[unit.id];
  			if(oldUnitHitpoints != null && oldUnitHitpoints - unit.hitpoints > damageThreshold){
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
    setBehaviourCoward(units: ZChipAPI.Unit[], damageThreshold:number){
      if(this._cache.enemyArmy.length == 0){
        return;
      }

      let runaways: ZChipAPI.Unit[] = this.getAttackedUnits(units, this._oldHitpoints, damageThreshold);
      let center = this._scope.getCenterOfUnits(this._cache.enemyArmy);

      for(let i = 0; i < runaways.length; i++){
        let runaway = runaways[i];
        let x = runaway.x - center.x;
        let y = runaway.y - center.y;
        runaway.move(runaway.x + x, runaway.y + y);
      }
    }

    // Commands all specified units to smash attack if there are enough nearby enemies.
    setBehaviourSmash(units: ZChipAPI.Unit[], smashTreshold: number){
      for(let i = 0; i < units.length; i++){
        let inRange:number = 0;
        let smasher: ZChipAPI.Unit = units[i];
        let smasherCenterX = smasher.x + (smasher.size / 2);
        let smasherCenterY = smasher.y + (smasher.size / 2);

        for(let j = 0; j < this._cache.enemyArmy.length; j++){
          let smashee: ZChipAPI.Unit = this._cache.enemyArmy[j];
          let smasheeCenterX = smashee.x + (smashee.size / 2);
          let smasheeCenterY = smashee.y + (smashee.size / 2);
          if(this._scope.getDistance(smasherCenterX, smasherCenterY, smasheeCenterX, smasheeCenterY) < 2.5){
            inRange += 1;
          }
        }

        if(inRange > smashTreshold){
          this._scope.order(ZChipAPI.OrderType.Smash, [smasher], null, false);
        }
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
    setBehaviourRetreat(units: ZChipAPI.Unit[], base: ZChipAPI.Building):void{
      for(let i = 0; i < units.length; i++){
        var fighter = units[i];
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
    private clearSuspicionFromScoutedMines(clearDistance: number): void{
      this.suspectedBases = this.suspectedBases.filter((m:ZChipAPI.Mine):boolean =>{
        for(let j = 0; j < this._cache.units.length; j++){
          let unit = this._cache.units[j];
          if(this._scope.getDistance(unit.x, unit.y, m.x, m.y) < clearDistance){
            this._scope.chatMessage("General Z is thinking: Ain't nobody here but us chickens.");
            return false;
          }
        }

        return true;
      });
    }

    // Orders units other than the scout to attack move to the coordinate.
    private setBehaviourAttack(units: ZChipAPI.Unit[], x:number, y:number):void{
      for(let i = 0; i < units.length; i++){
        var fighter = units[i];
        fighter.attackTo(x, y);
      }
    }

    // Selects a scout and orders that scout to move.
    private issueScoutOrders(minimumArmySizeToScout: number):void{
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
        this._cache.army.length > minimumArmySizeToScout
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
    private setAttackMode(attackArmySize: number, retreatArmySize: number):void{
      // TODO: Magic number should go bye bye.
      if(this.attackMode == false && (this._cache.army.length > attackArmySize || this._scope.currentSupply >= this._scope.supplyCap - 6)){
        this._scope.chatMessage("General Z is thinking: I'm ready to attack!");
        this.attackMode = true;
      }
      else if(this.attackMode == true && this._cache.army.length < retreatArmySize){
        this._scope.chatMessage("General Z is thinking: My army has been decimated!");
        this.attackMode = false;
      }
    }

    // Issues general attack and retreat orders.
    private issueGeneralOrders(expansionTarget: ZChipAPI.Mine, primaryBase: ZChipAPI.Building):void{
      let nonScoutArmy = this.excludeScoutFromUnits(this._cache.army);

      if(this._cache.enemyUnits.length > 0){
        let target = this._scope.getCenterOfUnits(this._cache.enemyUnits);
        this.setBehaviourAttack(nonScoutArmy, target.x, target.y);
      }
      else if(expansionTarget != null){
        this.setBehaviourAttack(nonScoutArmy,expansionTarget.x, expansionTarget.y);
      }
      else if(this.attackMode == false  && primaryBase != null){
        this.setBehaviourRetreat(nonScoutArmy, primaryBase);
      }
      else if(this.attackMode == true && this._cache.enemyBuildings.length > 0){
        // TODO prioritize target.
        var targetBuilding = this._cache.enemyBuildings[0];
        this.setBehaviourAttack(nonScoutArmy,targetBuilding.x, targetBuilding.y);
      }
      else if(this.attackMode == true && this.suspectedBases.length > 0){
        if(this.suspectedBases.length > 0){
          var targetMine = this.suspectedBases[0];
          this.setBehaviourAttack(nonScoutArmy,targetMine.x, targetMine.y);
        }
      }
      else if(primaryBase != null){
        this.setBehaviourRetreat(nonScoutArmy,primaryBase);
      }
      else{
        let unitCenter = this._scope.getCenterOfUnits(this._cache.units);
        this.setBehaviourAttack(nonScoutArmy,unitCenter.x, unitCenter.y);
      }
    }

    // Issues individual micro commands.
    private issueMicroOrders(cowardThreshold: number): void{
      var combatArchers = this.excludeScoutFromUnits(this._cache.archers);
      var combatWolves = this.excludeScoutFromUnits(this._cache.wolves);
      var combatWerewolves = this.excludeScoutFromUnits(this._cache.werewolves);
      //var archerCenter = this._scope.getCenterOfUnits(combatArchers);
      //var enemies = this._cache.enemyArmy;
      //var mostCentralEnemy = this._scope.getClosest(archerCenter.x, archerCenter.y, enemies);

      //this.setFocusFireBehaviour(combatArchers, mostCentralEnemy);
      this.setBehaviourVulture(combatArchers);
      this.setBehaviourCoward(combatArchers, cowardThreshold);
      this.setBehaviourCoward(combatWolves, cowardThreshold);
      this.setBehaviourSmash(combatWerewolves, 3);
    }

    // Issues all combat orders to units.
    executeCombatOrders(expansionTarget: ZChipAPI.Mine, primaryBase: ZChipAPI.Building, options: IBuild):void{
      this.clearSuspicionFromScoutedMines(options.checkMineForBaseDistance);

      this.setAttackMode(options.attackArmySize, options.retreatArmySize);

      this.issueScoutOrders(options.scoutArmySize);

      this.issueGeneralOrders(expansionTarget, primaryBase);

      this.issueMicroOrders(options.attackedDamageThreshold);

      this.pullWorkers(options.workerAttackRatio, options.workerAttackDistance);

      this._oldHitpoints = this.getUnitHitpoints(this._cache.army);
    }

    private pullWorkers(workerAttackRatio: number, workerAttackDistance: number):void {
      var enemies: ZChipAPI.Unit[] = this._cache.enemyArmy;
      var workers: ZChipAPI.Worker[] = this._cache.workers;

      if(enemies.length > this._cache.army.length && workers.length /  workerAttackRatio > enemies.length){
        for(let i = 0; i < workers.length; i++){
          var worker: ZChipAPI.Worker = workers[i];
          var closestEnemy: ZChipAPI.Unit = <ZChipAPI.Unit>this._scope.getClosestByGround(worker.x, worker.y, enemies);

          if(closestEnemy == null){
              continue;
          }

          var distanceToTarget: number = this._scope.getGroundDistance(worker.x, worker.y, closestEnemy.x, closestEnemy.y)
          if(distanceToTarget != null && distanceToTarget < workerAttackDistance){
            worker.attack(closestEnemy);
          }
        }
      }
    }

    constructor(){
      super();
      this.scout = null;
      this.scoutOrder = null;
      this.attackMode = false;
      this.suspectedBases = [];
    }
  }

  export class GrandCommander extends CommanderBase{
    // Object to handle worker mining and expansions.
    economyCommander: EconomyCommander;

    // Object to handle base and unit construction.
    constructionCommander: ConstructionCommander;

    // Object to handle combat unit orders.
    combatCommander: CombatCommander;

    // Object to dictate the build.
    build: IBuild;

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
      debugger;
      var primaryBase:ZChipAPI.Building = this.selectPrimaryBase();

      // Economic Orders.
      this.economyCommander.assignIdleWorkers();
      var expansionTarget: ZChipAPI.Mine = this.economyCommander.considerExpansion(primaryBase);

      // Build Orders.
      var constructionPriority: BuildPriorityItem[] = this.build.establishBuildPriority(expansionTarget, this.economyCommander.targetWorkerCount, this.economyCommander.disposableWorkers, this.constructionCommander.getUpgradesInProgress());
      this.constructionCommander.executeBuildOrders(constructionPriority, expansionTarget, primaryBase);
      this.constructionCommander.rebuildAndRepair(this.economyCommander.disposableWorkers);

      // Combat Orders.
      this.combatCommander.executeCombatOrders(expansionTarget, primaryBase, this.build);
    }

    // Selects the current primary base.
    selectPrimaryBase(): ZChipAPI.Building{
      if(this._cache.bases.length > 0){
        let prioritizedBases = this._cache.bases.sort((a, b) =>{
          return b.creationCycle - a.creationCycle;
        });

        return prioritizedBases[0];
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
      this.build.setScope(scope, cache);
    }

    constructor(build: IBuild){
      super();
      this.build = build;
      this.combatCommander = new CombatCommander();
      this.economyCommander = new EconomyCommander(this.build.maxMineDistance, this.build.maxWorkersPerGoldmine, this.build.maxActiveMines, this.build.desiredActiveMines, this.build.minimumWorkers);
      this.constructionCommander =  new  ConstructionCommander(this.build.baseSpacing, this.build.supplyBuffer, this.build.maxMineDistance);
    }
  }

  export class BuildPriorityItem{
    buildAction: BuildAction;
    saveUpFor: boolean;

    constructor(buildAction: BuildAction, saveUpFor: boolean){
      this.buildAction = buildAction;
      this.saveUpFor = saveUpFor;
    }
  }

  // A class with static values that determine the AI's behaviour.
  export interface IBuild{
    scoutArmySize: number;
    retreatArmySize: number;
    attackArmySize:number;
    attackedDamageThreshold: number;
    maxMineDistance: number;
    maxWorkersPerGoldmine:number;
    baseSpacing: number;
    supplyBuffer: number;
    workerAttackDistance: number;
    workerAttackRatio: number;
    checkMineForBaseDistance: number;
    maxActiveMines: number;
    desiredActiveMines: number;
    minimumWorkers: number;

    // Sets the scope and the scope cache. Should be called once per cycle.
    setScope(scope: ZChipAPI.Scope, cache: Cache);

    // Establishes the priorities to build various units and buildings.
    establishBuildPriority(expansionTarget: ZChipAPI.Mine, desiredWorkers: number, disposableWorkers: number, upgradesInProgress: ZChipAPI.UpgradeType[]):BuildPriorityItem[];
  }
}
