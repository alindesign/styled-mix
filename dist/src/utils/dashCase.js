"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashCase = function (value, isCSS) {
    if (isCSS === void 0) { isCSS = true; }
    value = "" + (value !== null && value !== void 0 ? value : '');
    value = value.trim();
    value = value.replace(/[A-Z\s]/g, function (v) { return "-" + ("" + v).toString().trim().toLowerCase(); });
    var segments = value.split('-').filter(function (seg, index) { return index === 0 || !!seg; }).join('-');
    value = segments;
    if (/^-(web|moz|o|ms)/.test(value) && isCSS) {
        return "-" + value;
    }
    return value;
};
