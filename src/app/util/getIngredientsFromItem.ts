import { IDrinkDetailItem } from '../types/DrinkItem.interface';

export function getIngredientsFromItem(item: IDrinkDetailItem): string[] {
  const ingredients: string[] = [];

  for(let i = 0; i < 10; i++) {
    const key = 'strIngredient' + (i + 1) as keyof IDrinkDetailItem;

    let newIngredient = '';
    if (item[key]) {
      newIngredient += item[key];
    }

    const measureKey = 'strMeasure' + (i + 1) as keyof IDrinkDetailItem;
    if (item[measureKey]) {
      newIngredient += ' ' + item[measureKey];
    }

    if (newIngredient.length) {
      ingredients.push(newIngredient.trim());
    }
  }

  return ingredients;
}
