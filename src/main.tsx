import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import App from './app/app';
import { ConfigContext } from './app/context/ConfigContext';
import * as appConfig from './config.json';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StrictMode>
    <ConfigContext.Provider value={appConfig}>
      <App />
    </ConfigContext.Provider>
  </StrictMode>
);
