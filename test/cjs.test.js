import src from '../src';
import cjs from '../src/cjs';

describe('CJS', () => {
  it('should exported loader', () => {
    expect(cjs).toEqual(src);
  });
});
