// src/Booking.js

import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Booking = () => {
  const navigate = useNavigate();
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [availableDates, setAvailableDates] = useState([]); // Nytt state för tillgängliga datum

  useEffect(() => {
    fetchUnavailableDates();
    fetchAvailableDates(); // Hämta tillgängliga datum när komponenten renderas
  }, []);

  const fetchUnavailableDates = () => {
    axios.get('/booked-slots')
      .then(response => {
        setUnavailableDates(response.data.map(slot => slot.start_time.substring(0, 10)));
      })
      .catch(error => {
        console.error('Error fetching unavailable dates:', error);
      });
  };

  const fetchAvailableDates = () => {
    axios.get('/available-slots')
      .then(response => {
        setAvailableDates(response.data.map(slot => slot.date)); // Spara tillgängliga datum i state
      })
      .catch(error => {
        console.error('Error fetching available dates:', error);
      });
  };

  const handleDateClick = (arg) => {
    const clickedDate = arg.dateStr;
    if (unavailableDates.includes(clickedDate)) {
      alert('Denna dag är upptagen. Välj en annan dag.');
    } else {
      navigate("/booking/finish", { state: { date: clickedDate } });
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      weekends={false}
      dateClick={handleDateClick}
      events={[
        ...unavailableDates.map(date => ({ start: date, allDay: true, display: 'background', color: 'red' })), // Uppdatera färg för upptagna dagar
        ...availableDates.map(date => ({ start: date, allDay: true, display: 'background', color: 'gray' })) // Lägg till färg för tillgängliga dagar
      ]}
    />
  );
};

export default Booking;
