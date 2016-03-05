/// <reference path="./ZChip-API.ts"/>

// Provides access to cached copies of scope data.
class Cache{
  private _scope: ZChipAPI.Scope;

  // Gets a list of the player's idle workers.
  private _idleWorkers: ZChipAPI.Unit[];
  get idleWorkers(): ZChipAPI.Unit[]{
    if(this._idleWorkers == null){
      this._idleWorkers = this._scope.getUnits({type: "Worker", order: "Stop", player: this._scope.playerNumber});
    }

    return this._idleWorkers;
  };

  // Gets a list of the player's mining workers.
  private _miningWorkers: ZChipAPI.Unit[];
  get miningWorkers(): ZChipAPI.Unit[]{
    if(this._miningWorkers == null){
      this._miningWorkers = this._scope.getUnits({type: "Worker", order: "Mine", player: this._scope.playerNumber});
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
      this._repairingWorkers = this._scope.getUnits({type: "Worker", order: "Repair", player: this._scope.playerNumber});
    }

    return this._repairingWorkers;
  };

  // Gets a list of the player's workers.
  private _workers: ZChipAPI.Unit[];
  get workers(): ZChipAPI.Unit[]{
    if(this._workers == null){
      this._workers = this._scope.getUnits({type: "Worker", player: this._scope.playerNumber});
    }

    return this._workers;
  };

  // Gets a list of the player's soldiers.
  private _soldiers: ZChipAPI.Unit[];
  get soldiers(): ZChipAPI.Unit[]{
    if(this._soldiers == null){
      this._soldiers = this._scope.getUnits({type: "Soldier", player: this._scope.playerNumber});
    }

    return this._soldiers;
  };

  // Gets a list of the player's archers.
  private _archers: ZChipAPI.Unit[];
  get archers(): ZChipAPI.Unit[]{
    if(this._archers == null){
      this._archers = this._scope.getUnits({type: "Archer", player: this._scope.playerNumber});
    }

    return this._archers;
  };

  // Gets a list of the player's army units.
  private _army: ZChipAPI.Unit[];
  get army(): ZChipAPI.Unit[]{
    if(this._army == null){
      this._army = this._scope.getUnits({notOfType: "Worker", player: this._scope.playerNumber});
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
      this._completeBuildings = this._scope.getBuildings({player: this._scope.playerNumber, onlyFinshed: true});
    }

    return this._completeBuildings;
  };

  // Gets a list of the player's castles.
  private _castles: ZChipAPI.Building[];
  get castles(): ZChipAPI.Building[]{
    if(this._castles == null){
      this._castles = this._scope.getBuildings({player: this._scope.playerNumber, type: "Castle"});
    }

    return this._castles;
  };

  // Gets a list of the mines on the map.
  private _mines: ZChipAPI.Mine[];
  get mines(): ZChipAPI.Mine[]{
    if(this._mines == null){
      this._mines = this._scope.getBuildings({type: "Goldmine"}).map(
        (building: ZChipAPI.Building) =>{
          return <ZChipAPI.Mine>building;
        }
      );
    }

    return this._mines;
  };

  // Gets a list of the player's barracks.
  private _barracks: ZChipAPI.Building[];
  get barracks(): ZChipAPI.Building[]{
    if(this._barracks == null){
      this._barracks = this._scope.getBuildings({player: this._scope.playerNumber, type: "Barracks"});
    }

    return this._barracks;
  };

  // Gets a list of the player's forges.
  private _forges: ZChipAPI.Building[];
  get forges(): ZChipAPI.Building[]{
    if(this._forges == null){
      this._forges = this._scope.getBuildings({player: this._scope.playerNumber, type: "Forge"});
    }

    return this._forges;
  };

  // Gets a list of the player's watchtowers.
  private _watchtowers: ZChipAPI.Building[];
  get watchtowers(): ZChipAPI.Building[]{
    if(this._watchtowers == null){
      this._watchtowers = this._scope.getBuildings({player: this._scope.playerNumber, type: "Watchtower"});
    }

    return this._watchtowers;
  };

  // Gets a list of the player's houses.
  private _houses: ZChipAPI.Building[];
  get houses(): ZChipAPI.Building[]{
    if(this._houses == null){
      this._houses = this._scope.getBuildings({player: this._scope.playerNumber, type: "House"});
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

class ConstructionCommander{
  // The minimum spacing around non castle buildings.
  baseSpacing: number;

  // The number of watchtowers to build for each castle the player owns.
  watchtowersPerCastle: number;

  // The maximum number of workers that should work each goldmine.
  maxWorkersPerGoldmine: number;

  // The maximum diameter around the AIs base that it will try to build in.
  private _maxBaseSize: number;

  // A cache of data from the scope object.
  private _cache: Cache;

  // The scope object.
  private _scope: ZChipAPI.Scope

  constructor(scope: ZChipAPI.Scope, cache: Cache, baseSpacing: number, watchtowersPerCastle: number, maxWorkersPerGoldmine: number){
    this.baseSpacing = baseSpacing;
    this.watchtowersPerCastle = watchtowersPerCastle;
    this.maxWorkersPerGoldmine = maxWorkersPerGoldmine;
    this._cache = cache;
    this._scope = scope;

    this._maxBaseSize = 30;
  }
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
