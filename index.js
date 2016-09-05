var path = require('path'), fs = require('fs');
module.exports = (modulePath, opts) => {
    opts = opts || {};
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = (_, stack) => {
        return stack;
    };
    var stacks = new Error().stack;
    opts.stackDepth = opts.stackDepth || 0;
    var callerPath = path.dirname(stacks[opts.stackDepth + 1].getFileName());
    Error.prepareStackTrace = oldPrepareStackTrace;
    var basePath;
    if (!opts.basePath) {
        basePath = callerPath;
    } else {
        basePath = resolvePath(opts.basePath, callerPath);
    }
    var fullpath;
    if (path.isAbsolute(modulePath)) {
        //Local module with absolute path
        fullpath = modulePath;
    } else {
        //Local module with relative path
        if (modulePath.substr(0, 2) === "./") {
            fullpath = resolvePath(modulePath, basePath);
        } else {
            if (opts.npmPath) {
                opts.npmPath = resolvePath(opts.npmPath, callerPath)
            }
            //npm extern module            
            try {
          var npmPath = opts.npmPath ? opts.npmPath : (opts.basePath ? basePath : process.cwd()) + "/node_modules";
                fullpath = resolvePath(modulePath, npmPath);
                fs.accessSync(fullpath, fs.F_OK);
            } catch (e) {
                //System module or non-existing
                if (opts.npmPath) {
                    fullpath = resolvePath(modulePath, opts.npmPath);
                } else {
                    fullpath = modulePath;
                }
            }
        }
    }
    try {
        return require.resolve(fullpath);
    } catch (e) {
        return fullpath;
    }
}
function resolvePath(modulePath, basePath) {
    if (path.isAbsolute(modulePath)) {
        return modulePath;
    }
    return path.resolve(path.join(basePath, modulePath));
}