///<reference path="LWG-API.ts" />
module ZChipAPI{

  class MagicNumbers{
    // The minimum radius around a mine that castles cannot build.
    static minimumMineRadius = 7;

    // The maximum supply that can be built.
    static maximumSupply = 100;
  }

  // A wrapper for the little war game scope object.
  export class Scope{
    // The wrapped little war game object.
    private _innerScope: LWG.IScope;

  	// The AI's player number.
    get playerNumber(): number {
      return this._innerScope.getMyPlayerNumber();
    };

    // The AI's team number.
    get teamNumber(): number{
      return this._innerScope.getMyTeamNumber();
    };

    // The AI's starting position.
    get startPosition(): LWG.IPoint{
      return this._innerScope.getStartLocationForPlayerNumber(this.playerNumber);
    };

    // The height of the map being played on.
    get mapHeight(): number{
      return this._innerScope.getMapHeight();
    }

    // The width of the map being played on.
    get mapWidth(): number{
      return this._innerScope.getMapWidth();
    }

    // The team number of the neutral units.
    get neutralTeamNumber(): number{
      return 0;
    }

    // A list of the AI's allies.
    private _allies: number[];
    get allies(): number[]{
      return this._allies;
    }

    // A list of the AI's Opponents.
    private _enemies: number[];
    get enemies(): number[]{
      return this._enemies;
    }

    // A list of player numbers participating in the game.
    get players(): number[]{
      return this._innerScope.getArrayOfPlayerNumbers();
    }

    // Determine which players are allied with the AI and who are opposed to the AI.
    private determineAlliances(): void{
      this._allies = [];
      this._enemies = [];
      for(let i: number = 0; i < this.players.length; i++){
        var playerNumber = this.players[i];
        var playerTeam = this._innerScope.getTeamNumber(playerNumber);
        if(playerTeam == this.teamNumber){
          this._allies.push();
        }
        else if(playerTeam != this.neutralTeamNumber){
          this._enemies.push();
        }
      }
    }

    // Gets a collection of units based on a filter.
    getUnits(filter: any): Unit[]{
      var units: Unit[] = this._innerScope.getUnits(filter).map(
        (unit: LWG.IUnit) => {
          return new Unit(unit);
        }
      );

      return units;
    }

    // Gets a collection of buildings based on a filter.
    getBuildings(filter: any): Building[]{
      var buildings: Building[] = this._innerScope.getUnits(filter).map(
        (unit: LWG.IUnit) => {
          return new Building(unit);
        }
      );

      return buildings;
    }

    // Gets the distance between two points.
    getDistance(x1:number, y1:number, x2:number, y2:number):number{
      return Math.sqrt(Math.pow(x2 - x1,2)+ Math.pow(y2 - y1, 2));
    }

    // Determines if a position is too close to a gold mine to build a castle.
  	nearMine(x, y): boolean{
      var mines = this.getUnits({type: "Goldmine"});
  		for(var i = 0; i < mines.length; i++){
  			var mine = mines[i];
  			var distance = this.getDistance(x, y, mine.x, mine.y);
  			if(distance < MagicNumbers.minimumMineRadius){
  				return true;
  			}
  		}

  		return false;
  	};

    // Gets the closest unit out of a list of units.
  	getClosest(referenceUnit: Unit, targetUnits: Unit[]): Unit{
  		var closest: Unit = null;
  		var closestDistance: number = Number.MAX_VALUE;
  		for(let i: number = 0; i < targetUnits.length; i++){
  			var targetUnit: Unit = targetUnits[i];
  			var distanceToTarget: number = this.getDistance(referenceUnit.x, referenceUnit.y, targetUnit.x, targetUnit.y);
  			if(distanceToTarget < closestDistance){
  				closest = targetUnit;
  				closestDistance = distanceToTarget;
  			}
  		}

  		return closest;
  	};

    // Say something in the chat window.
  	chatMessage(message){
  		this._innerScope.chatMsg(message);
  	};

    constructor(sourceScope: LWG.IScope){
      this.reset(sourceScope);

      this.determineAlliances();
    }

    reset(sourceScope: LWG.IScope): void{
      this._innerScope = sourceScope;
    }
  }

  // A class that represents a game Unit.
  export class Unit{
    // The wrapped little war game class.
    protected _innerUnit: LWG.IUnit;

    // The unit's identifier.
    get id():number{
      return this._innerUnit.getValue("id");
    }

    // The unit's current hitpoints.
    get hitpoints(): number{
      return this._innerUnit.getCurrentHP();
    }

    // Returns true if the unit is neutral.
    get isNeutral(): boolean{
      return this._innerUnit.isNeutral();
    }

    // Gets the x coordinate of the unit.
    get x():number{
      return this._innerUnit.getX();
    }

    // Gets the y coordinate of the unit.
    get y():number{
      return this._innerUnit.getY();
    }

    constructor(innerUnit: LWG.IUnit){
      this._innerUnit = innerUnit;
    }
  }

  export class Building extends Unit{
    constructor(innerUnit: LWG.IUnit){
      super(innerUnit);
    }
  }

  export class Mine extends Building{
    get gold(){
      return this._innerUnit.getValue("gold");
    }

    constructor(innerUnit: LWG.IUnit){
      super(innerUnit);
    }
  }
}
