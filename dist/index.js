"use strict";
function rename_recursive(keys, value, workingObject) {
    let currentKey = keys[0];
    if (keys.length > 1) {
        if (workingObject.hasOwnProperty(currentKey)) {
            if (workingObject[currentKey] == null) {
                return false;
            }
            else if (workingObject[currentKey] instanceof Array) {
                let restKeys = keys.slice(1);
                workingObject[currentKey] = workingObject[currentKey].map((item) => {
                    if (item == null) {
                        return item;
                    }
                    else if (item instanceof Object) {
                        rename_recursive(restKeys, value, item);
                    }
                    else {
                        return item;
                    }
                    return item;
                });
            }
            else if (workingObject[currentKey] instanceof Object) {
                return rename_recursive(keys.slice(1), value, workingObject[currentKey]);
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
        if (workingObject.hasOwnProperty(currentKey)) {
            workingObject[value] = workingObject[currentKey];
            delete workingObject[currentKey];
        }
        else {
            return false;
        }
    }
    return false;
}
function rename(key, value, object) {
    let keys = key.split('.');
    rename_recursive(keys, value, object);
}
module.exports = {
    rename
};
//# sourceMappingURL=index.js.map