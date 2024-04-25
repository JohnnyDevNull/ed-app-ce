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
    <div className="brand" data-testid="toolbar-brand">{appConfig?.appTitle || 'App Title'}</div>
    <div className="actions" data-testid="toolbar-actions">
      {mode === ToolbarMode.DETAIL && (
        <button onClick={onBackToList} title="back to list" data-testid="toolbar-action-back">
          <i className="fa-solid fa-backward"></i>
        </button>
      )}
      {mode === ToolbarMode.LIST && isSearchEnabled() && (
        <button onClick={onToggleSearch} title="search" data-testid="toolbar-action-search">
          <i className="fa-solid fa-search"></i>
        </button>
      )}
    </div>
  </>
}

export default Toolbar;
