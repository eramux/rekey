import { recursiveRename, recursiveDelete } from "./rekey"
/**
 * This will let you rename keys inside of an given object. Keys can also be modified inside object arrays.
 * @param object Object of which the keys should be modified
 * @param selector A key path which identifies the key you want to modify
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
 *
 * @example
 * // Replace keys inside top-level or sub-level object arrays
 * let users = [
 *    {
 *      name: "Albert"
 *      settings: [
 *        {
 *          subject: "physics"
 *        }
 *        {
 *          subject: "maths"
 *        }
 *      ]
 *    },
 *    {
 *      name: "Steven",
 *      settings: [
 *        {
 *          subject: "physics"
 *        }
 *        {
 *          subject: "maths"
 *        }
 *      ]
 *    }
 *    {
 *      name: "Marie",
 *      settings: [
 *        {
 *          subject: "chemistry"
 *        }
 *      ]
 *    }
 * ]
 *
 * // This object can now be modified
 * renameKey(users, "name", "username")
 * renameKey(users, "settings.subject", "abilities")
 */
export function renameKey(object: Object, selector: string, value: string) {
  let selectorArray = selector.split('.')
  recursiveRename(object, selectorArray, value)
}

/**
 * This will let you delete keys inseide of an given object. Keys can also be deleted inside object arrays.
 * @param object Object of which the keys should be deleted
 * @param selector A key path which identifies the key you want to delete
 */
export function deleteKey(object: Object, selector: string) {
  let selectorArray = selector.split('.')
  recursiveDelete(object, selectorArray)
}



