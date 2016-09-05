# resolve-module-path

[![npm version](https://badge.fury.io/js/resolve-module-path.svg)](https://badge.fury.io/js/resolve-module-path)
[![Build Status](https://travis-ci.org/arvitaly/resolve-module-path.svg?branch=master)](https://travis-ci.org/arvitaly/resolve-module-path)
[![Coverage Status](https://coveralls.io/repos/github/arvitaly/resolve-module-path/badge.svg?branch=master)](https://coveralls.io/github/arvitaly/resolve-module-path?branch=master)

Lib for resolving path for requiring module with other environments

# Install

    //Node version >= 6
    npm install resolve-module-path

# Usage

    var resolve = require('resolve-module-path');
    console.log(resolve("./module1",{
        //Path will resolve from dir of this file
        basePath: "./path1"
    }));

Look more here https://github.com/arvitaly/resolve-module-path/blob/master/spec
    
# Options

basePath: if base path not setted, lib take path from caller (by stack)
npmPath: if npm path not setted, lib take (base path or process.cwd()) + "/node_modules"
stackDepth: you can also use this library in other library, which use resolve, look tests for example