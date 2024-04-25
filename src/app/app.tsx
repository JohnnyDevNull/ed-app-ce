import { FunctionComponent, useContext, useEffect, useMemo, useState } from 'react';
import DrinkDetailItem from './components/DrinkDetailItem';
import DrinkListItem from './components/DrinkListItem';
import Pagination from './components/Pagination';
import Search from './components/Search';
import Toolbar, { ToolbarMode } from './components/Toolbar';
import { ConfigContext } from './context/ConfigContext';
import { IDrinkListItem } from './types/DrinkItem.interface';
import { ISearchData } from './types/SearchData.interface';
import { buildApiUrlBySearchData } from './util/buildApiUrlBySearchData';
import { calcPagerSize } from './util/calcPagerSize';

const initialSearchData: ISearchData = {
  name: '',
  ingredient: '',
  isAlcohol: false
};

const App: FunctionComponent = () => {
  const config = useContext(ConfigContext);
  const pagerSize = calcPagerSize(config?.features?.pager?.size || 10);

  const [drinksList, setDrinksList] = useState([] as IDrinkListItem[]);
  const [pagerPos, setPagerPos] = useState(0);
  const [itemId, setItemId] = useState<number | null>(null);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchData, setSearchData] = useState<ISearchData>({...initialSearchData});

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

  const onPaginationNext = useMemo( () => () => {
    setPagerPos(prevPagerPos => {
      const newPos = prevPagerPos + pagerSize;
      return (newPos < totalItemsCount) ? newPos : prevPagerPos;
    });
  }, []);

  const onPaginationPrev = useMemo(() => () => {
    setPagerPos(prevPagerPos => prevPagerPos ? prevPagerPos - pagerSize : 0);
  }, [pagerSize]);

  const onItemClick = useMemo(() => (id: number) => {
    setShowSearchBar(false);
    setItemId(id);
  }, []);

  const onBackToList = useMemo(() => () => setItemId(null), []);
  const onToggleSearch = useMemo(() => () => setShowSearchBar(prev => !prev), []);
  const onSearchChange = useMemo( () => (data: ISearchData) => setSearchData(data), []);

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
