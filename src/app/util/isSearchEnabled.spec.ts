import { isSearchEnabled } from './isSearchEnabled';

describe('isSearchEnabled', () => {
  it ('should return false when not configured', () => {
    expect(isSearchEnabled({ features: { search: false } } as any)).toBe(false);
    expect(isSearchEnabled({ features: { search: null } } as any)).toBe(false);
  })

  it ('should return true when at least one configured', () => {
    expect(isSearchEnabled({ features: { search: { byName: true, byIngredient: false, isAlcohol: false } } } as any)).toBe(true);
    expect(isSearchEnabled({ features: { search: { byName: false, byIngredient: true, isAlcohol: false } } } as any)).toBe(true);
    expect(isSearchEnabled({ features: { search: { byName: false, byIngredient: false, isAlcohol: true } } } as any)).toBe(true);
  })
})
