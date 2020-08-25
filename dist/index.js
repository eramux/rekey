"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteKey = exports.renameKey = void 0;
const rekey_1 = require("./rekey");
function renameKey(object, key, value) {
    let keys = key.split('.');
    rekey_1.recursiveRename(object, keys, value);
}
exports.renameKey = renameKey;
function deleteKey(object, key) {
    let keys = key.split('.');
    rekey_1.recursiveDelete(object, keys);
}
exports.deleteKey = deleteKey;
//# sourceMappingURL=index.js.map