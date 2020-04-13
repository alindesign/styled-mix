describe( 'styled-mixins', () => {
    describe( 'misc', () => {
        it( 'should has find item and stop', () => {
            const search = jest.fn( ( item ) => item === 4 );
            const list = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
            const result = list.find( search );

            expect( result ).toBeDefined();
            expect( result ).toEqual( 4 );
            expect( search ).toBeCalledTimes( 4 );
        } );
    } );

} );
