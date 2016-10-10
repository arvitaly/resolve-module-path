interface Opts {
    //Caller stack depth
    stackDepth?: number;
    basePath?: string;
    npmPath?: string;
}
declare namespace ResolveModulePath {

}
declare function ResolveModulePath(modulePath: string, opts?: Opts): string;
export = ResolveModulePath;