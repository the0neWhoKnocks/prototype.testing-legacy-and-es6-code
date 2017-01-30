bizLib.load('SRC_SCRIPTS/es5/util.js');

bizLib.Es5Class = Class.extend({
  init: function(opts){
    opts = opts || {};
  
    this.namespace = opts.namespace || 'exampleClass';
    this.defaultText = opts.defaultText || 'Hello World';
    this.markup = $('<div>'+ this.defaultText +'</div>').html();
    
    bizLib.util.log('Es5 class initializing', this.markup);
  }
});