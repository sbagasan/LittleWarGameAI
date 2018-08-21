///<reference path="./LWG-API.ts" />
///<reference path="./Common.ts" />
module ZChipAPI{
  class BuildingFactory{
    static createBuilding(unit: LWG.IUnit, scope: Scope):Building{
      var type: BuildingType = TypeMapper.getBuildingType(unit.getTypeName());
      switch(type){
        case BuildingType.Mine:
          return new Mine(unit, scope);
        case BuildingType.AdvancedWorkshop:
        case BuildingType.AnimalTestingLab:
        case BuildingType.Barracks:
        case BuildingType.Castle:
        case BuildingType.Church:
        case BuildingType.DragonsLair:
        case BuildingType.Forge:
        case BuildingType.Fortress:
        case BuildingType.MagesGuild:
        case BuildingType.WerewolvesDen:
        case BuildingType.WolvesDen:
        case BuildingType.Workshop:
          return new ProductionBuilding(unit, scope);
        default:
          return new Building(unit, scope);
      }
    }
  }

  class UnitFactory{
    static createUnit(unit: LWG.IUnit, scope: Scope): Unit{
      var type: UnitType = TypeMapper.getUnitType(unit.getTypeName());
      switch(type){
        case UnitType.Worker:
          return new Worker(unit, scope);
        default:
          return new Unit(unit, scope);
      }
    }
  }

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

