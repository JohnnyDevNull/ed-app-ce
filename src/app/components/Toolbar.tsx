import { FunctionComponent, useContext } from 'react';
import { ConfigContext } from '../context/ConfigContext';
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
  const config = useContext(ConfigContext);
  return <>
    <div className="brand" data-testid="toolbar-brand">{config?.appTitle || 'App Title'}</div>
    <div className="actions" data-testid="toolbar-actions">
      {mode === ToolbarMode.DETAIL && (
        <button onClick={onBackToList} title="back to list" data-testid="toolbar-action-back">
          <i className="fa-solid fa-backward"></i>
        </button>
      )}
      {mode === ToolbarMode.LIST && isSearchEnabled(config) && (
        <button onClick={onToggleSearch} title="search" data-testid="toolbar-action-search">
          <i className="fa-solid fa-search"></i>
        </button>
      )}
    </div>
  </>
}

export default Toolbar;
