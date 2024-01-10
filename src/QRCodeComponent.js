import React from 'react';
import QRCode from 'react-qr-code';

const QRCodeComponent = ({ url }) => {
  return (
    <div>
      <QRCode value={url} />
    </div>
  );
};

export default QRCodeComponent;
