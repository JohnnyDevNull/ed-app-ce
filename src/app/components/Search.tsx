import { FunctionComponent, useContext, useEffect, useRef, useState } from 'react';
import { ConfigContext } from '../context/ConfigContext';
import { ISearchData } from '../types/SearchData.interface';

interface ISearchProps {
  data: ISearchData
  onChange: (searchData: ISearchData) => void
}

const Search: FunctionComponent<ISearchProps> = ({ data, onChange }) => {
  const config = useContext(ConfigContext);
  const [searchData, setSearchData] = useState<ISearchData>(data)

  useEffect(() => {
    const handler = setTimeout(() => onChange(searchData), 500);
    return () => clearTimeout(handler);
  }, [searchData, onChange]);

  const searchName = useRef<HTMLInputElement>(null);
  const searchIngredient = useRef<HTMLInputElement>(null);
  const isAlcohol = useRef<HTMLInputElement>(null);

  const onInputChange = () => {
    const searchData: ISearchData = {
      name: searchName?.current?.value || '',
      ingredient: searchIngredient?.current?.value || '',
      isAlcohol: isAlcohol?.current?.checked || false
    };
    setSearchData(searchData);
  }

  return <>
    {config?.features.search.byName && (
      <div className="search-control" data-testid="search-name">
        <input
          value={searchData.name}
          ref={searchName}
          onInput={onInputChange}
          type="text"
          className="search-input"
          placeholder="search by name"
          disabled={searchData.ingredient.length > 0}
        />
      </div>
    )}
    {config?.features.search.byIngredient && (
      <div className="search-control" data-testid="search-ingredient">
        <input
          value={searchData.ingredient}
          ref={searchIngredient}
          onInput={onInputChange}
          type="text"
          className="search-input"
          placeholder="filter by ingredient"
          disabled={searchData.name.length > 0}
        />
      </div>
    )}
    {config?.features.search.isAlcohol && (
      <div className="search-control" data-testid="search-alcohol">
        <label className="alcohol-chk">
          <input
            checked={searchData.isAlcohol}
            ref={isAlcohol}
            onChange={onInputChange}
            type="checkbox"
            disabled={searchData.name.length > 0 || searchData.ingredient.length > 0}
          /> Alcoholic
        </label>
      </div>
    )}
  </>
}

export default Search;
