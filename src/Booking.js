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

    useEffect(() => {
        // Ett exemepel på hur det ser ut i websidan
        setUnavailableDates([
            '2024-05-23',
            '2024-05-24'
        ]);
    }, []);

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
            events={unavailableDates.map(date => ({ start: date, allDay: true, display: 'background', color: 'red' }))}
        />
    );
};

export default Booking;
