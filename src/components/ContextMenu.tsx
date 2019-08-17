import React from 'react';

export default ((props) => {
  return (
    <div
      className="context-menu"
      style={{
        position: 'fixed',
        left: `${props.position.x}px`,
        top: `${props.position.y}px`,
      }}
    >
      {props.children}
    </div>
  );
}) as React.FC<{position: {x: number, y: number}}>
