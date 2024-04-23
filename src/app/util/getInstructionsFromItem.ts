import { IDrinkDetailItem } from '../types/DrinkItem.interface';

export function getInstructionsFromItem(item: IDrinkDetailItem): string {
  return item.strInstructions || item.strInstructionsDE || item.strInstructionsES || item.strInstructionsFR || item.strInstructionsIT;
}
