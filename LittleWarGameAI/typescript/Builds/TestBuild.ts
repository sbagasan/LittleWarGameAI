/// <reference path="../ZChip-API.ts"/>
/// <reference path="../Common.ts"/>
/// <reference path="../ZChip-AI.ts"/>

// A build based around barracks units.
class TestBuild implements ZChipAI.IBuild{
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

  private _scope: ZChipAPI.Scope;
  private _cache: ZChipAI.Cache;

  constructor (){
    this.scoutArmySize = 2;
    this.retreatArmySize = 2;
    this.attackArmySize = 5;
    this.attackedDamageThreshold = 15;
    this.maxMineDistance =15;
    this.maxWorkersPerGoldmine = 10;
    this.baseSpacing = 2;
    this.supplyBuffer = 6;
    this.workerAttackDistance = 15;
    this.workerAttackRatio = 1.5;
    this.checkMineForBaseDistance = 4;
    this.maxActiveMines = 3;
    this.desiredActiveMines = 1;
    this.minimumWorkers = 5
  }


  setScope(scope: ZChipAPI.Scope, cache: ZChipAI.Cache){
    this._scope = scope;
    this._cache = cache;
  }

  establishBuildPriority(expansionTarget: ZChipAPI.Mine, desiredWorkers: number, disposableWorkers: number, upgradesInProgress: ZChipAPI.UpgradeType[]):ZChipAI.BuildPriorityItem[]{
    var priorityQueue: ZChipAI.BuildPriorityItem[] = [];
    var workersAvailable: boolean = disposableWorkers > 0;

    if(this._scope.getBuildings({type: ZChipAPI.BuildingType.Fortress}).length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.UpgradeCastle,true));
    }

    if(this._cache.workers.length < 12){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainWorker,false));
    }

    if(this._cache.houses.length < 5){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildHouse,false));
    }

    if(this._cache.barracks.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildBarracks,false));
    }

    if(this._cache.magesGuilds.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildMagesGuild,false));
    }

    if(this._cache.workshops.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildWorkshop,false));
    }

    if(this._cache.advancedWorksops.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildAdvancedWorkshop,false));
    }

    if(this._cache.churches.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildChurch,false));
    }

    if(this._cache.animalTestingLabs.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildAnimalTestingLab,false));
    }

    if(this._cache.wolfDens.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildWolfDen,false));
    }

    if(this._scope.getBuildings({type: ZChipAPI.BuildingType.SnakeCharmer}).length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildSnakeCharmer,false));
    }

    if(this._cache.forges.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildForge,false));
    }

    if(this._cache.watchtowers.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildWatchtower,false));
    }

    if(this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.FireballUpgrade) < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.ResearchFireball,false));
    }

    if(this._cache.werewolfDens.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.UpgradeWolfDen,false));
    }

    if(this._scope.getBuildings({type: ZChipAPI.BuildingType.DragonsLair}).length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildDragonsLair,false));
    }

    if(this._cache.mages.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainMage,false));
    }

    if(this._cache.wolves.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainWolves,false));
    }

    if(this._cache.workers.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainWorker,false));
    }

    if(this._cache.soldiers.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainSoldier,false));
    }

    if(this._cache.archers.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainArcher,false));
    }

    if(this._cache.priests.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainPriest,false));
    }

    if(this._cache.birds.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainBird,false));
    }

    if(this._cache.catapults.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainCatapult,false));
    }

    if(this._scope.getUnits({type: ZChipAPI.UnitType.GatlingGun}).length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainGatlingGun,false));
    }

    if(this._scope.getUnits({type: ZChipAPI.UnitType.Raider}).length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainRaider,false));
    }

    if(this._scope.getUnits({type: ZChipAPI.UnitType.Knight}).length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainKnight,false));
    }

    if(this._scope.getUnits({type: ZChipAPI.UnitType.Snake}).length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainSnake,false));
    }    

    if(this._scope.getUnits({type: ZChipAPI.UnitType.Dragon}).length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainDragon,false));
    }    

    if(this._cache.ballistae.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainBallista,false));
    }

    if(this._cache.werewolves.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainWerewolf,false));
    }

    return priorityQueue;
  }
}
