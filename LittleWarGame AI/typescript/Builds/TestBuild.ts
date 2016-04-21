/// <reference path="../ZChip-API.ts"/>
/// <reference path="../Common.ts"/>
/// <reference path="../ZChip-AI.ts"/>

// A build based around barracks units.
class TestBuild implements ZChipAI.IBuild{
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
    this.scoutArmySize = 2;
    this.retreatArmySize = 2;
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

    if(this._cache.houses.length < 4){
      priorityQueue.push(ZChipAI.BuildAction.BuildHouse);
    }

    if(this._cache.barracks.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildBarracks);
    }

    if(this._cache.magesGuilds.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildMagesGuild);
    }

    if(this._cache.workshops.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildWorkshop);
    }

    if(this._cache.advancedWorksops.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildAdvancedWorkshop);
    }

    if(this._cache.churches.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildChurch);
    }

    if(this._cache.animalTestingLabs.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildAnimalTestingLab);
    }

    if(this._cache.wolfDens.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildWolfDen);
    }

    if(this._cache.forges.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildForge);
    }

    if(this._cache.watchtowers.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.BuildWatchtower);
    }

    if(this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.AttackUpgrades) < 1 || this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.ArmourUpgrades)){
      priorityQueue.push(ZChipAI.BuildAction.BarracksUpgrades);
    }

    if(this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.BeastAttackUpgrades) < 1 || this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.BeastArmourUpgrades)){
      priorityQueue.push(ZChipAI.BuildAction.BeastUpgrades);
    }

    if(this._scope.getUpgradeLevel(ZChipAPI.UpgradeType.FireballUpgrade) < 1){
      priorityQueue.push(ZChipAI.BuildAction.ResearchFireball);
    }

    if(this._cache.werewolfDens.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.UpgradeWolfDen);
    }

    if(this._cache.mages.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainMage);
    }

    if(this._cache.wolves.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainWolves);
    }

    if(this._cache.workers.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainWorker);
    }

    if(this._cache.soldiers.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainSoldier);
    }

    if(this._cache.archers.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainArcher);
    }

    if(this._cache.priests.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainPriest);
    }

    if(this._cache.birds.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainBird);
    }

    if(this._cache.catapults.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainCatapult);
    }

    if(this._cache.ballistae.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainBallista);
    }

    if(this._cache.werewolves.length < 1){
      priorityQueue.push(ZChipAI.BuildAction.TrainWerewolf);
    }

    return priorityQueue;
  }
}
