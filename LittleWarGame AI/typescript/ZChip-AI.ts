/// <reference path="./ZChip-API.ts"/>

class ConstructionCommander{
  // The minimum spacing around non castle buildings.
  baseSpacing: number;

  // The number of watchtowers to build for each castle the player owns.
  watchtowersPerCastle: number;

  // The maximum number of workers that should work each goldmine.
  maxWorkersPerGoldmine: number;

  // The maximum diameter around the AIs base that it will try to build in.
  private _maxBaseSize: number;

  // The maximum number of houses required to reach population cap.
  private _maxHouses: number;

  // The radius around a mine in which a castle cannot be built.
  private _minimumMineRadius: number;

  // The scope object.
  scope: ZChipAPI.Scope;

  constructor(scope: ZChipAPI.Scope, baseSpacing: number, watchtowersPerCastle: number, maxWorkersPerGoldmine: number){
    this.baseSpacing = baseSpacing;
    this.watchtowersPerCastle = watchtowersPerCastle;
    this.maxWorkersPerGoldmine = maxWorkersPerGoldmine;
    this.scope = scope;

    this._maxHouses = 10;
    this._maxBaseSize = 30;
    this._minimumMineRadius = 7;
  }

  // Determines if a position is too close to a gold mine to build a castle.
	tooCloseToGoldMine(x, y): boolean{
		for(var i = 0; i < this.scope.mines.length; i++){
			var mine = this.scope.mines[i];
			var distance = this.getDistance(x, y, mine.getX(), mine.getY());
			if(distance < this.minimumMineRadius){
				return true;
			}
		}

		return false;
	};
}

class CombatCommander{
  // A scout unit used to explore the map.
  scout: ZChipAPI.Unit;

  // An ordered collection of mine locations to scout.
  scoutOrder: ZChipAPI.Unit[];

  // The minimum army size the AI should have, under which only defensive behaviour will occur.
  minimumArmySize: number;

  // The minimum army size the AI must attain before they become aggressive.
  attackArmySize: number;

  // The number of additional troops the AI must have before investing in the next unit upgrade level.
  upgradeArmySize: number;

  // A value indicating whether the AI should attack known or suspected enemy bases.
  attackMode: boolean;

  // The amount of damage a unit must receive in one AI cycle to be considered under attack.
  attackedDamageThreshold: number;

  // A list of goldmines suspected to harbour enemy bases.
  suspectedBases: ZChipAPI.Unit[];

  // How close a unit must get to a goldmine to determine if there is an enemy base there.
  checkMineForBaseDistance: number;

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

  // Gets a dictionary with the current hit points of a set of units.
	getUnitHitpoints(units: ZChipAPI.Unit[]):number[]{
		var hitpoints = [];
		for(var i = 0; i < units.length; i++){
			var unit = units[i];
			hitpoints[unit.id] = unit.hitpoints;
		}

		return hitpoints;
	}

  constructor(minimumArmySize:number, attackArmySize:number, upgradeArmySize: number, attackedDamageThreshold:number){
    this.minimumArmySize = minimumArmySize;
    this.attackArmySize = attackArmySize;
    this.upgradeArmySize = upgradeArmySize;
    this.attackedDamageThreshold = attackedDamageThreshold;

    this.scout = null;
    this.scoutOrder = [];
    this.attackMode = false;
    this.suspectedBases = [];
    this.checkMineForBaseDistance = 2;
  }
}

class GrandCommander{
  // The current mine (if any) targeted for expansion.
  expansionMine: ZChipAPI.Unit;

  // The maximum distance workers are allowed to remote mine under normal circumstances.
  maxMineDistance: number;

  // The name to use in the chat window.
  chatName: string;

  constructor(maxMineDistance: number, chatName: string){
    this.expansionMine = null;
    this.maxMineDistance = maxMineDistance;
    this.chatName = chatName;
  }
}
