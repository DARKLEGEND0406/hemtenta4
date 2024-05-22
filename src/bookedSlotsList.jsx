// src/BookedSlotsList.js
import React from 'react';

const BookedSlotsList = ({ bookedSlots }) => {
  return (
    <div>
      <h2>Bokade tider</h2>
      <ul>
        {bookedSlots.map((slot) => (
          <li key={slot.id}>
            Start: {new Date(slot.start_time).toLocaleString()}, 
            End: {new Date(slot.end_time).toLocaleString()}, 
            Name: {slot.customer_name}, 
            Email: {slot.customer_email}, 
            Phone: {slot.customer_phone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookedSlotsList;
