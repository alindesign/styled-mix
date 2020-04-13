"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Mixin_1 = require("./Mixin");
var styled_components_1 = require("styled-components");
exports.mixins = function () {
    var mixins = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        mixins[_i] = arguments[_i];
    }
    return (styled_components_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", ""], ["",
        ""])), function (props) { return mixins.map(function (mixinDeclaration) {
        var mixin = mixinDeclaration instanceof Mixin_1.Mixin ? mixinDeclaration : new mixinDeclaration({ props: props });
        return mixin.build(props);
    }); }));
};
var templateObject_1;
