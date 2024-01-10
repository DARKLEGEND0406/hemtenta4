import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useNavigate } from 'react-router-dom'

const Booking = () => {
    const navigate = useNavigate();
    const handleDateClick = (arg) => {
        navigate("/Booking/finish", { state: {  date:arg.dateStr}  }, {withCredentials: true});
      }
    return (
        <FullCalendar
        plugins={[ dayGridPlugin, interactionPlugin ]}
        initialView="dayGridMonth"
        weekends={false}
        dateClick = {handleDateClick}
        />
        
    )
}

export default Booking;