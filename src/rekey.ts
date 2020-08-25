type KeyTraversalCallback = (workingObject: RekeyObject, currentSelector: string) => void;
export interface RekeyObject {
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
  let currentSelector = selectors[0]

  let remainingSelectors = selectors.slice(1)
  // Check if the recursion is in the last layer of the selector
  if (selectors.length <= 1) {
    if (workingObject instanceof Array) {
      workingObject = workingObject.map((item: any) => {
        if (item == null) {
          return item
        }
        if (item instanceof Object) {
          recursiveKeyTraversal(item, selectors, callback)
        }
        return item
      })
      return
    }

    if (workingObject instanceof Object) {
      return callback(workingObject, currentSelector)
    }
  }


  if (!workingObject.hasOwnProperty(currentSelector)) {
    return
  }

  let currentElement = workingObject[currentSelector]

  // If the current selector terminates at a null value while still not having arrived at the last selector level, we return false
  if (currentElement === null) {
    return
  }


  // If we encounter an array at the current selector, we need to loop through every element and apply the recursiveKeyTraversal on each elegible element
  if (currentElement instanceof Array) {
    currentElement = currentElement.map((item: any) => {

      if (item == null) {
        return item
      }
      if (item instanceof Object) {
        recursiveKeyTraversal(item, remainingSelectors, callback)
      }
      return item
    })
    return
  }

  if (currentElement instanceof Object) {
    recursiveKeyTraversal(currentElement, remainingSelectors, callback)
    return
  }

  return
}