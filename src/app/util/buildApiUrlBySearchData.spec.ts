import { expect } from 'vitest';
import { buildApiUrlBySearchData } from './buildApiUrlBySearchData';


describe('buildApiUrlBySearchData', () => {
  it('should build the name search url', () => {
    expect(buildApiUrlBySearchData({ name: 'TestName' } as any)).toBe('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=TestName');
  })

  it('should build the ingredient search url', () => {
    expect(buildApiUrlBySearchData({ ingredient: 'TestIngredient' } as any)).toBe('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=TestIngredient');
  })

  it('should build the ingredient search url', () => {
    expect(buildApiUrlBySearchData({ isAlcohol: true } as any)).toBe('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic');
  })

  it('should build the ingredient search url', () => {
    expect(buildApiUrlBySearchData({ isAlcohol: false } as any)).toBe('https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic');
  })
});
