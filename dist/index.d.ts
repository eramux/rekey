declare module "rekey" {
    export interface RekeyObject {
        [key: string]: any;
    }
    export function recursiveRename(workingObject: RekeyObject, selector: Array<string>, value: string): Boolean;
    export function recursiveDelete(workingObject: RekeyObject, selector: Array<string>): Boolean;
}
declare module "index" {
    import { RekeyObject } from "rekey";
    export function renameKey(object: RekeyObject, key: string, value: string): void;
    export function deleteKey(object: RekeyObject, key: string): void;
}
//# sourceMappingURL=index.d.ts.map