interface UserObject {
    [key: string]: any;
}
declare function rename_recursive(keys: Array<string>, value: string, workingObject: UserObject): Boolean;
declare function rekey(key: string, value: string, object: UserObject): void;
