if(this.init == undefined){
  this.init = true;
  this.grandCommander = new GrandCommander();
}

var cache = new Cache(scope);
var superScope = new ZChipAPI.Scope(scope);

this.grandCommander.setScope(superScope, cache);
this.grandCommander.executeOrders();
