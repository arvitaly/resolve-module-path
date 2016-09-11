declare module "resolve-module-path" {
    interface Opts {
        //Caller stack depth
        stackDepth: number;
        basePath: string;
        npmPath: string;
    }
    function resolve(modulePath: string, opts: Opts): string;
    export = resolve;
}