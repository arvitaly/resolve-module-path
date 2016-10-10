interface Opts {
    //Caller stack depth
    stackDepth: number;
    basePath: string;
    npmPath: string;
}
declare function resolve(modulePath: string, opts: Opts): string;
export = resolve;