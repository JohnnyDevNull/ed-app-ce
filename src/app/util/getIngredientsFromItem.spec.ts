import { IDrinkDetailItem } from '../types/DrinkItem.interface';
import { getIngredientsFromItem } from './getIngredientsFromItem';


describe('getIngredientsFromItem', () => {
  it ('should build the ingredients array', () => {
    expect(getIngredientsFromItem({
      strIngredient1: "ing 1a",
      strIngredient2: "ing 2b",
      strIngredient3: "ing 3c",
      strIngredient4: "",
      strIngredient5: "",
      strMeasure1: "mea 1d",
      strMeasure2: "mea 2e",
      strMeasure3: "mea 3f",
      strMeasure4: "",
      strMeasure5: "",
    } as IDrinkDetailItem)).toStrictEqual(['ing 1a mea 1d', 'ing 2b mea 2e', 'ing 3c mea 3f']);
  })
})
