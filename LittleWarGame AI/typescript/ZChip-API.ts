///<reference path="LWG-API.ts" />
module ZChipAPI{

  // Represents a point.
  export class Point{
    x: number;
    y:number;

    constructor(x:number, y: number){
      if(x == null || x == undefined){
        this.x = 0;
      }
      else{
        this.x = x;
      }

      if(y == null || y == undefined){
        this.y = 0;
      }
      else{
        this.y=y;
      }
    }
  }

  class HiddenMagicNumbers{
    // The minimum radius around a mine that castles cannot build.
    static minimumMineRadius:number = 7;

    // The maximum supply that can be built.
    static maximumSupply:number = 100;

    // The team number of the neutral team.
    static neutralTeamNumber: number = 0;
  }

  class HiddenMagicStrings{
    // The key used to get a unit's id property.
    static unitIdKey: string = "id";

    // The key used to get a unit's gold property.
    static goldPropertyKey: string = "gold";

    static cretionCyclePropertyKey: string = "tickOfCreation";

    // The name of the type property on a filter object.
    static filterTypePropertyName: string = "type";

    // The name of the type property on a filter object.
    static filterNotOfTypePropertyName: string = "notOfType";

    // The name of the type property on a filter object.
    static filterPlayerPropertyName: string = "player";

    // The name of the type property on a filter object.
    static filterTeamPropertyName: string = "team";

    // The name of the type property on a filter object.
    static filterOrderPropertyName: string = "order";

    // The name of the type property on a filter object.
    static filterEnemyOfPropertyName: string = "enemyOf";

    // The name of the type property on a filter object.
    static filterOnlyFinishedPropertyName: string = "onlyFinshed";
  }

  // Maps type enums to and from string values.
  class TypeMapper{
    // Gets the type identifier from the type name.
    static getTypeId(typeName):string{
      switch(typeName){
        default:
          return typeName.toLowerCase();
      }
    }

    // Gets the unit type enum from the type name.
    static getBuildingType(typeName: string): BuildingType{
      switch(typeName){
        case "Castle":
          return BuildingType.Castle;
        case "Watchtower":
          return BuildingType.Watchtower;
        case "Forge":
          return BuildingType.Forge;
        case "House":
          return BuildingType.House;
        case "Barracks":
          return BuildingType.Barracks;
      }
    }

    // Gets the building type the current order will generate, or null if it is not a build order.
    static getBuildingTypeFromOrderType(type: OrderType):BuildingType{
      switch(type){
        case OrderType.BuildCastle:
          return BuildingType.Castle;
        case OrderType.BuildWatchtower:
          return BuildingType.Watchtower;
        case OrderType.BuildForge:
          return BuildingType.Forge;
        case OrderType.BuildHouse:
          return BuildingType.House;
        case OrderType.BuildBarracks:
          return BuildingType.Barracks;
        default:
          return null;
      }
    }

    // Gets the unit type enum from the type name.
    static getUnitType(typeName: string): UnitType{
      switch(typeName){
        case "Worker":
          return UnitType.Worker;
        case "Soldier":
          return UnitType.Soldier;
        case "Archer":
          return UnitType.Archer;
        default:
          return null;
      }
    }

    getTrainOrderFromUnitType(type:UnitType):OrderType{
      switch(type){
        case UnitType.Worker:
          return OrderType.
      }
    }

    // Gets the name of the building type.
    static getBuildingName(type: BuildingType): string{
      switch(type){
        case BuildingType.Mine:
          return "Goldmine";
        case BuildingType.Castle:
          return "Castle";
        case BuildingType.Watchtower:
          return "Watchtower";
        case BuildingType.Forge:
          return "Forge";
        case BuildingType.House:
          return "Hosue";
        case BuildingType.Barracks:
          return "Barracks";
        default:
          throw "No mapping for building: " + type.toString();
      }
    }

    // Gets the order string to construct the building type.
    static getBuildOrderTypeFromBuildingType(type: BuildingType): OrderType{
      switch(type){
        case BuildingType.Castle:
          return OrderType.BuildCastle;
        case BuildingType.Watchtower:
          return OrderType.BuildWatchtower;
        case BuildingType.Forge:
          return OrderType.BuildForge;
        case BuildingType.House:
          return OrderType.BuildHouse;
        case BuildingType.Barracks:
          return OrderType.BuildBarracks;
        default:
          throw "No mapping for build order: " + type.toString();
      }
    }

