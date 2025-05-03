import { describe, it, expect } from 'vitest';
import { add } from './util';


describe('testing add()', () => {
    it('should return 3 when adding 1 and 2', () => {
        expect(add(1, 2)).toBe(3);
    });
})