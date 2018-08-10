/// <reference path="../ZChip-API.ts"/>
/// <reference path="../Common.ts"/>
/// <reference path="../ZChip-AI.ts"/>

// A build based around barracks units.
class RaxBuild implements ZChipAI.IBuild{
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
  
  private _scope: ZChipAPI.Scope;
  private _cache: ZChipAI.Cache;

  constructor (){
    this.scoutArmySize = 3;
    this.retreatArmySize = 3;
    this.attackArmySize = 10;
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
    this.desiredActiveMines = 2;
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
    }

    if(this._cache.workers.length < desiredWorkers){
      priorityQueue.push(ZChipAI.BuildAction.TrainWorker);
    }

    if(this._cache.watchtowers.length < this._cache.castles.length * this.watchtowersPerCastle && workersAvailable){
      priorityQueue.push(ZChipAI.BuildAction.BuildWatchtower);
    }

    if(this._cache.forges.length < 1 && this._cache.army.length > this.upgradeRatio && workersAvailable){
      priorityQueue.push(ZChipAI.BuildAction.BuildForge);

      if(this._scope.currentGold < this._scope.getBuildingTypeFieldValue(ZChipAPI.BuildingType.Forge, ZChipAPI.TypeField.Cost) && this._cache.army.length >= this._cache.enemyArmy.length){
        return priorityQueue;
      }
    }

    let damageUpgradeLevel = this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.AttackUpgrades);
    let armourUpgradLevel = this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.ArmourUpgrades);
    // TODO: 5 is a magic number. Baaad.
    if(this._cache.forges.length > 0 && damageUpgradeLevel < 5 && armourUpgradLevel < 5 && this._cache.army.length / this.upgradeRatio > damageUpgradeLevel){
      priorityQueue.push(ZChipAI.BuildAction.BarracksUpgrades);

      let upgradeCost = Math.max(this._scope.getUpgradeTypeFieldValue(ZChipAPI.UpgradeType.AttackUpgrades, ZChipAPI.TypeField.Cost)) + ((damageUpgradeLevel + armourUpgradLevel) * 60);
      if(upgradesInProgress.length < this._cache.forges.length && this._scope.currentGold < upgradeCost){
        return priorityQueue;
      }
    }

    if(this._cache.archers.length < this._cache.soldiers.length){
      priorityQueue.push(ZChipAI.BuildAction.TrainArcher);
    }
    else{
      priorityQueue.push(ZChipAI.BuildAction.TrainSoldier);
    }

    if(workersAvailable){
      priorityQueue.push(ZChipAI.BuildAction.BuildBarracks);
    }

    return priorityQueue;
  }
}
