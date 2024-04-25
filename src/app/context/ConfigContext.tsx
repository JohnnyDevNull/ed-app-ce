import { Context, createContext } from 'react';

import * as appConfig from '../../config.json';

export type ConfigContextType = typeof appConfig | null;

export const ConfigContext: Context<ConfigContextType> = createContext<ConfigContextType>(null);
