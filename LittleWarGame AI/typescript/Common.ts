module Common{
  // Contains static utility methods.
  export class Util{
    // Begins at a point and spirals outwards. Returns the first point where validation succeeds.
    static spiralSearch(startX: number, startY: number, validator: (x:number, y:number)=>boolean, searchDiameter: number):ZChipAPI.Point{
      var x = 0,
        y = 0,
        delta = [0, -1],
        width = searchDiameter,
        height = searchDiameter;

      for (let i = Math.pow(Math.max(width, height), 2); i>0; i--) {
        if ((-width/2 < x && x <= width/2)
            && (-height/2 < y && y <= height/2)) {
          if(validator(startX + x,startY + y)){
            return {x: startX + x, y: startY + y};
          }
        }

        if (x === y
            || (x < 0 && x === -y)
            || (x > 0 && x === 1-y)){
          delta = [-delta[1], delta[0]]
        }

        x = x + delta[0];
        y = y + delta[1];
      }

      return null;
    }
  }

}
