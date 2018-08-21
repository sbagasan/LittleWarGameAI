/// <reference path="../ZChip-API.ts"/>
/// <reference path="../Common.ts"/>
/// <reference path="../ZChip-AI.ts"/>

// A build based around barracks units.
class TowerBuild implements ZChipAI.IBuild{
    scoutArmySize: number;
    retreatArmySize: number;
    attackArmySize:number;
    upgradeRatio:number;
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
      this.upgradeRatio = 3;
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

      priorityQueue.push(new ZChipAI.BuildPriorityItem(ZChipAI.BuildAction.BuildWatchtower, false));
  
      return priorityQueue;
    }
  }
  