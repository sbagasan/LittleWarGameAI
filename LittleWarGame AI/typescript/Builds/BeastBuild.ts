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
  attackRampUp: number;

  private _scope: ZChipAPI.Scope;
  private _cache: ZChipAI.Cache;

  constructor (){
    this.scoutArmySize = 1;
    this.retreatArmySize = 4;
    this.attackArmySize = 5;
    this.upgradeRatio = 2;
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
    this.attackRampUp = 3;
  }


  setScope(scope: ZChipAPI.Scope, cache: ZChipAI.Cache){
    this._scope = scope;
    this._cache = cache;
  }

  establishBuildPriority(expansionTarget: ZChipAPI.Mine, desiredWorkers: number, disposableWorkers: number, upgradesInProgress: ZChipAPI.UpgradeType[]):ZChipAI.BuildAction[]{
    var wolfToWerewolfRatio: number = 3;
    var wolfToEnemyRatio: number = 1.25;
    var priorityQueue: ZChipAI.BuildAction[] = [];
    var workersAvailable: boolean = disposableWorkers > 0;
    var inProgressWerewolfDens = this._cache.wolfDens.filter(x => x.getUpgradeProductionAtQueue(0) == ZChipAPI.UpgradeType.WerewolvesDenUpgrade);

    if(expansionTarget != null && workersAvailable){
      priorityQueue.push(ZChipAI.BuildAction.Expand);
      return priorityQueue;
    }

    if(
        this._cache.houses.length < 1
        || (
          this._scope.currentSupply + this.supplyBuffer >= this._scope.maxAvailableSupply
          && this._scope.maxAvailableSupply < this._scope.supplyCap
          && (this._cache.wolfDens.length + this._cache.werewolfDens.length) > 0
        )
      ){
      priorityQueue.push(ZChipAI.BuildAction.BuildHouse);
    }

    if(this._cache.workers.length < desiredWorkers){
      priorityQueue.push(ZChipAI.BuildAction.TrainWorker);
    }

    if(this._cache.werewolves.length > this.upgradeRatio && this._cache.animalTestingLabs.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildAnimalTestingLab);
      return priorityQueue;
    }

    let beastAttackUpgradeLevel = this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.BeastAttackUpgrades);
    let beastArmourUpgradLevel = this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.BeastArmourUpgrades);
    // TODO: 5 is a magic number. Baaad.
    if(this._cache.animalTestingLabs.length > 0 && beastAttackUpgradeLevel < 5 && beastArmourUpgradLevel < 5 && this._cache.werewolves.length / this.upgradeRatio > beastAttackUpgradeLevel){
      priorityQueue.push(ZChipAI.BuildAction.BeastUpgrades);

      let upgradeCost = Math.max(this._scope.getUpgradeTypeFieldValue(ZChipAPI.UpgradeType.BeastAttackUpgrades, ZChipAPI.TypeField.Cost)) + ((beastAttackUpgradeLevel + beastArmourUpgradLevel) * 60);
      if(upgradesInProgress.length < this._cache.animalTestingLabs.length && this._scope.currentGold < upgradeCost){
        return priorityQueue;
      }
    }

    if(this._cache.werewolfDens.length > 0 && this._cache.werewolves.length * wolfToWerewolfRatio < this._cache.wolves.length){
      priorityQueue.push(ZChipAI.BuildAction.TrainWerewolf);
    }

    if(this._cache.werewolfDens.length + inProgressWerewolfDens.length > 0 && this._cache.workshops.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildWorkshop);
    }

    if(this._cache.wolfDens.length > 1 && (this._cache.wolves.length > 9 || this._cache.wolves.length < this._cache.enemyArmy.length * wolfToEnemyRatio)){
      priorityQueue.push(ZChipAI.BuildAction.UpgradeWolfDen);

      if(this._cache.werewolfDens.length + inProgressWerewolfDens.length < 1){
        return priorityQueue;
      }
    }

    if(this._cache.wolfDens.length + this._cache.werewolfDens.length > 0 && (this._cache.werewolfDens.length == 0 || this._cache.werewolves.length * wolfToWerewolfRatio > this._cache.wolves.length - 2)){
      priorityQueue.push(ZChipAI.BuildAction.TrainWolves);
    }

    if(this._cache.workshops.length > 0 && this._cache.catapults.length < this._cache.werewolves.length){
      priorityQueue.push(ZChipAI.BuildAction.TrainCatapult);
    }

    if(this._cache.houses.length > 0 && this._cache.werewolfDens.length + this._cache.wolfDens.length < 3 && workersAvailable){
      priorityQueue.push(ZChipAI.BuildAction.BuildWolfDen);
    }

    return priorityQueue;
  }
}
