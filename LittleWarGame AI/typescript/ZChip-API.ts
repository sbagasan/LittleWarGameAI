///<reference path="LWG-API.ts" />
module ZChipAPI{

  // A wrapper for the little war game scope object.
  export class Scope{
    // The wrapped little war game object.
    private innerScope: LWG.IScope;

  	// The AI's player number.
    get playerNumber(): number {
      return this.innerScope.getMyPlayerNumber();
    };

    // The AI's team number.
    get teamNumber(): number{
      return this.innerScope.getMyTeamNumber();
    };

    // The AI's starting position.
    get startPosition(): LWG.IPoint{
      return this.innerScope.getStartLocationForPlayerNumber(this.playerNumber);
    };

    // The height of the map being played on.
    get mapHeight(): number{
      return this.innerScope.getMapHeight();
    }

    // The width of the map being played on.
    get mapWidth(): number{
      return this.innerScope.getMapWidth();
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
    private _opponents: number[];
    get opponents(): number[]{
      return this._opponents;
    }

    // A list of player numbers participating in the game.
    get players(): number[]{
      return this.innerScope.getArrayOfPlayerNumbers();
    }

    // Determine which players are allied with the AI and who are opposed to the AI.
    private determineAlliances(): void{
      this._allies = [];
      this._opponents = [];
      for(let i = 0; i < this.players.length; i++){
        var playerNumber = this.players[i];
        var playerTeam = this.innerScope.getTeamNumber(playerNumber);
        if(playerTeam == this.teamNumber){
          this._allies.push();
        }
        else if(playerTeam != this.neutralTeamNumber){
          this._opponents.push();
        }
      }
    }

    constructor(sourceScope: LWG.IScope){
      this.reset(sourceScope);

      this.determineAlliances();
    }

    reset(sourceScope: LWG.IScope): void{
      this.innerScope = sourceScope;
    }
  }

  // A class that represents a game Unit.
  export class Unit{
    // The wrapped little war game class.
    private innerUnit: LWG.IUnit;

    // The unit's identifier.
    get id():number{
      return this.innerUnit.getValue("id");
    }

    // The unit's current hitpoints.
    get hitpoints(): number{
      return this.innerUnit.getCurrentHP();
    }

    constructor(innerUnit: LWG.IUnit){
      this.innerUnit = innerUnit;
    }
  }
}
