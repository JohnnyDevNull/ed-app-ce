import { render } from '@testing-library/react';

import App from './app';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);
    expect(baseElement).toBeTruthy();
  });

  it('should have a greeting as the title', () => {
    const { getByText } = render(<App />);
    expect(getByText(/Drinks App CE/gi)).toBeTruthy();
  });

  it('should render Toolbar', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('toolbar-brand')).toBeTruthy();
    expect(getByTestId('toolbar-actions')).toBeTruthy();
  });

  it('should not render Search', () => {
    const { queryByTestId } = render(<App />);
    expect(queryByTestId('search-name')).toBeNull();
    expect(queryByTestId('search-ingredient')).toBeNull();
    expect(queryByTestId('search-alcohol')).toBeNull();
  });

  it('should render Search', async () => {
    const { getByTestId, findByTestId } = render(<App />);
    getByTestId('toolbar-action-search').click();
    expect(await findByTestId('search-name')).toBeDefined();
    expect(await findByTestId('search-ingredient')).toBeDefined();
    expect(await findByTestId('search-alcohol')).toBeDefined();
  });

  it('should render Pagination', () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId('pager-info')).toBeTruthy();
    expect(getByTestId('pager-actions')).toBeTruthy();
  });
});
