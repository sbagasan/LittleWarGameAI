if(this.init == undefined){
  this.init = true;
  this.grandCommander = new GrandCommander();
}

var superScope = new ZChipAPI.Scope(scope);
var cache = new Cache(superScope);

this.grandCommander.setScope(superScope, cache);
this.grandCommander.executeOrders();
