import { FunctionComponent } from 'react';
import * as appConfig from '../../config.json';
import { isSearchEnabled } from '../util/isSearchEnabled';

export enum ToolbarMode {
  LIST,
  DETAIL
}

interface IToolbarProps {
  mode: ToolbarMode,
  onBackToList: () => void,
  onToggleSearch: () => void
}

const Toolbar: FunctionComponent<IToolbarProps> = ({ mode, onBackToList, onToggleSearch }) => {
  return <>
    <div className="brand">{appConfig?.appTitle || 'App Title'}</div>
    <div className="actions">
      {mode === ToolbarMode.LIST && (
        <button onClick={onBackToList} title="back to list">
          <i className="fa-solid fa-backward"></i>
        </button>
      )}
      {mode === ToolbarMode.DETAIL && isSearchEnabled() && (
        <button onClick={onToggleSearch} title="search">
          <i className="fa-solid fa-search"></i>
        </button>
      )}
    </div>
  </>
}

export default Toolbar;