    // Gets the name of the unit type.
    static getUnitName(type: UnitType): string{
      switch (type){
        case UnitType.Worker:
          return "Worker";
        case UnitType.Soldier:
          return "Soldier";
        case UnitType.Archer:
          return "Archer";
        default:
          throw "No mapping for unit: " + type.toString();
      }
    }

    static getOrderType(orderName: string):OrderType{
      switch(orderName){
        case "Stop":
          return OrderType.Stop;
        case "Mine":
          return OrderType.Mine;
        case "Repair":
          return OrderType.Repair;
        case "Build Castle":
          return OrderType.BuildCastle;
        case "Build Watchtower":
          return OrderType.BuildWatchtower;
        case "Build Forge":
          return OrderType.BuildForge;
        case "Build Hosue":
          return OrderType.BuildHouse;
        case "Build Barracks":
          return OrderType.BuildBarracks;
        case "Attack Upgrade":
          return OrderType.UpgradeAttack;
        case "Moveto":
          return OrderType.MoveTo;
        case "Train Worker":
          return OrderType.TrainWorker;
        case "Train Archer":
          return OrderType.TrainArcher;
        case "Train Soldier":
          return OrderType.TrainSoldier;
        default:
          throw "No mapping for order named:" + orderName;
      }
    }

    static getUpgradeTypeFromOrderType(type: OrderType): UpgradeType{
      switch(type){
        case OrderType.UpgradeAttack:
          return UpgradeType.AttackUpgrades;
        default:
          return null;
      }
    }

    static getOrderName(type: OrderType): string{
      switch(type){
        case OrderType.Stop:
          return "Stop";
        case OrderType.Mine:
          return "Mine";
        case OrderType.Repair:
          return "Repair";
        case OrderType.BuildCastle:
          return "Build Castle";
        case OrderType.BuildWatchtower:
          return "Build Watchtower";
        case OrderType.BuildForge:
          return "Build Forge";
        case OrderType.BuildHouse:
          return "Build House";
        case OrderType.BuildBarracks:
          return "Build Barracks";
        case OrderType.UpgradeAttack:
          return "Attack Upgrade";
        case OrderType.MoveTo:
          return "Moveto";
        case OrderType.TrainWorker:
          return "Train Worker";
        case OrderType.TrainArcher:
          return "Train Worker";
        case OrderType.TrainSoldier:
          return "Train Soldier";
        default:
          throw "No mapping for order: " + type.toString();
      }
    }

    static getTypeFieldName(type: TypeField): string{
      switch(type){
        case TypeField.Size:
          return "size";
        case TypeField.Cost:
          return "cost";
        case TypeField.MaxHitpoints:
          return "hp";
      }
    }
  }

  export enum UpgradeType{
    AttackUpgrades
  }

  export enum TypeField{
    Size,
    Cost,
    MaxHitpoints
  }

  // Represents all orders.
  export enum OrderType{
    Stop,
    MoveTo,
    Mine,
    Repair,
    BuildCastle,
    BuildWatchtower,
    BuildForge,
    BuildHouse,
    BuildBarracks,
    TrainWorker,
    TrainArcher,
    TrainSoldier,
    UpgradeAttack
  }

  // Represents building types.
  export enum BuildingType{
    Mine,
    Castle,
    Watchtower,
    Forge,
    House,
    Barracks
  }

  // Represents unit types.
  export enum UnitType{
    Worker,
    Soldier,
    Archer
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

    // Gets the team number of neutral players.
    get neutralTeamNumber():number{
      return HiddenMagicNumbers.neutralTeamNumber;
    }

    // Gets the maximum buildable supply.
    get supplyCap():number{
      return HiddenMagicNumbers.maximumSupply;
    }

    // Gets the current amount of supply generated by the player.
    get maxAvailableSupply():number{
      return this._innerScope.getMaxSupply();
    }

    // Gets the player's current gold.
    get currentGold():number{
      return this._innerScope.getGold();
    }

    // Gets the player's current supply usage.
    get currentSupply(): number{
      return this._innerScope.getCurrentSupply();
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
        else if(playerTeam != HiddenMagicNumbers.neutralTeamNumber){
          this._enemies.push();
        }
      }
    }

