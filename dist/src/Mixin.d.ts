import { Properties } from 'csstype';
import { FlattenInterpolation, ThemeProps } from 'styled-components';
export declare type MixinLookupType = string | string[];
export declare type MixinPropertyType = keyof Properties;
export declare type MixinPropsType = {
    [key: string]: any;
};
export declare type MixinLookupValue = null | {
    key: string;
    value: any;
};
export declare type MixinOptions = {
    props?: MixinPropsType;
    property?: keyof Properties | string;
    lookup?: MixinLookupType;
    defaultValue?: any;
};
export declare class Mixin {
    protected props: MixinPropsType;
    protected property?: keyof Properties | string;
    protected lookup?: MixinLookupType;
    protected defaultValue: any;
    constructor(optionsOrProperty?: MixinOptions | MixinOptions['property'], lookup?: MixinOptions['lookup'], defaultValue?: MixinOptions['defaultValue']);
    lookupValue(): MixinLookupValue;
    build(props?: MixinPropsType): FlattenInterpolation<ThemeProps<any>>;
    private mixin;
    protected transform(value: any): any;
    extendProps(props?: MixinPropsType): this;
    toString(props?: MixinPropsType): FlattenInterpolation<ThemeProps<any>>;
}
