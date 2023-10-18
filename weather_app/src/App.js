import React,{useState} from 'react'
import axios from "axios"

function App() {
  
  const url='https://api.openweathermap.org/data/2.5/weather?q=London&appid=372a504004e3c3442e0ae124aa141b84'
  
  return (
    <div className="App">
      <div className="Container"> 
        <div className='Upper'>
          <div className='City'>
            <p>London</p>
          </div>
          <div className="Temperature">
            <h1>60F</h1>
          </div>
          <div className="Details">
            <p>Cloudy</p>
          </div>
        </div>

        <div className='Lower'>
          <div clasName="PerceptiveTemperature">
            <p>65F</p>
          </div>
          <div className="Humidity">
            <p>20%</p>
          </div>
          <div clasName="Wind">
            <p>12 MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
