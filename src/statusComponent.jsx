// src/StatusComponent.js
import React from 'react';

const StatusComponent = ({ status, changeStatus }) => {
  return (
    <div>
      <h2>Status: {status}</h2>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={changeStatus}>
        {status === 'ledig' ? 'Ändra till upptagen' : 'Ändra till ledig'}
      </button>
    </div>
  );
};

export default StatusComponent;
