import { getDynamicSubstrings, toArray, isDynamicRoute, generatePathUrl } from '../util';
import { describe, expect, test } from 'vitest';

// Quick unit tests for mvp bolt logic.
describe('util', () => {
    test('getDynamicSubstrings', () => {
        expect(getDynamicSubstrings('/foo/_bar_')).toEqual(['_bar_']);
        expect(getDynamicSubstrings('/foo/_bar_/_baz_')).toEqual(['_bar_', '_baz_']);
        expect(getDynamicSubstrings('/foo/_bar_/_baz_/qux')).toEqual(['_bar_', '_baz_']);
        expect(getDynamicSubstrings('/foo/_bar_/_baz_/qux/_quux_')).toEqual(['_bar_', '_baz_', '_quux_']);
        expect(getDynamicSubstrings('/foo/_bar_/_baz_/_qux_/_quux_/_quuz_')).toEqual(['_bar_', '_baz_', '_qux_', '_quux_', '_quuz_']);
    });

    test('toArray', () => {
        expect(toArray('foo')).toEqual(['foo']);
        expect(toArray(['foo'])).toEqual(['foo']);
        expect(toArray(['foo', 'bar'])).toEqual(['foo', 'bar']);
    })

    test('isDynamicRoute', () => {
        expect(isDynamicRoute('/foo/_bar_')).toEqual(true);
        expect(isDynamicRoute('/foo/_bar_/_baz_')).toEqual(true);
        expect(isDynamicRoute('/foo/_bar_/_baz_/qux')).toEqual(true);
        expect(isDynamicRoute('/foo/_bar_/_baz_/qux/_quux_')).toEqual(true);
        expect(isDynamicRoute('/foo/_bar_/_baz_/_qux_/_quux_/_quuz_')).toEqual(true);
        expect(isDynamicRoute('/foo/bar')).toEqual(false);
        expect(isDynamicRoute('/foo/bar/baz/_test')).toEqual(false);
    });

    test('generatePathUrl', () => {
        expect(generatePathUrl('/foo/_bar_', ['bar'], 'http://localhost:3000')).toEqual('http://localhost:3000/foo/bar');
        expect(generatePathUrl('/foo/_bar_/_baz_', ['bar', 'baz'], 'http://localhost:3000')).toEqual('http://localhost:3000/foo/bar/baz');
        expect(generatePathUrl('/foo/_bar_/_baz_/qux', ['bar', 'baz'], 'http://localhost:3000')).toEqual('http://localhost:3000/foo/bar/baz/qux');
    });

})
