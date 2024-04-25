// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useEffect, useState } from 'react';
import DrinkDetailItem from './components/DrinkDetailItem';
import DrinkListItem from './components/DrinkListItem';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Toolbar, { ToolbarMode } from './components/Toolbar';
import { IDrinkListItem } from './types/DrinkItem.interface';
import { ISearchData } from './types/SearchData.interface';
import { buildApiUrlBySearchData } from './util/buildApiUrlBySearchData';
import * as appConfig from '../config.json';
import { isSearchEnabled } from './util/isSearchEnabled';

const pagerSize = appConfig?.features?.pager?.size || 10;
const initialSearchData = {
  name: '',
  ingredient: '',
  isAlcohol: false
}

export function App() {
  const [drinksList, setDrinksList] = useState([] as IDrinkListItem[]);
  const [pagerPos, setPagerPos] = useState(0);
  const [itemId, setItemId] = useState<number | null>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchData, setSearchData] = useState<ISearchData>({...initialSearchData})
  const totalItemsCount = drinksList?.length || 0;
  const displayItems = drinksList?.slice(pagerPos, pagerPos + pagerSize) || [];

  useEffect(() => {
    fetch(buildApiUrlBySearchData(searchData))
    .then(response => response.json())
    .then(data => {
      setPagerPos(0);
      setDrinksList(data.drinks);
    })
  }, [searchData]);

  const onPaginationNext = () => {
    setPagerPos(prevPagerPos => {
      const newPos = prevPagerPos + pagerSize;
      return (newPos < totalItemsCount) ? newPos : prevPagerPos;
    });
  }

  const onPaginationPrev = () => {
    setPagerPos(prevPagerPos => prevPagerPos ? prevPagerPos - pagerSize : 0);
  }

  const onItemClick = (id: number) => {
    setShowSearchBar(false);
    setItemId(id);
  };

  const onBackToList = () => setItemId(null);
  const onToggleSearch = () => setShowSearchBar(prev => !prev);
  const onSearchChange = (data: ISearchData) => setSearchData(data);

  let content: JSX.Element | JSX.Element[];

  if (itemId) {
    content = <DrinkDetailItem itemId={itemId} />;
  } else {
    content = displayItems.map(
      (item) => <DrinkListItem key={item.idDrink} item={item} onItemClick={onItemClick} />
    )
  }

  return (
    <main className="app-main">
      <div className="main-header">
        <Toolbar
          mode={itemId ? ToolbarMode.DETAIL : ToolbarMode.LIST}
          onBackToList={onBackToList}
          onToggleSearch={onToggleSearch} />
      </div>
      {showSearchBar && (
        <div className="main-search">
          <Search data={searchData} onChange={onSearchChange} />
        </div>
      )}
      <section className="main-content">{content}</section>
      <section className="main-footer">
        {itemId == null && (
          <Pagination
            pos={pagerPos}
            step={pagerSize}
            totalItems={totalItemsCount}
            onPrev={onPaginationPrev}
            onNext={onPaginationNext} />
        )}
      </section>
    </main>
  );
}

export default App;
