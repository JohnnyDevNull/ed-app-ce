import { ConfigContextType } from '../context/ConfigContext';

export function isSearchEnabled(config: ConfigContextType): boolean {
  if (config?.features?.search != null) {
    return Object.keys(config.features.search).some((key) => (config as any).features.search[key] === true);
  }
  return false;
}
