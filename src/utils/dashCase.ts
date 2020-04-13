export const dashCase = ( value: any, isCSS: boolean = true ) => {
    value = `${ value ?? '' }`;
    value = value.trim();
    value = value.replace( /[A-Z\s]/g, ( v: any ) => `-${ `${ v }`.toString().trim().toLowerCase() }` );

    const segments = value.split( '-' ).filter( ( seg: string, index: number ) => index === 0 || !!seg ).join( '-' );
    value = segments;

    if ( /^-(web|moz|o|ms)/.test( value ) && isCSS ) {
        return `-${ value }`;
    }

    return value;
};
