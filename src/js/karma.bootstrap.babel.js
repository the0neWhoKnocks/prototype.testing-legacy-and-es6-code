// bootstrapped code
window.testCtx = {
  reset: function(){
    $('body').empty().off();
    console.log('Context reset');
  }
};

window.namespace = window.namespace || {};

// Load all the tests files here so they can be transpiled.
// Note that if you set `useSubdirectories` (second arg) to `true` and there aren't any, it'll fail.
const testFiles = require.context('TEST_FILES/', true, /\.test\.js$/);

// Run the loaded files.
testFiles.keys().forEach(testFiles);