/// <reference path="../ZChip-API.ts"/>
/// <reference path="../Common.ts"/>
/// <reference path="../ZChip-AI.ts"/>

// A build that builds towers.
class TurtleBuild implements ZChipAI.IBuild{
  scoutArmySize: number;
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
  attackRampUp:number;

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
    this.baseSpacing = 1;
    this.watchtowersPerCastle = 0;
    this.supplyBuffer = 6;
    this.workerAttackDistance = 15;
    this.workerAttackRatio = 1.5;
    this.checkMineForBaseDistance = 4;
    this.maxActiveMines = 3;
    this.desiredActiveMines = 1;
    this.minimumWorkers = 5
    this.attackRampUp = 1;
  }


  setScope(scope: ZChipAPI.Scope, cache: ZChipAI.Cache){
    this._scope = scope;
    this._cache = cache;
  }

  establishBuildPriority(expansionTarget: ZChipAPI.Mine, desiredWorkers: number, disposableWorkers: number, upgradesInProgress: ZChipAPI.UpgradeType[]):ZChipAI.BuildAction[]{
    var priorityQueue: ZChipAI.BuildAction[] = [];
    var workersAvailable: boolean = disposableWorkers > 0;

    if(workersAvailable){
      priorityQueue.push(ZChipAI.BuildAction.BuildWatchtower);
    }

    return priorityQueue;
  }
}