    // Gets a collection of units based on a filter.
    getUnits(filter: any): Unit[]{
      var mappedFilter = {};

      var type: UnitType = filter.type;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterTypePropertyName] = TypeMapper.getUnitName(type);
      }

      var notOfType: UnitType = filter.notOfType;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterNotOfTypePropertyName] = TypeMapper.getUnitName(notOfType);
      }

      var player: number = filter.player;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterPlayerPropertyName] = player;
      }

      var team: number = filter.team;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterTeamPropertyName] = team;
      }

      var enemyOf: number = filter.enemyOf;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterEnemyOfPropertyName] = enemyOf;
      }

      var order: OrderType = filter.order;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterOrderPropertyName] = TypeMapper.getOrderName(order);
      }

      var units: Unit[] = this._innerScope.getUnits(mappedFilter).map(
        (unit: LWG.IUnit) => {
          return new Unit(unit, this);
        }
      );

      return units;
    }

    // Issues an order to a set of units. When available, the convenience orders on unit clases should be used instead.
    order(order: OrderType, units: GameEntity[], o: any, chainCommands: boolean):void{
      var innerUnits: LWG.IUnit[] = units.map(
        (unit) => {
          return unit.innerUnit;
        }
      );

      var orderString = TypeMapper.getOrderName(order);
      this._innerScope.order(orderString, innerUnits, o, chainCommands);
    }

    // Gets a collection of buildings based on a filter.
    getBuildings(filter: any): Building[]{
      var mappedFilter = {};

      var type: BuildingType = filter.type;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterTypePropertyName] = TypeMapper.getBuildingName(type);
      }

      var notOfType: BuildingType = filter.notOfType;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterNotOfTypePropertyName] = TypeMapper.getBuildingName(notOfType);
      }

      var player: number = filter.player;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterPlayerPropertyName] = player;
      }

      var team: number = filter.team;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterTeamPropertyName] = team;
      }

      var enemyOf: number = filter.enemyOf;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterEnemyOfPropertyName] = enemyOf;
      }

      var order: OrderType = filter.order;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterOrderPropertyName] = TypeMapper.getOrderName(order);
      }

      var onlyFinished: boolean = filter.onlyFinished;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterOnlyFinishedPropertyName] = onlyFinished;
      }

      var buildings: Building[] = this._innerScope.getUnits(mappedFilter).map(
        (unit: LWG.IUnit) => {
          return new Building(unit, this);
        }
      );

      return buildings;
    }

    // Gets the distance between two points.
    getDistance(x1:number, y1:number, x2:number, y2:number):number{
      return Math.sqrt(Math.pow(x2 - x1,2)+ Math.pow(y2 - y1, 2));
    }

    // Determines if a position is in the immediate vicinity of a gold mine.
  	positionIsNearMine(x, y): boolean{
      var mines = this.getBuildings({type: TypeMapper.getBuildingName(BuildingType.Mine)});
  		for(var i = 0; i < mines.length; i++){
  			var mine = mines[i];
  			var distance = this.getDistance(x, y, mine.x, mine.y);
  			if(distance < HiddenMagicNumbers.minimumMineRadius){
  				return true;
  			}
  		}

  		return false;
  	};

    // Determines if a position is on a ramp.
    positionIsOnRamp(x:number, y:number): boolean{
      return this._innerScope.fieldIsRamp(x, y);
    }

    // Determines if a position is pathable.
    positionIsPathable(x:number, y:number):boolean{
      return this._innerScope.positionIsPathable(x, y);
    }

    // Gets the closest unit out of a list of units.
  	getClosest(referenceUnit: GameEntity, targetUnits: GameEntity[]): GameEntity{
  		var closest: GameEntity = null;
  		var closestDistance: number = Number.MAX_VALUE;
  		for(let i: number = 0; i < targetUnits.length; i++){
  			var targetUnit: GameEntity = targetUnits[i];
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

    getBuildingTypeFieldValue(type: BuildingType, field: TypeField): any{
      var typeName: string = TypeMapper.getBuildingName(type);
      var typeId: string = TypeMapper.getTypeId(typeName);
      var fieldName: string = TypeMapper.getTypeFieldName(field);

      return this._innerScope.getTypeFieldValue(typeId, fieldName);
    }

    getUnitTypeFieldValue(type: UnitType, field: TypeField): any{
      var typeName: string = TypeMapper.getUnitName(type);
      var typeId: string = TypeMapper.getTypeId(typeName);
      var fieldName: string = TypeMapper.getTypeFieldName(field);

      return this._innerScope.getTypeFieldValue(typeId, fieldName);
    }

    constructor(sourceScope: LWG.IScope){
      this.reset(sourceScope);

      this.determineAlliances();
    }

    reset(sourceScope: LWG.IScope): void{
      this._innerScope = sourceScope;
    }
  }

  // A class that represents a game Unit or Building.
  export class GameEntity{
    // The wrapped little war game class.
    protected _innerUnit: LWG.IUnit;
    get innerUnit(): LWG.IUnit{
      return this._innerUnit;
    }

    // Returns the game cycle when the game entity was created.
    get creationCycle():number{
      return this._innerUnit.getValue(HiddenMagicStrings.cretionCyclePropertyKey);
    }

    // Returns true if the two game entities are the same, otherwise returns false.
    equals(other: GameEntity){
      return this._innerUnit.equals(other._innerUnit);
    }

    // The unit's identifier.
    get id():number{
      return this._innerUnit.getValue(HiddenMagicStrings.unitIdKey);
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

    // Gets the size of the unit.
    get size():number{
      return this._scope.getUnitTypeFieldValue(TypeMapper.getUnitType(this._innerUnit.getTypeName()), TypeField.Size);
    }

    // Gets the unit's current order.
    get currentOrder(): OrderType{
      return TypeMapper.getOrderType(this._innerUnit.getCurrentOrderName());
    }

    // A value indicating whether commands should be chained.
    chainCommandMode: boolean;

    // The scope object.
    protected _scope: Scope;

    constructor(innerUnit: LWG.IUnit, scope:Scope){
      this._innerUnit = innerUnit;
      this._scope = scope;
    }
  }

  // A unit or building.
  export class Unit extends GameEntity{
    get type():UnitType{
      return TypeMapper.getUnitType(this._innerUnit.getTypeName());
    }

    // Orders the unit to move to the specified building.
    moveTo(building: Building):void{
      this._scope.order(OrderType.MoveTo, [this], {unit: building}, this.chainCommandMode)
    }

    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }
  }

  export class Worker extends Unit{
    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }

    // Gets the building that the worker is currently building, or null if the worker is not building.
    get currentlyBuilding(): BuildingType{;
      var building: ZChipAPI.BuildingType = TypeMapper.getBuildingTypeFromOrderType(this.currentOrder);
      if(building != null){
        return building;
      }
      else{
        // TODO: check if they are "repairing" an incomplete building.
        return null;
      }
    }

    // Tell the worker to repair a building or unit.
    repair(target: GameEntity): void{
      this._scope.order(OrderType.Repair, [this], {unit: target}, this.chainCommandMode);
    }

    // Tell the worker to build the specified building.
    build(building: BuildingType, x: number, y:number):void{
      var buildCommand:OrderType = TypeMapper.getBuildOrderTypeFromBuildingType(building);
      this._scope.order(buildCommand, [this], {x: x, y: y}, this.chainCommandMode);
    }

    // Command the worker to mine the mine.
    mine(mine: Mine){
      this._scope.order(ZChipAPI.OrderType.Mine, [this], mine, this.chainCommandMode);
    }
  }

  export class ProductionBuilding extends Building{
    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }

    // TODO: get upgrade production at queue.

    trainUnit(type: ZChipAPI.UnitType): void{
      var trainCommand: OrderType = TypeMapper.getTrainOrderFromUnitType(type);

      this._scope.order(trainCommand, [this], null, this.chainCommandMode);
    }

    // Gets the unit currently in production at the queue index, or null if no unit is in production at that index.
    getUnitProductionAtQueue(index: number):UnitType{
      return TypeMapper.getUnitType(this._innerUnit.getUnitTypeNameInProductionQueAt(index + 1));
    }
  }

  export class Building extends GameEntity{
    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }

    get type():BuildingType{
      return TypeMapper.getBuildingType(this._innerUnit.getTypeName());
    }

    // Returns true if the building is finished, otherwise returns false.
    get isFinished(): boolean{
      var timeRemaining = this._innerUnit.getRemainingBuildTime();
      if(timeRemaining != undefined && timeRemaining != null && timeRemaining > 0){
        return false;
      }

      return true;
    }

    // Gets the size of the building.
    get size():number{
      return this._scope.getBuildingTypeFieldValue(TypeMapper.getBuildingType(this._innerUnit.getTypeName()), TypeField.Size);
    }
  }

  export class Mine extends Building{
    // Gets the remaining gold in the mine.
    get gold(){
      return this._innerUnit.getValue(HiddenMagicStrings.goldPropertyKey);
    }

    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }
  }
}
