import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
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
                <QRCodeComponent url="http://127.0.0.1:3000/booking" />
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


function getWeekNumber(date) {

  date = new Date(date);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));
  const yearStart = new Date(date.getFullYear(), 0, 1);
  const weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
  return weekNo;
}

export default App;
