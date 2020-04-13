import { Mixin } from "./Mixin";
declare type MixinClass = new (...args: any) => Mixin;
export declare const mixins: (...mixins: (Mixin | MixinClass)[]) => import("styled-components").FlattenInterpolation<import("styled-components").ThemeProps<any>>;
export {};
