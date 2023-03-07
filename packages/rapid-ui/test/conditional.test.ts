import { expect, it, describe } from 'vitest';
import { styles } from '../src';

describe('conditional', () => {
    it('should work with a condtional arg', () => {
        expect(styles(true && 'red')).toBe('red');
        expect(styles(false && 'red')).toBe('');
    });
    it('should work with a conditional object', () => {
        expect(styles({ condition: true, classNames: 'red' })).toBe('red');
        expect(styles({ condition: false, classNames: 'red' })).toBe('');
    })
});
