type KeyTraversalCallback = (workingObject: RekeyObject, currentSelector: string) => Boolean;
export interface RekeyObject {
  [key: string]: any
}

/**
 * This function recursively iterates over each object or array in a object and adjusts all keys that conicide with the given keys selector
 * @param workingObject The object to be modified
 * @param selector The selector of the key that should be modified
 * @param value The value with wich the key should be modified with
 */
export function recursiveRename(workingObject: RekeyObject, selector: Array<string>, value: string): Boolean {
  return recursiveKeyTraversal(workingObject, selector, (object, currentSelector) => {
    object[value] = object[currentSelector]
    delete object[currentSelector]
    return true
  })
}

/**
 * This function recursively iterates over each object or array in a object and deletes the keys that conicide with the given keys selector
 * @param workingObject
 * @param selector The selector of the key that should be deleted
 */
export function recursiveDelete(workingObject: RekeyObject, selector: Array<string>): Boolean {
  return recursiveKeyTraversal(workingObject, selector, (object, currentSelector) => {
    delete object[currentSelector]
    return true
  })
}



export function recursiveKeyTraversal(workingObject: RekeyObject, selector: Array<string>, callback: KeyTraversalCallback): Boolean {
  let currentSelector = selector[0]
  if (selector.length > 1) {
    if (workingObject.hasOwnProperty(currentSelector)) {
      if (workingObject[currentSelector] == null) {
        return false
      } else if (workingObject[currentSelector] instanceof Array) {
        let restSelector = selector.slice(1)
        workingObject[currentSelector] = workingObject[currentSelector].map((item: any) => {
          if (item == null) {
            return item
          } else if (item instanceof Object) {
            recursiveKeyTraversal(item, restSelector, callback)
          } else {
            return item
          }
          return item
        })
      } else if (workingObject[currentSelector] instanceof Object) {
        return recursiveKeyTraversal(workingObject[currentSelector], selector.slice(1), callback)
      } else {
        return false
      }
    } else {
      return false
    }
  } else {
    if (workingObject.hasOwnProperty(currentSelector)) {
      return callback(workingObject, currentSelector)
    } else {
      return false
    }
  }
  return false
}