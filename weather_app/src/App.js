import React,{useState} from 'react'
import axios from 'axios'

function App() {

  const[data,setData]=useState({});
  const[weatherData,setWeatherData]=useState({});
  const[location,setLocation]=useState("");
  const apiKey='372a504004e3c3442e0ae124aa141b84';
  const [errorMessage, setErrorMessage] = useState('');

  const search=(event)=>{
    if (event.key==='Enter'){
      //GEOLOCation API, takes user inputed city and can give LAT and LONG Cords
      const geoUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;
      // CURRENT OBJECVTIVE Add dynamic Weather ICon, Bonus if its a bit animated 
      // CSS Animation time! 
      

      axios.get(geoUrl).then(response=>{
        const{lat,lon}=response.data[0]
      //ACtual Weather API, Needs Lat and Long values to get WEather instead of city name
        const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=372a504004e3c3442e0ae124aa141b84`
       
        axios.get(weatherUrl).then(weatherResponse=>{
          setWeatherData(weatherResponse.data);
          //delete when done
          console.log('Weather Response:',weatherResponse.data)
          setErrorMessage('')
        })
        .catch((weatherError) => {
          console.error('Weather API Error:', weatherError);
          setErrorMessage('Please input a valid city name.');
        });
      })
      .catch((geoError) => {
        console.error('Geolocation API Error:', geoError);
        setErrorMessage('Please input a valid city name.');
      });
    }
  }

  return (
    <div className="App">
      <div className='Search'>
        <input 
        value={location}
        onChange={event =>setLocation(event.target.value)}
        onKeyPress={search}
        placeholder='Enter a City'
        type="text"/>
      </div>
      {errorMessage && <div className="ErrorMessage">{errorMessage}</div>}
      <div className="Container"> 
        <div className='Upper'>
          <div className='City'>
            <p>{weatherData.name}</p>
            
          </div>
          <div className="Temperature">
            {weatherData.main ? <h1>{weatherData.main.temp.toFixed()}°C</h1>:null }
            <div className="WeatherIcon">
              {weatherData.main ? <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}></img>:null}
            </div>
            
          </div>
          <div className="Details">
            {weatherData.main ? <p>{weatherData.weather[0].main}</p>:null}
          </div>
        </div>        
        {weatherData.name !==undefined &&
          <div className='Lower'>
            <div className="PerceptiveTemperature">
                <p>Feels Like</p>
                {weatherData.main ? <p className='Bold'>{weatherData.main.feels_like.toFixed()}°C</p>:null}
            </div>
            <div className="Humidity">
              <p>Humidity</p>
              {weatherData.main ? <p className='Bold'>{weatherData.main.humidity.toFixed()}%</p>:null}
            </div>
            <div className="Wind">
              <p>Wind Speed</p>
              {weatherData.main ? <p className='Bold'>{weatherData.wind.speed.toFixed()} m/s</p>:null}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
