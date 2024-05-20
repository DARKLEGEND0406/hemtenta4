import React from 'react'
import axios from 'axios'
import { useState } from 'react'

const Finish = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        email: '',
        phone: '',
        date: window.history.state.usr.date,
    })

    console.log(window.history.state)

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }


    const handleSubmit = (event) => {
        event.preventDefault();
          axios.post('/booking/finish', formData )
    }


  return (
    <div>
      <form action="" method='post' onSubmit={handleSubmit}>
        <label htmlFor="FirstName">Name</label>
        <input type="text" name='FirstName' id='FirstName' onChange={handleChange}/>
        <label htmlFor="LastName">Last name</label>
        <input type="text" name='LastName' id='LastName'onChange={handleChange} />
        <label htmlFor="email">Email</label>
        <input type="email" name='email' id='email' onChange={handleChange}/>
        <label htmlFor="phone">Phone</label>
        <input type="text" name='phone' id='phone' onChange={handleChange}/>        
        <input type="submit" value="Book Time" />
      </form>
    </div>
  )
}

export default Finish
