interface Options {
    include?: Array<string>;
    recursive?: boolean;
}
export declare const trimObject: <T extends Object>(obj: T, { include, recursive }?: Options) => T;
export {};
