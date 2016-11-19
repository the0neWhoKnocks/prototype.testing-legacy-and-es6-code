module.exports = function(){
  if( /Windows/.test(process.env.OS) ){    
    var drive1 = process.env.PWD.replace(/\/cygdrive\//, '').toLowerCase()[0];
    var drive2 = __dirname.toLowerCase()[0];
    
    
    if( drive1 !== drive2 ){
      var errMsg = "  [ ERROR ]\n\n";
          errMsg += "  It seems you're running this within a symlinked directory.\n";
          errMsg += "  This app utilizes `__dirname` which will report the actual\n";
          errMsg += "  directory path instead of the symlinked one. This behavior\n";
          errMsg += "  will cause Karma to not load files properly.\n\n";
          errMsg += "  You'll have to `cd` into the actual directory and run the\n";
          errMsg += "  app from there.\n";
      
      console.log(errMsg);
      process.exit(1);
    }
  }
};