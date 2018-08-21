///<reference path="./typescript/LWG-API.ts" />
///<reference path="./typescript/ZChip-API.ts" />
///<reference path="./typescript/ZChip-AI.ts" />
///<reference path="./typescript/builds/TestBuild.ts" />
///<reference path="./typescript/builds/RaxBuild.ts" />
///<reference path="./typescript/builds/BeastBuild.ts" />

var scope :LWG.IScope;
if(this.init == undefined){
  this.init = true;
  this.grandCommander = new ZChipAI.GrandCommander(new RaxBuild());
  this.cycle = function(scope){
    var superScope = new ZChipAPI.Scope(scope);
    var cache = new ZChipAI.Cache(superScope);

    this.grandCommander.setScope(superScope, cache);
    this.grandCommander.executeOrders();
  }

  var superScope = new ZChipAPI.Scope(scope);
  var cache = new ZChipAI.Cache(superScope);

  this.grandCommander.setScope(superScope, cache);

  // DEBUG: Run tests code.
  this.grandCommander.singleRunTest();

  this.grandCommander.executeOrders();
}
else{
  this.cycle(scope);
}
