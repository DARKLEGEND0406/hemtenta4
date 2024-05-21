// src/AvailableSlotsForm.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AvailableSlotsForm = ({ addSlot }) => {
  const [slot, setSlot] = useState(new Date());

  const handleSubmit = (e) => {
    e.preventDefault();
    if (slot) {
      addSlot(slot.toISOString()); // Konverterar datumet till ISO-format
      setSlot(new Date()); // Återställ datumet till dagens datum efter att det har lagts till
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Lägg till ledig tid:
        <DatePicker
          selected={slot}
          onChange={(date) => setSlot(date)}
          showTimeSelect
          dateFormat="Pp"
        />
      </label>
      <button type="submit">Lägg till</button>
    </form>
  );
};

export default AvailableSlotsForm;
