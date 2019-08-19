import React, { useState } from 'react';
import ContextMenu from './ContextMenu';
import './PaneSplitter.scss';
const PaneSplitter: React.FC = (props) => {
  const [paneDir, setPaneDir] = useState<'row'|'column'>('column');
  const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
  const [menuHidden, setMenuHidden] = useState(true);
  const [content, setContent] = useState(props.children);

  function showContextMenu(e: React.MouseEvent){
    e.preventDefault();
    e.stopPropagation();
    setMenuPosition({x: e.clientX, y: e.clientY});
    setMenuHidden(false);
  }

  function split(direction: 'row'|'column'){
    setMenuHidden(true);
    console.log('Splitting', direction);
    setPaneDir(direction);
    setContent([<PaneSplitter key="first">{content}</PaneSplitter>, <PaneSplitter key="second"></PaneSplitter>]);
  }

  function chooseContent(){
    setMenuHidden(true);
    setContent(<h1>CONTENT!</h1>);
  }

  return (
    <>
      <div
        className="pane"
        style={{
          display: 'flex',
          flexDirection: paneDir,
          width: '100%',
          height: '100%',
          borderRight:  !Array.isArray(content) ? '1px solid darkgrey' : 'none',
          borderBottom: !Array.isArray(content) ? '1px solid darkgrey' : 'none',
          boxSizing: 'border-box'
        }}
        onContextMenu={showContextMenu}
        onClick={() => setMenuHidden(true)}
      >
        {content}
      </div>
      {!menuHidden &&
        <ContextMenu position={menuPosition}>
          <ul className="context-menu">
            <li onClick={chooseContent}>Choose content...</li>
            <li onClick={() => split('column')}>Split horizontally</li>
            <li onClick={() => split('row')}>Split vertically</li>
          </ul>
        </ContextMenu>
      }
    </>
  );
}

export default PaneSplitter;
