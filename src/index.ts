import { recursiveRename, recursiveDelete } from "./rekey"
import { RekeyObject } from "./rekey"
/**
 *
 * @param object Object of which a key should be modified
 * @param key  A key path which identifies the key you want to modify
 * @param value The value with which you want to replace the key name
 * @example
 * // replace the 'name' key with 'username'
 * renameKey({
 *    person: {
 *      name: "John"
 *    }
 * },
 * "person.name",
 * "username")
 */
export function renameKey(object: RekeyObject, key: string, value: string) {
  let keys = key.split('.')
  recursiveRename(object, keys, value)
}

export function deleteKey(object: RekeyObject, key: string) {
  let keys = key.split('.')
  recursiveDelete(object, keys)
}



