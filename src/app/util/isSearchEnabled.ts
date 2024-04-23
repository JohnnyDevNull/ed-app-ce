import * as appConfig from '../../config.json';

export function isSearchEnabled(): boolean {
  if (appConfig?.features?.search != null) {
    return Object.keys(appConfig.features.search).some((key) => (appConfig as any).features.search[key] === true);
  }
  return false;
}
