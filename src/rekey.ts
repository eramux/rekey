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
export function recursiveRename(workingObject: RekeyObject, selector: Array<string>, value: string) {
  recursiveKeyTraversal(workingObject, selector, (object, currentSelector) => {
    object[value] = object[currentSelector]
    delete object[currentSelector]
  })
}

/**
 * This function recursively iterates over each object or array in a object and deletes the keys that conicide with the given keys selector
 * @param workingObject
 * @param selector The selector of the key that should be deleted
 */
export function recursiveDelete(workingObject: RekeyObject, selector: Array<string>) {
  recursiveKeyTraversal(workingObject, selector, (object, currentSelector) => {
    delete object[currentSelector]
  })
}



export function recursiveKeyTraversal(workingObject: RekeyObject, selectors: Array<string>, callback: KeyTraversalCallback) {

  let remainingSelectors = selectors.slice(1)


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
    let currentSelector: any = selectors[0]
    if (selectors.length <= 1) {
      return callback(workingObject, currentSelector)
    } else {
      recursiveKeyTraversal((workingObject as RekeyObject)[currentSelector], remainingSelectors, callback)
    }
  }
}