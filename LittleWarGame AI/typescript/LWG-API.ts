module LWG {
  export interface IPoint {
    x: number;
    y: number;
  }

  export interface IScope{
    getMyPlayerNumber():number;
    getMyTeamNumber(): number;
    getUnits(filter: any): IUnit[];
    getBuildings(any): IUnit[];
    order(order: String, units :IUnit[], arg: any, chainCommands: boolean);
    getCenterOfUnits(units: IUnit[]);
    getGold(): number;
    positionIsPathable(x: number, y:number);
    getMapWidth(): number;
    getMapHeight(): number;
    getArrayOfPlayerNumbers(): number[];
    getStartLocationForPlayerNumber(playerNumber: number): IPoint;
    getCurrentSupply(): number;
    getMaxSupply(): number;
    getCurrentGameTimeInSec(): number;
    getUpgradeLevel(upgradeName: string): number;
    getTypeFieldValue(typeId: string, fieldName:string): any;
    getGroundDistance(x1:number,y1:number, x2:number,y2:number): number;
    getTeamNumber(playerNumber: number): number;
    getHeightLevel(x:number, y:number): number;
    fieldIsRamp(x:number, y:number): boolean;
    chatMsg(messate: string):void;
  }

  export interface IUnit{
    getCurrentHP(): number;
    getX(): number;
    getY(): number;
    getTypeName(): string;
    getOwnerNumber(): number;
    getTeamNumber():number;
    getRemainingBuildTime(): number;
    getUnitTypeNameInProductionQueAt(index:number): string;
    isUnderConstruction():boolean;
    isNeutral(): boolean;
    getCurrentOrderName(): string;
    getTypeFieldValue(field: String): any;
    equals(unit: IUnit): boolean;
    getValue(key: string):any;
  }
}
