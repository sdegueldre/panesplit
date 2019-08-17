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
    console.log(e.clientX, e.clientY);
    setMenuPosition({x: e.clientX, y: e.clientY});
    setMenuHidden(false);
  }

  function split(direction: 'row'|'column'){
    setMenuHidden(true);
    console.log('Splitting', direction);
    setPaneDir(direction);
    setContent([<PaneSplitter>{content}</PaneSplitter>, <PaneSplitter></PaneSplitter>]);
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
          border: '1px solid darkgrey',
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
