"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function nonNullableArray(array) {
    return array.filter(function (item) { return !!item; });
}
exports.nonNullableArray = nonNullableArray;
