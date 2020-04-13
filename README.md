# Styled Mixins

### Install
Using NPM:
```bash
$ npm install --save styled-mix
```

Using Yarn:
```bash
$ yarn add styled-mix
```

### Usage

##### Simple usage
```typescript
import { Mixin } from 'styled-mix';
import styled from 'styled-components';

// With styled-mix
const Button = styled.button`
    background: #222;
    ${ new Mixin('color ', ['c', 'color'], '#fff') }
`;

// Without styled-mix
const Button = styled.button`
    background: #222;
    color: ${({ color, c }) => c || color || '#fff' };
`;

// Later on your code
<Button color={ '#fff' } />
```

##### Multiple Mixins
```typescript
import { Mixin } from 'styled-mix';
import styled from 'styled-components';

const Button = styled.button`
    background: #222;
    ${ mixins( 
        new Mixin('color ', ['c', 'color'], '#fff'),
        new Mixin('margin ', ['m', 'margin'], '6px'),
    ) }
`;

// Later on your code
<Button c={ '#fff' } m={ 12 } />
```

##### Advanced Mixins
```typescript
import { Mixin } from 'styled-mix';
import styled from 'styled-components';
import { transparentize } from 'polished';

class Color extends Mixin {
    propriety = 'color';
    lookup = 'color';
    
    constructor(private amount: number = 0.7) {}
    
    transfrom (value: any): string {
        return transparentize(this.amount, value);
    }
}

class Margin extends Mixin {
    propriety = 'margin';
    lookup = 'margin'; 
    defaultValue = 6;
    
    transfrom (value: any): string {
        if (typeof value === 'number) {
            return `${ value }px`;
        }
        
        return value;
    }
}

const Button = styled.button`
    background: #222;
    ${ mixins( new Color(0.5), Margin ) }
`;


// Later on your code
<Button color={ '#fff' } margin={ 12 } />
```

### Note
Library it's developed with typescript, as my personal projects are using typescript, 
examples refer to typescript also, so some things couldn't work same as expected.
