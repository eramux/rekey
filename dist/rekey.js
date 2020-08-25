"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recursiveKeyTraversal = exports.recursiveDelete = exports.recursiveRename = void 0;
function recursiveRename(workingObject, selector, value) {
    return recursiveKeyTraversal(workingObject, selector, (object, currentSelector) => {
        object[value] = object[currentSelector];
        delete object[currentSelector];
        return true;
    });
}
exports.recursiveRename = recursiveRename;
function recursiveDelete(workingObject, selector) {
    return recursiveKeyTraversal(workingObject, selector, (object, currentSelector) => {
        delete object[currentSelector];
        return true;
    });
}
exports.recursiveDelete = recursiveDelete;
function recursiveKeyTraversal(workingObject, selector, callback) {
    let currentSelector = selector[0];
    if (selector.length > 1) {
        if (workingObject.hasOwnProperty(currentSelector)) {
            if (workingObject[currentSelector] == null) {
                return false;
            }
            else if (workingObject[currentSelector] instanceof Array) {
                let restSelector = selector.slice(1);
                workingObject[currentSelector] = workingObject[currentSelector].map((item) => {
                    if (item == null) {
                        return item;
                    }
                    else if (item instanceof Object) {
                        recursiveKeyTraversal(item, restSelector, callback);
                    }
                    else {
                        return item;
                    }
                    return item;
                });
            }
            else if (workingObject[currentSelector] instanceof Object) {
                return recursiveKeyTraversal(workingObject[currentSelector], selector.slice(1), callback);
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    }
    else {
        if (workingObject.hasOwnProperty(currentSelector)) {
            return callback(workingObject, currentSelector);
        }
        else {
            return false;
        }
    }
    return false;
}
exports.recursiveKeyTraversal = recursiveKeyTraversal;
//# sourceMappingURL=rekey.js.map