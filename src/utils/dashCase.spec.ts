import { dashCase } from "./dashCase";

describe('styled-mixins', () => {
    describe('dashCase', () => {
        it('should correctly convert cases', () => {
            expect(dashCase('')).toEqual('');
            expect(dashCase('123')).toEqual('123');
            expect(dashCase(123)).toEqual('123');
            expect(dashCase(null)).toEqual('');
            expect(dashCase(undefined)).toEqual('');

            expect(dashCase('textAlign')).toEqual('text-align');
            expect(dashCase('text Align')).toEqual('text-align');
            expect(dashCase('text    Align')).toEqual('text-align');

            expect(dashCase('MozTextAlign')).toEqual('--moz-text-align');
        })
    })
});
