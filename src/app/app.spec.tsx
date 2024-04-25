import { render } from '@testing-library/react';

import App from './app';
import { ConfigContext, ConfigContextType } from './context/ConfigContext';

const testContext = {
  appTitle: 'Vite Test App',
  features: {
    search: {
      byName: true,
      byIngredient: true,
      isAlcohol: true
    },
    pager: {
      size: 10
    }
  }
};

const testContext2 = {
  ...testContext,
  features: {
    ...testContext.features,
    search: false
  }
};

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(getTestJsx(testContext));
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', async () => {
    const { findByText } = render(getTestJsx(testContext));
    expect(await findByText(/Vite Test App/gi)).toBeTruthy();
  });

  it('should render Toolbar', () => {
    const { getByTestId } = render(getTestJsx(testContext));
    expect(getByTestId('toolbar-brand')).toBeTruthy();
    expect(getByTestId('toolbar-actions')).toBeTruthy();
  });

  it('should not render search toggle', () => {
    const { queryByTestId } = render(getTestJsx(testContext2 as any));
    expect(queryByTestId('toolbar-action-search')).toBeNull();
    expect(queryByTestId('search-name')).toBeNull();
    expect(queryByTestId('search-ingredient')).toBeNull();
    expect(queryByTestId('search-alcohol')).toBeNull();
  });

  it('should not render Search', () => {
    const { queryByTestId } = render(getTestJsx(testContext));
    expect(queryByTestId('search-name')).toBeNull();
    expect(queryByTestId('search-ingredient')).toBeNull();
    expect(queryByTestId('search-alcohol')).toBeNull();
  });

  it('should render Search', async () => {
    const { getByTestId, findByTestId } = render(getTestJsx(testContext));
    getByTestId('toolbar-action-search').click();
    expect(await findByTestId('search-name')).toBeDefined();
    expect(await findByTestId('search-ingredient')).toBeDefined();
    expect(await findByTestId('search-alcohol')).toBeDefined();
  });

  it('should render Pagination', () => {
    const { getByTestId } = render(getTestJsx(testContext));
    expect(getByTestId('pager-info')).toBeTruthy();
    expect(getByTestId('pager-actions')).toBeTruthy();
  });
});

function getTestJsx(config: ConfigContextType): JSX.Element {
  return <ConfigContext.Provider value={config}><App /></ConfigContext.Provider>;
}