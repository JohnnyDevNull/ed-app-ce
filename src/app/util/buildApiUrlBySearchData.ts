import { ISearchData } from '../types/SearchData.interface';

export function buildApiUrlBySearchData(data: ISearchData): string {
  let url = 'https://www.thecocktaildb.com/api/json/v1/1/';

  if (data?.name?.length) {
    url += `search.php?s=${data.name}`
  } else if (data?.ingredient?.length) {
    url += `filter.php?i=${data.ingredient}`
  } else if (data?.isAlcohol) {
    url += 'filter.php?a=Alcoholic';
  } else {
    url += 'filter.php?a=Non_Alcoholic';
  }

  return url;
}
