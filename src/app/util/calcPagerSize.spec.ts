import { calcPagerSize } from './calcPagerSize';

describe('calcPagerSize', () => {
  it('should return the default', () => {
    vi.stubGlobal('innerHeight', 0);
    expect(calcPagerSize(99)).toBe(99);
  });

  it('should return the default', () => {
    vi.stubGlobal('innerHeight', 1440);
    expect(calcPagerSize(99)).toBe(20);
  });
})
