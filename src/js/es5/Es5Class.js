window.namespace.load('SRC_SCRIPTS/es5/util.js');

window.namespace.Es5Class = function(opts){
  this.init(opts);
}

window.namespace.Es5Class.prototype = {
  init: function(opts){
    opts = opts || {};
  
    this.namespace = opts.namespace || 'exampleClass';
    
    window.namespace.util.log('Es5 class initializing');
  }
};