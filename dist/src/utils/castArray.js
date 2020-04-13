"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.castArray = function (value) {
    if (!Array.isArray(value)) {
        return [value];
    }
    return value;
};
