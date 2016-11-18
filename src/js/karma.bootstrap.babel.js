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

// Load all the tests files here so they can be transpiled.
// Note that if you set `useSubdirectories` (second arg) to `true` and there aren't any, it'll fail.
const testFiles = require.context('TEST_FILES/', true, /\.test\.js$/);

// Run the loaded files.
testFiles.keys().forEach(testFiles);