    // The diameter around a starting position th get the ground distance from if the start position is not pathable.
    static pathStartDistance: number = 20;
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
        case "Armor":
          return "upgarmor";
        case "Damage":
          return "upgattack";
        case "Research Fireball":
          return "upgfireball";
        default:
          return typeName.toLowerCase().split(" ").join("");
      }
    }

    // Gets the unit type enum from the type name.
    static getBuildingType(typeName: string): BuildingType{
      switch(typeName){
        case "Advanced Workshop":
          return BuildingType.AdvancedWorkshop;
        case "Animal Testing Lab":
          return BuildingType.AnimalTestingLab;
        case "Barracks":
          return BuildingType.Barracks;
        case "Castle":
          return BuildingType.Castle;
        case "Church":
          return BuildingType.Church;
        case "Dragons Lair":
          return BuildingType.DragonsLair;
        case "Forge":
          return BuildingType.Forge;
        case "Fortress":
          return BuildingType.Fortress;
        case "House":
          return BuildingType.House;
        case "Mages Guild":
          return BuildingType.MagesGuild;
        case "Goldmine":
          return BuildingType.Mine;
        case "Watchtower":
          return BuildingType.Watchtower;
        case "Watchtower (detection)":
          return BuildingType.WatchtowerDetection;
        case "Werewolves Den":
          return BuildingType.WerewolvesDen;
        case "Wolves Den":
          return BuildingType.WolvesDen;
        case "Workshop":
          return BuildingType.Workshop;
        default:
          throw "Cannot find building type " + typeName;
      }
    }

    // Gets the building type the current order will generate, or null if it is not a build order.
    static getBuildingTypeFromOrderType(type: OrderType):BuildingType{
      switch(type){
        case OrderType.BuildAdvancedWorkshop:
          return BuildingType.AdvancedWorkshop;
        case OrderType.BuildAnimalTestingLab:
          return BuildingType.AnimalTestingLab;
        case OrderType.BuildBarracks:
          return BuildingType.Barracks;
        case OrderType.BuildCastle:
          return BuildingType.Castle;
        case OrderType.BuildChurch:
          return BuildingType.Church;
        case OrderType.BuildDragonsLair:
          return BuildingType.DragonsLair;
        case OrderType.BuildForge:
          return BuildingType.Forge;
        case OrderType.BuildHouse:
          return BuildingType.House;
        case OrderType.BuildMagesGuild:
          return BuildingType.MagesGuild;
        case OrderType.BuildWatchtower:
          return BuildingType.Watchtower;
        case OrderType.BuildWolvesDen:
          return BuildingType.WolvesDen;
        case OrderType.BuildWorkshop:
          return BuildingType.Workshop;
        default:
          return null;
      }
    }

    // Gets the unit type enum from the type name.
    static getUnitType(typeName: string): UnitType{
      switch(typeName){
        case "Airship":
          return UnitType.Airship;
        case "Archer":
          return UnitType.Archer;
        case "Ballista":
          return UnitType.Ballista;
        case "Bird":
          return UnitType.Bird;
        case "Caltrop":
          return UnitType.Caltrop;
        case "Catapult":
          return UnitType.Catapult;
        case "Dragon":
          return UnitType.Dragon;
        case "Gatling Gun":
          return UnitType.GatlingGun;
        case "Healing Ward":
          return UnitType.HealingWard;
        case "Knight":
          return UnitType.Knight;
        case "Mage":
          return UnitType.Mage;
        case "Priest":
          return UnitType.Priest;
        case "Raider":
          return UnitType.Raider;
        case "Shadow Wolf":
          return UnitType.ShadowWolf;
        case "Shroud Field":
          return UnitType.ShroudField;
        case "Skeleton":
          return UnitType.Skeleton;
        case "Slowing Field":
          return UnitType.SlowField;
        case "Snake":
          return UnitType.Snake;
        case "Soldier":
          return UnitType.Soldier;
        case "Werewolf":
          return UnitType.Werewolf;
        case "Wolf":
          return UnitType.Wolf;
        case "Worker":
          return UnitType.Worker;
        default:
          return null;
      }
    }

    static getTrainOrderFromUnitType(type:UnitType):OrderType{
      switch(type){
        case UnitType.Airship:
          return OrderType.TrainAirship;
        case UnitType.Archer:
          return OrderType.TrainArcher;
        case UnitType.Ballista:
          return OrderType.TrainBallista;
        case UnitType.Bird:
          return OrderType.TrainBird;
        case UnitType.Catapult:
          return OrderType.TrainCatapult;
        case UnitType.Dragon:
          return OrderType.TrainDragon;
        case UnitType.GatlingGun:
          return OrderType.TrainGatlingGun;
        case UnitType.Knight:
          return OrderType.TrainKnight;
        case UnitType.Mage:
          return OrderType.TrainMage;
        case UnitType.Priest:
          return OrderType.TrainPriest;
        case UnitType.Raider:
          return OrderType.TrainRaider;
        case UnitType.Snake:
          return OrderType.TrainSnake;
        case UnitType.Soldier:
          return OrderType.TrainSoldier;
        case UnitType.Werewolf:
          return OrderType.TrainWerewolf;
        case UnitType.Wolf:
          return OrderType.TrainWolf;
        case UnitType.Worker:
          return OrderType.TrainWorker;
        default:
          throw "No mapping for building: " + type.toString();
      }
    }

    // Gets the name of the building type.
    static getBuildingName(type: BuildingType): string{
      switch(type){
        case BuildingType.AdvancedWorkshop:
          return "Advanced Workshop";
        case BuildingType.AnimalTestingLab:
          return "Animal Testing Lab";
        case BuildingType.Barracks:
          return "Barracks";
        case BuildingType.Castle:
          return "Castle";
        case BuildingType.Church:
          return "Church";
        case BuildingType.DragonsLair:
          return "Dragons Lair";
        case BuildingType.Forge:
          return "Forge";
        case BuildingType.Fortress:
          return "Fortress";
        case BuildingType.House:
          return "House";
        case BuildingType.MagesGuild:
          return "Mages Guild";
        case BuildingType.Mine:
          return "Goldmine";
        case BuildingType.Watchtower:
          return "Watchtower";
        case BuildingType.WatchtowerDetection:
          return "Watchtower (detection)";
        case BuildingType.WerewolvesDen:
          return "Werewolves Den";
        case BuildingType.WolvesDen:
          return "Wolves Den";
        case BuildingType.Workshop:
          return "Workshop";
      }
    }

    // Gets the order string to construct the building type.
    static getBuildOrderTypeFromBuildingType(type: BuildingType): OrderType{
      switch(type){
        case BuildingType.AdvancedWorkshop:
          return OrderType.BuildAdvancedWorkshop;
        case BuildingType.AnimalTestingLab:
          return OrderType.BuildAnimalTestingLab;
        case BuildingType.Barracks:
          return OrderType.BuildBarracks;
        case BuildingType.Castle:
          return OrderType.BuildCastle;
        case BuildingType.Church:
          return OrderType.BuildChurch;
        case BuildingType.DragonsLair:
          return OrderType.BuildDragonsLair;
        case BuildingType.Forge:
          return OrderType.BuildForge;
        case BuildingType.House:
          return OrderType.BuildHouse;
        case BuildingType.MagesGuild:
          return OrderType.BuildMagesGuild;
        case BuildingType.Watchtower:
          return OrderType.BuildWatchtower;
        case BuildingType.WolvesDen:
          return OrderType.BuildWolvesDen;
        case BuildingType.Workshop:
          return OrderType.BuildWorkshop;
        default:
          throw "No mapping for build order: " + type.toString();
      }
    }

    // Gets the name of the unit type.
    static getUnitName(type: UnitType): string{
      switch (type){
        case UnitType.Airship:
          return "Airship";
        case UnitType.Archer:
          return "Archer";
        case UnitType.Ballista:
          return "Ballista";
        case UnitType.Bird:
          return "Bird";
        case UnitType.Caltrop:
          return "Caltrop";
        case UnitType.Catapult:
          return "Catapult";
        case UnitType.Dragon:
          return "Dragon";
        case UnitType.GatlingGun:
          return "Gatling Gun";
        case UnitType.HealingWard:
          return "Healing Ward";
        case UnitType.Knight:
          return "Knight";
        case UnitType.Mage:
          return "Mage";
        case UnitType.Priest:
          return "Priest";
        case UnitType.Raider:
          return "Raider";
        case UnitType.ShadowWolf:
          return "Shadow Wolf";
        case UnitType.ShroudField:
          return "Shroud Field";
        case UnitType.Skeleton:
          return "Skeleton";
        case UnitType.SlowField:
          return "Slowing Field";
        case UnitType.Snake:
          return "Snake";
        case UnitType.Soldier:
          return "Soldier";
        case UnitType.Werewolf:
          return "Werewolf";
        case UnitType.Wolf:
          return "Wolf";
        case UnitType.Worker:
          return "Worker";
      }
    }

    static getOrderType(orderName: string):OrderType{
      switch(orderName){
        case "Attack":
          return OrderType.Attack;
        case "AMove":
          return OrderType.AttackMove;
        case "Build Advanced Workshop":
          return OrderType.BuildAdvancedWorkshop;
        case "Build Animal Testing Lab":
          return OrderType.BuildAnimalTestingLab;
        case "Build Barracks":
          return OrderType.BuildBarracks;
        case "Build Castle":
          return OrderType.BuildCastle;
        case "Build Church":
          return OrderType.BuildChurch;
        case "Build Dragons Lair":
          return OrderType.BuildDragonsLair;
        case "Build Forge":
          return OrderType.BuildForge;
        case "Build House":
          return OrderType.BuildHouse;
        case "Build Mages Guild":
          return OrderType.BuildMagesGuild;
        case "Build Watchtower":
          return OrderType.BuildWatchtower;
        case "Build Wolves Den":
          return OrderType.BuildWolvesDen;
        case "Build Workshop":
          return OrderType.BuildWorkshop;
        case "Mine":
          return OrderType.Mine;
        case "Move":
          return OrderType.Move;
        case "Moveto":
          return OrderType.MoveTo;
        case "Repair":
          return OrderType.Repair;
        case "Research Fireball":
          return OrderType.ResearchFireball;
        case "Upgrade To Werewolves Den":
          return OrderType.UpgradeToWerewolvesDen;
        case "Stop":
          return OrderType.Stop;
        case "Smash":
          return OrderType.Smash;
        case "Construct Airship":
          return OrderType.TrainAirship;
        case "Train Archer":
          return OrderType.TrainArcher;
        case "Construct Ballista":
          return OrderType.TrainBallista;
        case "Train Bird":
          return OrderType.TrainBird;
        case "Construct Catapult":
          return OrderType.TrainCatapult;
        case "Train Dragon":
          return OrderType.TrainDragon;
        case "Construct Gatling Gun":
          return OrderType.TrainGatlingGun;
        case "Train Knight":
          return OrderType.TrainKnight;
        case "Train Mage":
          return OrderType.TrainMage;
        case "Train Priest":
          return OrderType.TrainPriest;
        case "Train Raider":
          return OrderType.TrainRaider;
        case "Train Snake":
          return OrderType.TrainSnake;
        case "Train Soldier":
          return OrderType.TrainSoldier;
        case "Train Werewolf":
          return OrderType.TrainWerewolf;
        case "Train Wolf":
          return OrderType.TrainWolf;
        case "Train Worker":
          return OrderType.TrainWorker;
        case "Upgrade Armour":
          return OrderType.UpgradeArmour;
        case "Upgrade Attack":
          return OrderType.UpgradeAttack;
        default:
          throw "No mapping for order named:" + orderName;
      }
    }

    static getUpgradeTypeFromOrderType(type: OrderType): UpgradeType{
      switch(type){
        case OrderType.UpgradeAttack:
          return UpgradeType.AttackUpgrades;
        case OrderType.UpgradeArmour:
          return UpgradeType.ArmourUpgrades;
        case OrderType.ResearchFireball:
          return UpgradeType.FireballUpgrade;
        case OrderType.UpgradeToWerewolvesDen:
          return UpgradeType.WerewolvesDenUpgrade;
        default:
          return null;
      }
    }

    static getOrderTypeFromUpgradeType(type: UpgradeType): OrderType{
      switch(type){
        case UpgradeType.AttackUpgrades:
          return OrderType.UpgradeAttack;
        case UpgradeType.ArmourUpgrades:
          return OrderType.UpgradeArmour;
        case UpgradeType.FireballUpgrade:
          return OrderType.ResearchFireball;
        case UpgradeType.WerewolvesDenUpgrade:
          return OrderType.UpgradeToWerewolvesDen;
        default:
          throw "No order mapping for upgrade named: " + UpgradeType.toString();
      }
    }

    static getUpgradeName(type:UpgradeType): string{
      switch(type){
        case UpgradeType.AttackUpgrades:
          return "Damage";
        case UpgradeType.ArmourUpgrades:
          return "Armor";
        case UpgradeType.FireballUpgrade:
          return "Research Fireball";
        case UpgradeType.WerewolvesDenUpgrade:
          return "Werewolves Den"
        default:
          throw "No mapping for upgrade type:" + UpgradeType.toString();
      }
    }

    static getUpgradeType(upgradeName: string): UpgradeType{
      switch(upgradeName){
        case "Damage":
          return UpgradeType.AttackUpgrades;
        case "Armor":
          return UpgradeType.ArmourUpgrades;
        case "Research Fireball":
          return UpgradeType.FireballUpgrade;
        case "Werewolves Den":
          return UpgradeType.WerewolvesDenUpgrade;
        default:
          return null;
      }
    }

    static getOrderName(type: OrderType): string{
      switch(type){
        case OrderType.Attack:
          return "Attack";
        case OrderType.AttackMove:
          return "AMove";
        case OrderType.BuildAdvancedWorkshop:
          return "Build Advanced Workshop";
        case OrderType.BuildAnimalTestingLab:
          return "Build Animal Testing Lab";
        case OrderType.BuildBarracks:
          return "Build Barracks";
        case OrderType.BuildCastle:
          return "Build Castle";
        case OrderType.BuildChurch:
          return "Build Church";
        case OrderType.BuildDragonsLair:
          return "Build Dragons Lair";
        case OrderType.BuildForge:
          return "Build Forge";
        case OrderType.BuildHouse:
          return "Build House";
        case OrderType.BuildMagesGuild:
          return "Build Mages Guild";
        case OrderType.BuildWatchtower:
          return "Build Watchtower";
        case OrderType.BuildWolvesDen:
          return "Build Wolves Den";
        case OrderType.BuildWorkshop:
          return "Build Workshop";
        case OrderType.Mine:
          return "Mine";
        case OrderType.Move:
          return "Move";
        case OrderType.MoveTo:
          return "Moveto";
        case OrderType.Repair:
          return "Repair";
        case OrderType.ResearchFireball:
          return "Research Fireball";
        case OrderType.UpgradeToWerewolvesDen:
          return "Upgrade To Werewolves Den";
        case OrderType.Stop:
          return "Stop";
        case OrderType.Smash:
          return "Smash";
        case OrderType.TrainAirship:
          return "Construct Airship";
        case OrderType.TrainArcher:
          return "Train Archer";
        case OrderType.TrainBallista:
          return "Construct Ballista";
        case OrderType.TrainBird:
          return "Train Bird";
        case OrderType.TrainCatapult:
          return "Construct Catapult";
        case OrderType.TrainDragon:
          return "Train Dragon";
        case OrderType.TrainGatlingGun:
          return "Construct Gatling Gun";
        case OrderType.TrainKnight:
          return "Train Knight";
        case OrderType.TrainMage:
          return "Train Mage";
        case OrderType.TrainPriest:
          return "Train Priest";
        case OrderType.TrainRaider:
          return "Train Raider";
        case OrderType.TrainSnake:
          return "Train Snake";
        case OrderType.TrainSoldier:
          return "Train Soldier";
        case OrderType.TrainWerewolf:
          return "Train Werewolf";
        case OrderType.TrainWolf:
          return "Train Wolf";
        case OrderType.TrainWorker:
          return "Train Worker";
        case OrderType.UpgradeArmour:
          return "Armor Upgrade";
        case OrderType.UpgradeAttack:
          return "Attack Upgrade";
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
        case TypeField.Range:
          return "range";
        case TypeField.Supply:
          return "supply";
        case TypeField.SupplyProvided:
          return "supplyProvided";
      }
    }
  }

  export enum UpgradeType{
    AttackUpgrades,
    ArmourUpgrades,
    FireballUpgrade,
    WerewolvesDenUpgrade
  }

  export enum TypeField{
    Size,
    Cost,
    MaxHitpoints,
    Range,
    Supply,
    SupplyProvided
  }

  // Represents all orders.
  export enum OrderType{
    Attack,
    AttackMove,
    BuildAdvancedWorkshop,
    BuildAnimalTestingLab,
    BuildBarracks,
    BuildCastle,
    BuildChurch,
    BuildDragonsLair,
    BuildForge,
    BuildHouse,
    BuildMagesGuild,
    BuildWatchtower,
    BuildWolvesDen,
    BuildWorkshop,
    Mine,
    Move,
    MoveTo,
    Repair,
    ResearchFireball,
    UpgradeToWerewolvesDen,
    Smash,
    Stop,
    TrainAirship,
    TrainArcher,
    TrainBallista,
    TrainBird,
    TrainCatapult,
    TrainDragon,
    TrainGatlingGun,
    TrainKnight,
    TrainMage,
    TrainPriest,
    TrainRaider,
    TrainSnake,
    TrainSoldier,
    TrainWerewolf,
    TrainWolf,
    TrainWorker,
    UpgradeArmour,
    UpgradeAttack
  }

  // Represents building types.
  export enum BuildingType{
    AdvancedWorkshop,
    AnimalTestingLab,
    Barracks,
    Castle,
    Church,
    DragonsLair,
    Forge,
    Fortress,
    House,
    MagesGuild,
    Mine,
    Watchtower,
    WatchtowerDetection,
    WerewolvesDen,
    WolvesDen,
    Workshop
  }

  // Represents unit types.
  export enum UnitType{
    Airship,
    Archer,
    Ballista,
    Caltrop,
    Bird,
    Catapult,
    Dragon,
    GatlingGun,
    HealingWard,
    Knight,
    Mage,
    Priest,
    Raider,
    ShadowWolf,
    ShroudField,
    Skeleton,
    SlowField,
    Snake,
    Soldier,
    Werewolf,
    Wolf,
    Worker
  }

  // A wrapper for the little war game scope object.
  export class Scope{
    // The wrapped little war game object.
    private _innerScope: LWG.IScope;

    getProducer(type: UnitType):BuildingType{
      switch(type){
        case UnitType.Bird:
        case UnitType.Worker:
          return BuildingType.Castle;
          // TODO: or fortress.
        case UnitType.Soldier:
        case UnitType.Archer:
        case UnitType.Knight:
        case UnitType.Raider:
          return BuildingType.Barracks;
        case UnitType.Wolf:
        case UnitType.Snake:
          return BuildingType.WolvesDen;
          //TODO: or werewolves den.
        case UnitType.Mage:
          return BuildingType.MagesGuild;
        case UnitType.Priest:
          return BuildingType.Church;
        case UnitType.Catapult:
        case UnitType.GatlingGun:
          return BuildingType.Workshop;
        case UnitType.Ballista:
        case UnitType.Airship:
          return BuildingType.AdvancedWorkshop;
        case UnitType.Werewolf:
          return BuildingType.WerewolvesDen;
      }
    }

    getDistanceBetweenBuildings(building1:Building, building2:Building):number{
      var perimiter1 = this.getBuildingPerimeterPoints(building1);
      if(perimiter1 == null){
        return null;
      }

      var perimiter2 = this.getBuildingPerimeterPoints(building2);
      if(perimiter2 == null){
        return null;
      }

      var closestPair = this.estimateClosestPair(perimiter1, perimiter2);
      if(closestPair == null){
        return null;
      }

      return this.getGroundDistance(closestPair.point1.x, closestPair.point1.y, closestPair.point2.x, closestPair.point2.y);
    }

    // Estimates which two points in  each collection are closest to each other.
    estimateClosestPair(collection1: Point[], collection2: Point[]):{point1:Point,point2:Point}{
      var closestDistance: number = Number.MAX_VALUE;
      var closestPair: {point1:Point, point2: Point} = null;
      for(let i = 0; i < collection1.length; i++){
        for(let j = 0; j < collection2.length; j++){
          let point1 = collection1[i];
          let point2 = collection2[j];
          let distance = this.getDistance(point1.x, point1.y, point2.x, point2.y);
          let pair = {point1: point1, point2: point2};

          if(closestPair == null || distance < closestDistance){
            closestDistance = distance;
            closestPair = pair;
          }
        }
      }

      return closestPair;
    }

    // Gets a collection of points around a box of the given size at the specified location.
    getPerimeterPoints(size: number, x:number, y:number):Point[]{
      var perimiterPoints: Point[] = [];
      var size: number = size;
      var perimiterSize: number = size + 2;
      var startX:number= x - 1;
      var startY:number = y - 1;

      // Add points along the top.
      for(let i = 0; i < perimiterSize; i++){
        let x = startX + i;
        if(x < 0 || x >= this.mapWidth){
          continue;
        }

        let y = startY;
        if(y < 0 || y >= this.mapHeight){
          continue;
        }

        perimiterPoints.push(new Point(x, y));
      }

      // Add points along the bottom.
      for(let i = 0; i < perimiterSize; i++){
        let x = startX + i;
        if(x < 0 || x >= this.mapWidth){
          continue;
        }

        let y = startY + perimiterSize;

        if(y < 0 || y >= this.mapHeight){
          continue;
        }

        perimiterPoints.push(new Point(x, y));
      }

      startY = y;

      // Add points along the left.
      for(let i = 0; i < size; i++){
        let y = startY + i;
        if(y < 0 || y >= this.mapHeight){
          continue;
        }

        let x = startX;
        if(x < 0 || x >= this.mapWidth){
          continue;
        }

        perimiterPoints.push(new Point(x, y));
      }

      // Add points along the right.
      for(let i = 0; i < size; i++){
        let y = startY + i;
        if(y < 0 || y >= this.mapHeight){
          continue;
        }

        let x = startX + perimiterSize;

        if(x < 0 || x >= this.mapWidth){
          continue;
        }

        perimiterPoints.push(new Point(x, y));
      }

      return perimiterPoints;
    }

    // Gets a collection of points around the perimiter of a building.
    getBuildingPerimeterPoints(targetBuilding: Building): Point[]{
      return this.getPerimeterPoints(targetBuilding.size, targetBuilding.x, targetBuilding.y);
    }

    // Gets the distance between the two points along the ground. If no path can be found, null is returned.
    getGroundDistance(x1:number, y1:number, x2: number, y2:number):number{
      var x1Round = Math.floor(x1);
      var x2Round = Math.floor(x2);
      var y1Round = Math.floor(y1);
      var y2Round = Math.floor(y2);
      var startPoint = Common.Util.spiralSearch(x1Round, y1Round, (x:number, y:number):boolean =>{
        return this.positionIsPathable(x,y);
      }, HiddenMagicNumbers.pathStartDistance);

      if(startPoint == null){
        return null;
      }

      var groundDistance = this._innerScope.getGroundDistance(startPoint.x, startPoint.y, x2Round, y2Round);
      if(groundDistance <= 0){
        return null;
      }
      else{
        return groundDistance;
      }
    }

    // Returns the current upgrade level of the specified upgrade type.
    getUpgradeLevel(type: UpgradeType):number{
      var upgradeName = TypeMapper.getUpgradeName(type);
      return this._innerScope.getUpgradeLevel(upgradeName);
    }

    // Gets the center point of a list of units.
    getCenterOfUnits(units: GameEntity[]): Point{
      var innerUnits: LWG.IUnit[] = units.map(
        (unit) => {
          return unit.innerUnit;
        }
      );

      var point: LWG.IPoint = this._innerScope.getCenterOfUnits(innerUnits);
      return new Point(point.x, point.y);
    }

  	// The AI's player number.
    get playerNumber(): number {
      return this._innerScope.getMyPlayerNumber();
    };

    // The AI's team number.
    get teamNumber(): number{
      return this._innerScope.getMyTeamNumber();
    };

    // The start position for the specified player.
    getStartPosition(player: number){
      return this._innerScope.getStartLocationForPlayerNumber(player);
    }

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

    get projectedAvailableSupply():number{
      var buildings =  this.getBuildings({});
      var newSupply = 0;
      buildings.forEach(building => {
        if(building.isUnderConstruction){
          newSupply += this.getBuildingTypeFieldValue(building.type, TypeField.SupplyProvided);
        }
      });
      
      return this.maxAvailableSupply + newSupply;
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
      if(notOfType != undefined){
        mappedFilter[HiddenMagicStrings.filterNotOfTypePropertyName] = TypeMapper.getUnitName(notOfType);
      }

      var player: number = filter.player;
      if(player != undefined){
        mappedFilter[HiddenMagicStrings.filterPlayerPropertyName] = player;
      }

      var team: number = filter.team;
      if(team != undefined){
        mappedFilter[HiddenMagicStrings.filterTeamPropertyName] = team;
      }

      var enemyOf: number = filter.enemyOf;
      if(enemyOf != undefined){
        mappedFilter[HiddenMagicStrings.filterEnemyOfPropertyName] = enemyOf;
      }

      var order: OrderType = filter.order;
      if(order != undefined){
        mappedFilter[HiddenMagicStrings.filterOrderPropertyName] = TypeMapper.getOrderName(order);
      }

      var units: Unit[] = this._innerScope.getUnits(mappedFilter).map(
        (unit: LWG.IUnit) => {
          return UnitFactory.createUnit(unit, this);
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

      var mappedO = null;

      if(o != null){
        mappedO = {};
        if(o.x != undefined){
          mappedO["x"] = o.x;
        }

        if(o.y != undefined){
          mappedO["y"] = o.y;
        }

        if(o.unit != undefined){
          mappedO["unit"] = o.unit._innerUnit;
        }
      }

      var orderString = TypeMapper.getOrderName(order);
      this._innerScope.order(orderString, innerUnits, mappedO, chainCommands);
    }

    // Gets a collection of buildings based on a filter.
    getBuildings(filter: any): Building[]{
      var mappedFilter = {};

      var type: BuildingType = filter.type;
      if(type != undefined){
        mappedFilter[HiddenMagicStrings.filterTypePropertyName] = TypeMapper.getBuildingName(type);
      }

      var notOfType: BuildingType = filter.notOfType;
      if(notOfType != undefined){
        mappedFilter[HiddenMagicStrings.filterNotOfTypePropertyName] = TypeMapper.getBuildingName(notOfType);
      }

      var player: number = filter.player;
      if(player != undefined){
        mappedFilter[HiddenMagicStrings.filterPlayerPropertyName] = player;
      }

      var team: number = filter.team;
      if(team != undefined){
        mappedFilter[HiddenMagicStrings.filterTeamPropertyName] = team;
      }

      var enemyOf: number = filter.enemyOf;
      if(enemyOf != undefined){
        mappedFilter[HiddenMagicStrings.filterEnemyOfPropertyName] = enemyOf;
      }

      var order: OrderType = filter.order;
      if(order != undefined){
        mappedFilter[HiddenMagicStrings.filterOrderPropertyName] = TypeMapper.getOrderName(order);
      }

      var onlyFinished: boolean = filter.onlyFinished;
      if(onlyFinished != undefined){
        mappedFilter[HiddenMagicStrings.filterOnlyFinishedPropertyName] = onlyFinished;
      }

      var buildings: Building[] = this._innerScope.getBuildings(mappedFilter).map(
        (unit: LWG.IUnit) => {
          return BuildingFactory.createBuilding(unit, this);
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
      var mines = this.getBuildings({type: BuildingType.Mine});
  		for(var i = 0; i < mines.length; i++){
  			var mine = mines[i];
        var minePerimiter = this.getBuildingPerimeterPoints(mine);
        var closestPair = this.estimateClosestPair([new Point(x, y)], minePerimiter);
  			var distance = this.getDistance(closestPair.point1.x, closestPair.point1.y, closestPair.point2.x, closestPair.point2.y);
  			if(distance < HiddenMagicNumbers.minimumMineRadius){
  				return true;
  			}
  		}

  		return false;
  	};

    // Determines if a position is blocked by units.
    positionIsBlocked(x:number, y:number): boolean{
      for(let i = 0; i < this.blockedPoints.length; i++){
        let blockedPoint = this.blockedPoints[i];
        if(blockedPoint.x == x && blockedPoint.y == y){
          return true;
        }
      }

      return false;
    }

    // Determines if a position is on a ramp.
    positionIsOnRamp(x:number, y:number): boolean{
      return this._innerScope.fieldIsRamp(x, y);
    }

    // Determines if a position is pathable.
    positionIsPathable(x:number, y:number):boolean{
      return this._innerScope.positionIsPathable(x, y);
    }

    // Gets the closest unit out of a list of units accounting for pathing.
    getClosestByGround(x: number, y: number, targetUnits: GameEntity[]): GameEntity{
      var closest: GameEntity = null;
      var closestDistance: number = Number.MAX_VALUE;
      for(let i: number = 0; i < targetUnits.length; i++){
        var targetUnit: GameEntity = targetUnits[i];

        // The unit cannot be closer than the current closest if the distance as the crow flies is greater than the ground distance of the current closest.
        var shortDistanceToTarget:number = this.getDistance(x, y, targetUnit.x, targetUnit.y);
        if(shortDistanceToTarget < closestDistance){
          var distanceToTarget: number = this.getGroundDistance(x, y, targetUnit.x, targetUnit.y);
          if(distanceToTarget != null && distanceToTarget < closestDistance){
            closest = targetUnit;
            closestDistance = distanceToTarget;
          }
        }
      }

      return closest;
    }

    // Gets the closest unit out of a list of units.
  	getClosest(x: number, y: number, targetUnits: GameEntity[]): GameEntity{
  		var closest: GameEntity = null;
  		var closestDistance: number = Number.MAX_VALUE;
  		for(let i: number = 0; i < targetUnits.length; i++){
  			var targetUnit: GameEntity = targetUnits[i];
  			var distanceToTarget: number = this.getDistance(x, y, targetUnit.x, targetUnit.y);
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

    getUpgradeTypeFieldValue(type: UpgradeType, field: TypeField): any{
      var typeName: string = TypeMapper.getUpgradeName(type);
      var typeId: string = TypeMapper.getTypeId(typeName);
      var fieldName: string = TypeMapper.getTypeFieldName(field);

      return this._innerScope.getTypeFieldValue(typeId, fieldName);
    }

    constructor(sourceScope: LWG.IScope){
      this.reset(sourceScope);

      this.determineAlliances();
    }

    // A per-cycle cache of points blocked by units.
    private _blockedPoints: Point[];

    get blockedPoints(): Point[]{
      if(this._blockedPoints == null){
        this._blockedPoints = this.calculateBlockedPoints();
      }

      return this._blockedPoints;
    }

    // Calculates what map squares are blocked by units.
    private calculateBlockedPoints(): Point[]{
      var units: Unit[] = this.getUnits({});
      var blockedPoints: Point[] = [];
      for(let i = 0; i < units.length; i++){
        let unit = units[i];
        let minX = Math.floor(unit.x - (unit.size/ 2));
        let minY = Math.floor(unit.y - (unit.size/ 2));
        let maxX = Math.floor(unit.x + (unit.size/ 2));
        let maxY = Math.floor(unit.y + (unit.size/ 2));

        for(let j = minX; j <= maxX; j++){
          for(let k = minY; k <= maxY; k++){
            blockedPoints.push(new Point(j, k));
          }
        }
      }

      return blockedPoints;
    }

    reset(sourceScope: LWG.IScope): void{
      this._innerScope = sourceScope;
      this._blockedPoints = null;
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

    // Orders the game unit to stop it's current action.
    stop():void{
      this._scope.order(OrderType.Stop, [this], null, this.chainCommandMode);
    }

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
      this._scope.order(OrderType.MoveTo, [this], {unit: building}, this.chainCommandMode);
    }

    move(x:number, y:number):void{
      this._scope.order(OrderType.Move, [this], {x:x, y:y}, this.chainCommandMode);
    }

    // Orders the unit to attack move to the coordiantes.
    attackTo(x: number, y:number):void{
      this._scope.order(OrderType.AttackMove, [this], {x:x, y:y}, this.chainCommandMode);
    }

    // Orders the unit to attack the target unit or building.
    attack(target: ZChipAPI.GameEntity):void{
      this._scope.order(OrderType.Attack, [this], {unit: target}, this.chainCommandMode);
    }

    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }
  }

  export class Worker extends Unit{
    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }

    // Returns the mine that the worker is currently mining at if any.
    get targetMineId(): number{
      // TODO: Hella Haxors. This isn't in the API.
      let mine: any = this._innerUnit.getValue("goldMine");
      if(mine != null){
        return mine.id;
      }

      return null;
    }

    // Gets the building that the worker is currently building, or null if the worker is not building.
    get currentlyBuilding(): BuildingType{
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
      this._scope.order(ZChipAPI.OrderType.Mine, [this], {unit: mine}, this.chainCommandMode);
    }
  }

  export class Building extends GameEntity{
    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }

    get type():BuildingType{
      return TypeMapper.getBuildingType(this._innerUnit.getTypeName());
    }

    // Returns false if the building is finished, otherwise returns true.
    get isUnderConstruction(): boolean{
      return this._innerUnit.isUnderConstruction();
    }

    // Gets the size of the building.
    get size():number{
      return this._scope.getBuildingTypeFieldValue(TypeMapper.getBuildingType(this._innerUnit.getTypeName()), TypeField.Size);
    }
  }

  export class ProductionBuilding extends Building{
    constructor(innerUnit: LWG.IUnit, scope:Scope){
      super(innerUnit, scope);
    }

    // Gets the upgrade currently in production at the queue index, or null if no upgrade is in production at that index.
    getUpgradeProductionAtQueue(index: number):UpgradeType{
      return TypeMapper.getUpgradeType(this._innerUnit.getUnitTypeNameInProductionQueAt(index + 1));
    }

    trainUnit(type: ZChipAPI.UnitType): boolean{
      var cost = this._scope.getUnitTypeFieldValue(type, TypeField.Cost);

      if(this._scope.currentGold < cost){
        return false;
      }
      else{
        var trainCommand: OrderType = TypeMapper.getTrainOrderFromUnitType(type);
        this._scope.order(trainCommand, [this], null, this.chainCommandMode);
        return true;
      }
    }

    // Research the specified upgrade.
    researchUpgrade(type: ZChipAPI.UpgradeType): boolean{
      var cost = this._scope.getUpgradeTypeFieldValue(type, TypeField.Cost);

      if(this._scope.currentGold < cost){
        return false;
      }
      else{
        var researchCommand: ZChipAPI.OrderType = TypeMapper.getOrderTypeFromUpgradeType(type);
        this._scope.order(researchCommand, [this], null, this.chainCommandMode);
        return true;
      }
    }

    // Gets the unit currently in production at the queue index, or null if no unit is in production at that index.
    getUnitProductionAtQueue(index: number):UnitType{
      return TypeMapper.getUnitType(this._innerUnit.getUnitTypeNameInProductionQueAt(index + 1));
    }

    // Returns if the building is busy training or upgrading.
    get isBusy(): boolean{
      if(this.isUnderConstruction){
        return true;
      }
      if(this.getUpgradeProductionAtQueue(0) == null && this.getUnitProductionAtQueue(0) == null){
        return false;
      }
      return true;
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
