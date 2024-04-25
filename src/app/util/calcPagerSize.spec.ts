import { calcPagerSize } from './calcPagerSize';

describe('calcPagerSize', () => {
  it('should return the default', () => {
    expect(calcPagerSize(99)).toBe(99);
  });

  it('should return the default', () => {
    vi.stubGlobal('screen', { height: 1440 });
    expect(calcPagerSize(99)).toBe(19);
  });
})
