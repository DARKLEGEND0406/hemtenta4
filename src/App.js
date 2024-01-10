import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Booking from './Booking';
import QRCodeComponent from './QRCodeComponent';

function App() {
  const [weather, setWeather] = useState({});
  const [date, setDate] = useState(new Date());

  
  useEffect(() => {
    // In the case that I need to update they key, I made it a variable
    const apiKey = '44a55c9774f72959d2895bcddc188f36';
    const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=59.2170&lon=17.9740&appid=${apiKey}&units=metric`;

    axios.get(weatherApiUrl)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  return (
    <div className="App">
      <h1>Bonds Infoskärm</h1>
      <img src="/bond-image.jpg" alt="Bond" />
      {/* Wrap the cards in a div with class name cards */}
      <div className="cards">
        {/* Create a card for the QR code */}
        <div className="card">
          <div className="card-content">
            <div className="card-title">Boka ett möte</div>
            <div className="card-main">
              <div className="qr-code">
                {/* Use the QRCodeComponent to generate the QR code image */}
                <QRCodeComponent url="http://192.168.0.95:3000/booking" />
              </div>
            </div>
            <div className="card-footer">Skanna QR-koden för att boka ett möte med Bond</div>
          </div>
        </div>
        {/* Create a card for the info */}
        <div className="card">
          <div className="card-content">
            <div className="card-title">Bondhon Shahriar Alam</div>
            <div className="card-main">
              <div className="info">
                <p>Titel: Biträdande Rektor</p>
                <p>Telefon: 076-108 78 89</p>
                <p>Kontaktuppgifter: Lägg kontakt uppgifterna här</p>
              </div>
            </div>
            <div className="card-footer">
              {/* Add icons for the weather and date info */}
              <div className="weather">
                <img src="./väder.png" alt="Weather icon" className="weather-icon" />
                <p>Aktuellt väder: {weather.main?.temp}°C, {weather.weather?.[0]?.description}</p>
              </div>
              <div className="date">
                <img src="./datum.png" alt="Date icon" className="date-icon" />
                <p>Aktuellt datum: {date.toLocaleDateString()}</p>
                <p>Aktuellt veckonummer: {getWeekNumber(date)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


function getWeekNumber(d) {
  // Copy date so don't modify original
  d = new Date(d);
  d.setHours(0, 0, 0, 0);
  // Set to nearest Thursday: current date + 4 - current day number
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  // Get first day of year
  const yearStart = new Date(d.getFullYear(), 0, 1);
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return weekNo;
}

export default App;
