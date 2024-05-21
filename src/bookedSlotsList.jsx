// src/BookedSlotsList.js
import React from 'react';

const BookedSlotsList = ({ bookedSlots }) => {
  return (
    <div>
      <h2>Bokade tider</h2>
      <ul>
        {bookedSlots.map((slot, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
<li key={index}>{slot}</li>
        ))}
      </ul>
    </div>
  );
};

export default BookedSlotsList;
