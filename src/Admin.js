// src/Admin.js
import React, { useState } from 'react';
import AvailableSlotsForm from './availableSlotsForm';
import BookedSlotsList from './bookedSlotsList';
import StatusComponent from './statusComponent';

const Admin = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [status, setStatus] = useState('ledig');

  const addSlot = (slot) => {
    setAvailableSlots([...availableSlots, slot]);
  };

  const bookSlot = (slot) => {
    setAvailableSlots(availableSlots.filter(s => s !== slot));
    setBookedSlots([...bookedSlots, slot]);
  };

  const changeStatus = () => {
    setStatus(status === 'ledig' ? 'upptagen' : 'ledig');
  };

  return (
    <div>
      <h1>Admin</h1>
      <AvailableSlotsForm addSlot={addSlot} />
      <BookedSlotsList bookedSlots={bookedSlots} />
      <StatusComponent status={status} changeStatus={changeStatus} />
    </div>
  );
};

export default Admin;
