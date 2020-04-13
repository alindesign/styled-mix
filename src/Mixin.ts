import { Properties, } from 'csstype';
import { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { castArray } from './utils/castArray';
import { nonNullableArray } from './utils/nonNullableArray';
import { dashCase } from './utils/dashCase';

export type MixinLookupType = string | string[];
export type MixinPropertyType = keyof Properties;

export type MixinPropsType = { [ key: string ]: any; };

export type MixinLookupValue = null | { key: string; value: any; };

export type MixinOptions = {
    props?: MixinPropsType;
    property?: keyof Properties | string;
    lookup?: MixinLookupType;
    defaultValue?: any;
};

export class Mixin {
    protected props: MixinPropsType = {};
    protected property?: keyof Properties | string;
    protected lookup?: MixinLookupType;
    protected defaultValue: any = null;

    public constructor( optionsOrProperty?: MixinOptions | MixinOptions[ 'property' ], lookup?: MixinOptions[ 'lookup' ], defaultValue?: MixinOptions[ 'defaultValue' ] ) {
        let options: MixinOptions = {};

        if ( optionsOrProperty ) {
            if ( typeof optionsOrProperty !== 'string' ) {
                options = optionsOrProperty;
            } else {
                options.property = optionsOrProperty;
                options.lookup = lookup;
                options.defaultValue = defaultValue;
            }
        }

        this.props = options.props ?? {};
        this.property = options.property ?? this.property;
        this.lookup = options.lookup ?? this.lookup;
        this.defaultValue = options.defaultValue ?? this.defaultValue;

        this.mixin = this.mixin.bind( this );
    }


    public lookupValue (): MixinLookupValue {
        const lookup = nonNullableArray<string>( castArray( this.lookup ).map( ( prop ) => {
            if ( prop ) {
                return prop.replace( '@', this.property );
            }

            return prop;
        } ) );

        if ( lookup.length === 0 ) {
            return null;
        }

        const result = lookup.find( ( lookupProp: string ) => ( !!this.props[ lookupProp ] || this.props[ lookupProp ] === 0 ) );

        if ( !result ) {
            return null;
        }

        return {
            key: result,
            value: this.props[ result ]
        };
    }

    public build ( props?: MixinPropsType ): FlattenInterpolation<ThemeProps<any>> {
        this.extendProps( props );

        return css`${ dashCase( this.property ) }: ${ this.mixin };`;
    }

    private mixin ( cssProps: any ) {

        this.extendProps( cssProps );

        let result = this.lookupValue();
        if ( !result ) {
            result = {
                key: '$',
                value: this.defaultValue
            };
        }

        return this.transform( result.value );
    }

    protected transform ( value: any ): any {
        if ( typeof value === 'function' ) {
            return value( { ...this } );
        }

        return `${ value }`.trim();
    }

    public extendProps ( props?: MixinPropsType ) {
        this.props = { ...( this.props ?? {} ), ...( props ?? {} ) };
        return this;
    }

    toString ( props?: MixinPropsType ) {
        return this.build( props );
    }
}
