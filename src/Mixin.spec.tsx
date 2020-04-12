import styled from 'styled-components'
import renderer from 'react-test-renderer';
import 'jest-styled-components'

import { Mixin } from "./Mixin";
import React from 'react';
import { mixins } from './mixins';

describe('styled-mixins', () => {
    describe('Mixin', () => {
        it('should correctly lookup for the properties list', () => {
            const opts = {
                property: 'color',
                lookup: ['a', 'b', 'c', 'd', 'e']
            };

            const mix = new Mixin(opts);
            mix.extendProps({ c: 3 });

            expect(mix.lookupValue()).not.toBeNull();
            expect(mix.lookupValue()).toMatchObject({ key: 'c', value: 3 });

            const mix2 = new Mixin(opts);
            mix2.extendProps({ a: undefined, b: null, c: '', d: 0, e: 1 });

            expect(mix2.lookupValue()).not.toBeNull();
            expect(mix2.lookupValue()).toMatchObject({ key: 'd', value: 0 });

            const mix3 = new Mixin(opts);

            expect(mix3.lookupValue()).toBeNull();
        });

        it('should correctly render a simple color mixin', () => {
            const colorMixin = new Mixin({ property: 'color', lookup: ['c', 'color'], defaultValue: '#222' });
            const Button = styled.button<any>`${ mixins(colorMixin) }`;

            const tree1 = renderer.create(<Button />).toJSON()
            expect(tree1).toHaveStyleRule('color', '#222');

            const tree2 = renderer.create(<Button color={'#fff'} />).toJSON()
            expect(tree2).toHaveStyleRule('color', '#fff');

            const tree3 = renderer.create(<Button c={'#333'} />).toJSON()
            expect(tree3).toHaveStyleRule('color', '#333');
        });


        it('should correctly render advanced mixin', () => {
            class MyMixin extends Mixin {
                protected property = 'color';
                protected lookup = ['c', 'color'];
            }

            class MarginMixin extends Mixin {
                protected property = 'margin';
                protected lookup = ['m', 'margin'];

                transform(value: any) {
                    if (typeof value === "number") {
                        return `${value}px`;
                    }

                    return value;
                }
            }

            const Button = styled.button<any>`${mixins(MyMixin, MarginMixin)}`;

            const tree1 = renderer.create(<Button />).toJSON()
            expect(tree1).toMatchSnapshot();

            expect(tree1).not.toHaveStyleRule('color');
            expect(tree1).not.toHaveStyleRule('margin');

            const tree2 = renderer.create(<Button color={'#fff'} />).toJSON()
            expect(tree2).toHaveStyleRule('color', '#fff');

            const tree3 = renderer.create(<Button c={'#333'} />).toJSON()
            expect(tree3).toHaveStyleRule('color', '#333');

            const tree4 = renderer.create(<Button margin={8} />).toJSON()
            expect(tree4).toHaveStyleRule('margin', '8px');

            const tree5 = renderer.create(<Button margin={'8px'} />).toJSON()
            expect(tree5).toHaveStyleRule('margin', '8px');

            const tree6 = renderer.create(<Button m={8} />).toJSON()
            expect(tree6).toHaveStyleRule('margin', '8px');

            const tree7 = renderer.create(<Button m={'8px'} />).toJSON()
            expect(tree7).toHaveStyleRule('margin', '8px');
        });
    });
});
