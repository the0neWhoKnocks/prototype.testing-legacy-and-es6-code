// bootstrapped code
window.testCtx = {
  reset: () =>{
    $('body').empty().off();
    console.log('Context reset');
  }
};

window.namespace = window.namespace || {
  loadedFiles: [],
  load: function(path){
    if( window.namespace.loadedFiles.indexOf(path) > -1 ){
      return;
    }
    
    var x = new XMLHttpRequest();
    
    x.open('GET', path, false);
    x.onreadystatechange = () => {
      if(x.readyState === 4) {
        switch(x.status) {
          case 200:
            eval( x.responseText.trim() );
            window.namespace.loadedFiles.push(path);
            break;
        }
      }
    }

    x.send();
  }
};