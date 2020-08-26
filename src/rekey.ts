type KeyTraversalCallback = (workingObject: RekeyObject, currentSelector: string) => void;
export interface RekeyObject extends Object {
  [key: string]: any
}

/**
 * This function recursively iterates over each object or array in a object and adjusts all keys that conicide with the given keys selector
 * @param workingObject The object to be modified
 * @param selector The selector of the key that should be modified
 * @param value The value with wich the key should be modified with
 */
export function recursiveRename(workingObject: Object, selector: Array<string>, value: string) {
  recursiveKeyTraversal(workingObject, selector, (object, lastSelector) => {
    let keyValue = Object.getOwnPropertyDescriptor(object, lastSelector)
    if (keyValue !== undefined) {
      Object.defineProperty(object, value, keyValue);
      delete object[lastSelector]
    }
  })
}

/**
 * This function recursively iterates over each object or array in a object and deletes the key(s) that conicide(s) with the given keys selector
 * @param workingObject
 * @param selector The selector of the key that should be deleted
 */
export function recursiveDelete(workingObject: Object, selector: Array<string>) {
  recursiveKeyTraversal(workingObject, selector, (object, lastSelector) => {
    delete object[lastSelector]
  })
}



export function recursiveKeyTraversal(workingObject: Object, selectors: Array<string>, callback: KeyTraversalCallback) {

  // Check if the recursion is in the last layer of the selector
  if (workingObject instanceof Array && workingObject !== null) {
    workingObject = workingObject.map((item: any) => {
      if (item instanceof Object && item !== null) {
        recursiveKeyTraversal(item, selectors, callback)
      }
      return item
    })
    return
  }

  if (workingObject instanceof Object && workingObject !== null) {
    let currentSelector: string = selectors[0]
    if (selectors.length <= 1) {
      return callback(workingObject, currentSelector)
    }
    recursiveKeyTraversal(workingObject[currentSelector], selectors.slice(1), callback)
  }
}