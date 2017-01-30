require('./sanityCheck.js')();

function normalizePath(path){
  return path.replace(/\\/g, '/');
}

var path = require('path');
var conf = {
  paths: {
    APP_ROOT: normalizePath(path.resolve(__dirname)),
    PUBLIC_SCRIPTS: normalizePath(path.resolve(__dirname, 'public/js/')),
    SRC_SCRIPTS: normalizePath(path.resolve(__dirname, 'src/js/')),
    TEMPLATES: normalizePath(path.resolve(__dirname, 'src/templates/')),
    TEST_FILES: normalizePath(path.resolve(__dirname, 'tests/'))
  },
  middleware: {
    webpack: {
      // controls what gets displayed in the CLI when WebPack compiles
      stats: {
        // With console colors
        colors: true,
        // add the hash of the compilation
        hash: false,
        // add webpack version information
        version: false,
        // add timing information
        timings: true,
        // add assets information
        assets: false,
        // add built modules information
        modules: false,
        // add information about cached (not built) modules
        cached: false,
        // add information about the reasons why modules are included
        reasons: false,
        // add the source code of modules
        source: false,
        // add details to errors (like resolving log)
        errorDetails: true,
        // add the origins of chunks and chunk merging info
        chunkOrigins: false,
        // Add messages from child loaders
        children: false
      }
    }
  },
  webpack: {
    resolve: {
      alias: {}
    }
  }
};

// Add paths to webpack as alias'. This will allow us to `import` or `require` a 
// path via a constant rather than having to use `../../etc/`.
for(var path in conf.paths){
  conf.webpack.resolve.alias[path] = conf.paths[path];
}
 
module.exports = conf;