import { FunctionComponent, useEffect, useState } from 'react';
import { IDrinkDetailItem } from '../types/DrinkItem.interface';
import { getIngredientsFromItem } from '../util/getIngredientsFromItem';
import { getInstructionsFromItem } from '../util/getInstructionsFromItem';

interface IDrinkDetailItemProps {
  itemId: number;
}

const DrinkDetailItem: FunctionComponent<IDrinkDetailItemProps> = ({ itemId }) => {
  const [itemData, setItemData] = useState<IDrinkDetailItem | null>(null);

  useEffect(() => {
    if (itemId) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${itemId}`)
        .then(response => response.json())
        .then(data => setItemData(data?.drinks?.[0] || null));
    }
  }, [itemId]);

  if (!itemData) {
    return <div>&nbsp</div>
  }

  const ingredients = getIngredientsFromItem(itemData).map(iStr => <li key={iStr}>{iStr}</li>);
  const instructions = getInstructionsFromItem(itemData);

  return <div>
    <h2>{itemData?.strDrink}</h2>
    <img src={itemData.strDrinkThumb} alt={itemData.strDrink} className="img-responsive" />
    <h3>Category:</h3>
    <p>{itemData.strCategory} / {itemData.strAlcoholic}</p>
    <h3>Glass:</h3>
    <p>{itemData.strGlass}</p>
    <h3>Instructions:</h3>
    <p>{instructions}</p>
    <h3>Ingredients:</h3>
    <ul>{ingredients}</ul>
  </div>
}

export default DrinkDetailItem;
