import React,{useState,useEffect} from 'react'
import axios from 'axios'

function App() {

  const[data,setData]=useState({});
  const[location,setLocation]=useState("");

  useEffect(() => {
    console.log('Data:', data);
  }, [data]);
  const apiKey='372a504004e3c3442e0ae124aa141b84';

  const search=(event)=>{
    if (event.key==='Enter'){
      //GEOLOCation API, takes user inputed city and can give LAT and LONG Cords
      //const url=`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=372a504004e3c3442e0ae124aa141b84`;

      console.log('Location',location);
      console.log('API Key:',apiKey);

      //ACtual Weather API, Needs Lat and Long values to get WEather instead of city name

      // CURRENT OBJECVTIVE Find out how to link APIs. GET LAT/LON Values and INSERT into The URL and Get New data for it 
      const url=`https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=372a504004e3c3442e0ae124aa141b84`

    
    
    
      
      
      axios.get(url).then(response=>{
        setData(response.data);
        console.log('Response:',response.data)
        
      })
      console.log('URL:',url);
      
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
      <div className="Container"> 
        <div className='Upper'>
          <div className='City'>
            <p>{data.name}</p>
          </div>
          <div className="Temperature">
            <h1>60F</h1>
          </div>
          <div className="Details">
            <p>Cloudy</p>
          </div>
        </div>

        <div className='Lower'>
          <div className="PerceptiveTemperature">
            <p>Feels Like</p>
            <p className='Bold'>65F</p>
          </div>
          <div className="Humidity">
            <p>Humidity</p>
            <p className='Bold'>20%</p>
          </div>
          <div className="Wind">
            <p>Wind Speed</p>
            <p className='Bold'>12 MPH</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
