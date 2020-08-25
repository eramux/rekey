declare type KeyTraversalCallback = (workingObject: RekeyObject, currentSelector: string) => Boolean;
export interface RekeyObject {
    [key: string]: any;
}
export declare function recursiveRename(workingObject: RekeyObject, selector: Array<string>, value: string): Boolean;
export declare function recursiveDelete(workingObject: RekeyObject, selector: Array<string>): Boolean;
export declare function recursiveKeyTraversal(workingObject: RekeyObject, selector: Array<string>, callback: KeyTraversalCallback): Boolean;
export {};
//# sourceMappingURL=rekey.d.ts.map