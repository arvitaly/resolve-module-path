var path = require('path');
var resolve = require('./../index');
it("when path is relative and basePath not setted, base path should calculated from stack and return real path", () => {
    expect(resolve("./m1.js")).toBe(require.resolve('./m1.js'));
})
it("when path is relative and basePath setted, base path should concat with modulePath and return real path", () => {
    expect(resolve("./m2.js", {
        basePath: "./path1"
    })).toBe(require.resolve('./path1/m2.js'));
})
it("when path is relative and base path setted and set stackDepth, base path should calculcated by deep stack", () => {
    expect(require("./path2/path3/m3")("./path2/m4")).toBe(require.resolve('./path2/m4.js'));
})
it("when path is absolute and exists, should return as is", () => {
    var realPath = require.resolve("./m1");
    expect(resolve(realPath)).toBe(realPath);
})
it("when path is absolute and not exists, should return as is", () => {
    var realPath = "/should_not_exists_$$$/";
    expect(resolve(realPath)).toBe(realPath);
})
it("when path is npm-module and npm path not setted and base path not setted and module exists, should concat with process cwd 'node_modules' and module path", () => {
    expect(resolve("jasmine")).toBe(require.resolve(process.cwd() + "/node_modules/jasmine"));
})
it("when path is npm-module and base path setted and npm path not setted, should concat base path, 'node_modules' and module path", () => {
    expect(resolve("m5", {
        basePath: './path1'
    })).toBe(require.resolve("./path1/node_modules/m5"));
})
it("when path is npm-module and it is system module, should return as is", () => {
    expect(resolve("fs")).toBe(require.resolve("fs"));
})
it("when path is npm-module and it is not exists, should return as is", () => {
    expect(resolve("non_existing_modules")).toBe("non_existing_modules");
})
it("when path is npm-module and npm path setted and module exists, should concat npm path, 'node_modules' and resolve module path", () => {
    expect(resolve("m5", {
        npmPath: './path1/node_modules'
    })).toBe(require.resolve("./path1/node_modules/m5"));
})
it("when path is npm-module and npm path setted and module non exists, should concat npm path `node_module`, module path and return as is", () => {
    var npmPath = path.resolve('./path1/node_modules');
    expect(resolve("non_existing_modules", {
        npmPath: npmPath
    })).toBe(path.join(npmPath, "non_existing_modules"));
})