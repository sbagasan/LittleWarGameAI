/// <reference path="../ZChip-API.ts"/>
/// <reference path="../Common.ts"/>
/// <reference path="../ZChip-AI.ts"/>

// A build based around barracks units.
class BeastBuild implements ZChipAI.IBuild{
  scoutArmySize : number;
  retreatArmySize: number;
  attackArmySize:number;
  upgradeRatio:number;
  attackedDamageThreshold: number;
  maxMineDistance: number;
  maxWorkersPerGoldmine:number;
  baseSpacing: number;
  watchtowersPerCastle: number;
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
    this.scoutArmySize = 1;
    this.retreatArmySize = 4;
    this.attackArmySize = 5;
    this.upgradeRatio = 3;
    this.attackedDamageThreshold = 8;
    this.maxMineDistance =15;
    this.maxWorkersPerGoldmine = 10;
    this.baseSpacing = 2;
    this.watchtowersPerCastle = 0;
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
    var wolfToWerewolfRatio: number = 3;
    var priorityQueue: ZChipAI.BuildPriorityItem[] = [];
    var workersAvailable: boolean = disposableWorkers > 0;
    var inProgressWerewolfDens = this._cache.wolfDens.filter(x => x.getUpgradeProductionAtQueue(0) == ZChipAPI.UpgradeType.WerewolvesDenUpgrade);

    if(expansionTarget != null && workersAvailable){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.Expand, true));
    }

    if(
        this._cache.houses.length < 1
        || (
          this._scope.currentSupply + this.supplyBuffer >= this._scope.maxAvailableSupply
          && this._scope.maxAvailableSupply < this._scope.supplyCap
          && (this._cache.wolfDens.length + this._cache.werewolfDens.length) > 0
        )
      ){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildHouse,false));
    }

    if(this._cache.workers.length < desiredWorkers){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainWorker, false));
    }

    if(this._cache.werewolfDens.length > 0 && this._cache.werewolves.length * wolfToWerewolfRatio < this._cache.wolves.length){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainWerewolf, false));
    }

    if(this._cache.werewolfDens.length + inProgressWerewolfDens.length > 0 && this._cache.workshops.length < 1){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildWorkshop,false));
    }

    if(this._cache.wolfDens.length > 1 && this._cache.wolves.length > 9){
      if(this._cache.werewolfDens.length + inProgressWerewolfDens.length < 1){
        priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.UpgradeWolfDen, true));
      }
      else{
        priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.UpgradeWolfDen, false));
      }
    }

    if(this._cache.wolfDens.length + this._cache.werewolfDens.length > 0 && (this._cache.werewolfDens.length == 0 || this._cache.werewolves.length * wolfToWerewolfRatio > this._cache.wolves.length - 2)){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainWolves, false));
    }

    if(this._cache.workshops.length > 0 && this._cache.catapults.length < this._cache.werewolves.length){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.TrainCatapult, false));
    }

    if(this._cache.houses.length > 0 && this._cache.werewolfDens.length + this._cache.wolfDens.length < 3 && workersAvailable){
      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildWolfDen, false));
    }

    return priorityQueue;
  }
}
