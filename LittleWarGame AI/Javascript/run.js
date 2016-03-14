if(this.init == undefined){
  this.init = true;
  // Paste compiled javascript here.
  this.grandCommander = new GrandCommander();
  this.cycle = function(scope){
    var superScope = new ZChipAPI.Scope(scope);
    var cache = new Cache(superScope);

    this.grandCommander.setScope(superScope, cache);
    this.grandCommander.executeOrders();
  }
}

this.cycle(scope);
