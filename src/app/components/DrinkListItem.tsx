import { FunctionComponent } from 'react';
import { IDrinkListItem } from '../types/DrinkItem.interface';

interface IDrinkListItemProps {
  item: IDrinkListItem;
  onItemClick: (id: number) => void;
}

const DrinkListItem: FunctionComponent<IDrinkListItemProps> = ({ item, onItemClick }) => {
  return <div className="drink-list-item" data-testid="drink-list-item" onClick={() => onItemClick(item.idDrink)}>
    <img className="item-thumb" src={item.strDrinkThumb} alt={item.strDrink} />
    <div className="item-text">{item.strDrink}</div>
  </div>
}

export default DrinkListItem;
