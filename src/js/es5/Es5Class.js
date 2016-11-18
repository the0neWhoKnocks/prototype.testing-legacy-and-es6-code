window.namespace.Es5Class = function(opts){
  this.init(opts);
}

window.namespace.Es5Class.prototype = {
  init: function(opts){
    opts = opts || {};
  
    this.namespace = opts.namespace || 'exampleClass';
    
    console.log('Es5 class initializing');
  }
};