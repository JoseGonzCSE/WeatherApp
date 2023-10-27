import React,{useState,useEffect} from 'react'
import axios from 'axios'

function App() {

  const[data,setData]=useState({});
  const[weatherData,setWeatherData]=useState({});
  const[location,setLocation]=useState("");

  useEffect(() => {
    console.log('Data:', data);
  }, [data]);
  const apiKey='372a504004e3c3442e0ae124aa141b84';
  const [errorMessage, setErrorMessage] = useState('');

  const search=(event)=>{
    if (event.key==='Enter'){
      //GEOLOCation API, takes user inputed city and can give LAT and LONG Cords
      const geoUrl=`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${apiKey}`;

      console.log('Location',location);
      console.log('API Key:',apiKey);

      //ACtual Weather API, Needs Lat and Long values to get WEather instead of city name

      // CURRENT OBJECVTIVE Find out how to link APIs. GET LAT/LON Values and INSERT into The URL and Get New data for it 
      

      axios.get(geoUrl).then(response=>{
        const{lat,lon}=response.data[0]
        //setData(response.data);
        console.log('Response:',response.data)

        const weatherUrl=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=372a504004e3c3442e0ae124aa141b84`
        axios.get(weatherUrl).then(weatherResponse=>{
          setWeatherData(weatherResponse.data);
          console.log('Weather Response:',weatherResponse.data)
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
            {weatherData.main ? <h1>{weatherData.main.temp}°C</h1>:null }
          </div>
          <div className="Details">
            {weatherData.main ? <p>{weatherData.weather[0].main}</p>:null}
          </div>
        </div>        
        
        {weatherData.name !=undefined &&
          <div className='Lower'>
            <div className="PerceptiveTemperature">
                <p>Feels Like</p>
                {weatherData.main ? <p className='Bold'>{weatherData.main.feels_like}°C</p>:null}
            </div>
            <div className="Humidity">
              <p>Humidity</p>
              {weatherData.main ? <p className='Bold'>{weatherData.main.humidity}%</p>:null}
            </div>
            <div className="Wind">
              <p>Wind Speed</p>
              {weatherData.main ? <p className='Bold'>{weatherData.wind.speed} m/s</p>:null}
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
