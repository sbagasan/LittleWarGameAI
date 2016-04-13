/// <reference path="../ZChip-API.ts"/>
/// <reference path="../Common.ts"/>
/// <reference path="../ZChip-AI.ts"/>

// A build based around barracks units.
class BeastBuild implements ZChipAI.IBuild{
  minimumArmySize: number;
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
    this.minimumArmySize = 2;
    this.attackArmySize = 5;
    this.upgradeRatio = 3;
    this.attackedDamageThreshold = 15;
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

  establishBuildPriority(expansionTarget: ZChipAPI.Mine, desiredWorkers: number, disposableWorkers: number, upgradesInProgress: ZChipAPI.UpgradeType[]):ZChipAI.BuildAction[]{
    var priorityQueue: ZChipAI.BuildAction[] = [];
    var workersAvailable: boolean = disposableWorkers > 0;

    if(expansionTarget != null && workersAvailable){
      priorityQueue.push(ZChipAI.BuildAction.Expand);
      return priorityQueue;
    }

    if(this._scope.currentSupply + this.supplyBuffer >= this._scope.maxAvailableSupply && this._scope.maxAvailableSupply < this._scope.supplyCap){
      priorityQueue.push(ZChipAI.BuildAction.BuildHouse);
      return priorityQueue;
    }

    if(this._cache.workers.length < desiredWorkers){
      priorityQueue.push(ZChipAI.BuildAction.TrainWorker);
    }

    /*if(this._cache.wolves.length > 10){
      priorityQueue.push(ZChipAI.BuildAction.UpgradeWolfDen);

      if(this._cache.werewolfDens.length < 1){
        return priorityQueue;
      }
    }*/

    if(this._cache.wolfDens.length > 0){
      priorityQueue.push(ZChipAI.BuildAction.TrainWolves);
    }

    if(this._cache.werewolfDens.length > 0){
      priorityQueue.push(ZChipAI.BuildAction.TrainWerewolf);
    }

    if(this._cache.houses.length > 0 && this._cache.werewolfDens.length + this._cache.wolfDens.length < 3 && workersAvailable){
      priorityQueue.push(ZChipAI.BuildAction.BuildWolfDen);
    }

    return priorityQueue;
  }
}
