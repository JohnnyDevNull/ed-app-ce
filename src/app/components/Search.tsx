import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { ISearchData } from '../types/SearchData.interface';
import * as appConfig from '../../config.json';

interface ISearchProps {
  data: ISearchData
  onChange: (searchData: ISearchData) => void
}

const Search: FunctionComponent<ISearchProps> = ({ data, onChange }) => {
  const [searchData, setSeachdata] = useState<ISearchData>(data)

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
    setSeachdata(searchData);
  }

  return <>
    {appConfig.features.search.byName && (
      <div className="search-control">
        <input ref={searchName} onInput={onInputChange} type="text" className="search-input" placeholder="search by name" />
      </div>
    )}
    {appConfig.features.search.byIngredient && (
      <div className="search-control">
        <input ref={searchIngredient} onInput={onInputChange} type="text" className="search-input" placeholder="search by ingredient" />
      </div>
    )}
    {appConfig.features.search.isAlcohol && (
      <div className="search-control">
        <label className="alcohol-chk"><input ref={isAlcohol} onChange={onInputChange} type="checkbox" /> Alcoholic</label>
      </div>
    )}
  </>
}

export default Search;