describe('styled-mixins', () => {
    it('should has defined exports', () => {
        const styledMixins = require('./');

        expect(styledMixins).toBeDefined();
        expect(styledMixins.default).not.toBeDefined();
        expect(styledMixins.Mixin).toBeDefined();
    });
});
