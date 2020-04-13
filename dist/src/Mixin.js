"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
var castArray_1 = require("./utils/castArray");
var nonNullableArray_1 = require("./utils/nonNullableArray");
var dashCase_1 = require("./utils/dashCase");
var Mixin = (function () {
    function Mixin(optionsOrProperty, lookup, defaultValue) {
        var _a, _b, _c, _d;
        this.props = {};
        this.defaultValue = null;
        var options = {};
        if (optionsOrProperty) {
            if (typeof optionsOrProperty !== 'string') {
                options = optionsOrProperty;
            }
            else {
                options.property = optionsOrProperty;
                options.lookup = lookup;
                options.defaultValue = defaultValue;
            }
        }
        this.props = (_a = options.props) !== null && _a !== void 0 ? _a : {};
        this.property = (_b = options.property) !== null && _b !== void 0 ? _b : this.property;
        this.lookup = (_c = options.lookup) !== null && _c !== void 0 ? _c : this.lookup;
        this.defaultValue = (_d = options.defaultValue) !== null && _d !== void 0 ? _d : this.defaultValue;
        this.mixin = this.mixin.bind(this);
    }
    Mixin.prototype.lookupValue = function () {
        var _this = this;
        var lookup = nonNullableArray_1.nonNullableArray(castArray_1.castArray(this.lookup).map(function (prop) {
            if (prop) {
                return prop.replace('@', _this.property);
            }
            return prop;
        }));
        if (lookup.length === 0) {
            return null;
        }
        var result = lookup.find(function (lookupProp) { return (!!_this.props[lookupProp] || _this.props[lookupProp] === 0); });
        if (!result) {
            return null;
        }
        return {
            key: result,
            value: this.props[result]
        };
    };
    Mixin.prototype.build = function (props) {
        this.extendProps(props);
        return styled_components_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ": ", ";"], ["", ": ", ";"])), dashCase_1.dashCase(this.property), this.mixin);
    };
    Mixin.prototype.mixin = function (cssProps) {
        this.extendProps(cssProps);
        var result = this.lookupValue();
        if (!result) {
            result = {
                key: '$',
                value: this.defaultValue
            };
        }
        return this.transform(result.value);
    };
    Mixin.prototype.transform = function (value) {
        if (typeof value === 'function') {
            return value(__assign({}, this));
        }
        return ("" + value).trim();
    };
    Mixin.prototype.extendProps = function (props) {
        var _a;
        this.props = __assign(__assign({}, ((_a = this.props) !== null && _a !== void 0 ? _a : {})), (props !== null && props !== void 0 ? props : {}));
        return this;
    };
    Mixin.prototype.toString = function (props) {
        return this.build(props);
    };
    return Mixin;
}());
exports.Mixin = Mixin;
var templateObject_1;
