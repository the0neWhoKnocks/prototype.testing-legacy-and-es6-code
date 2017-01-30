var testCtx = {
  reset: function(){
    $('body').empty().off();
    console.log('Context reset');
  }
};

var bizLib = {
  loadedFiles: [],
  load: function(path){
    if( bizLib.loadedFiles.indexOf(path) > -1 ){
      return;
    }
    
    var x = new XMLHttpRequest();
    
    x.open('GET', path, false);
    x.onreadystatechange = function(){
      if(x.readyState === 4) {
        switch(x.status) {
          case 200:
            eval( x.responseText.trim() );
            bizLib.loadedFiles.push(path);
            break;
        }
      }
    }

    x.send();
  }
};

window.bizLib = bizLib;
window.testCtx = testCtx;