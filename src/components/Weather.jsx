import React, { useEffect, useRef, useState } from 'react'
import'./Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import clouds_icon from '../assets/clouds.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/mist.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'





function Weather() {
    let [weatherData, setweatherData]=useState(false)
    //let key="05b67396c28065664d739f0754" // dont hardcore API key into source code
    let city;
    const allicons={

         "01d" : clear_icon , 
         "01n" : clear_icon ,
         "02d" :clouds_icon,
         "02n" : clouds_icon,
         "03d" : clouds_icon,
         "03n" : clouds_icon ,
         "04d" : drizzle_icon ,
         "04n" : drizzle_icon,
         "09d" : rain_icon ,
         "09n" : rain_icon ,
         "10d" : rain_icon ,
         "10n" : rain_icon ,
         "13d" : snow_icon,
         "13n" : snow_icon,


    }
   
    const searchRef=useRef();
    async function search(city)
    {  
        if(city=="")
           { alert("pls enter city name")
              return;
           }
        try{
            let response= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metricx&appid=${import.meta.env.VITE_key}`)
                         let data= await response.json()
                         if(!response.ok)
                         {
                            alert(data.message)
                         }
            
         
            const icon=allicons[data.weather[0].icon] || clear_icon;
               
         setweatherData(
            {
                humidity :data.main.humidity,
                windspeed: data.wind.speed,
                temperature : Math.floor(data.main.temp),
                location :data.name,
                icon : icon
            }


         )

        }
    
        catch{
            setweatherData(false)
            console.log("reqest not sent")
        }

      
    }
useEffect(()=>{ search("delhi");},[city ])
   
  return (
    <div className='weather'>
       <div className='searchbar'>
            <input type="text"  placeholder='seacrh' spellCheck="false" ref={searchRef}/>
            <img src={search_icon} onClick={()=>{search(searchRef.current.value)}}/>
       </div>
       {weatherData?<>
        <img src={weatherData.icon} className='weather_icon'/>
       <p className='temperature'>{weatherData.temperature/10} °C</p>
       <p className='location'>{weatherData.location}</p>
       <div className='weatherData'>
            <div className='col'>
                <img src={wind_icon}/>
                <div>
                    <p> {weatherData.windspeed} Km/h </p>
                    <span>Wind speed  </span>
                </div>
            </div>
            <div className='col'>
                <img src={humidity_icon}/>
                <div>
                   <p> {weatherData.humidity}% </p>
                    <span>Humidity </span>
               
                </div>
            </div>
       </div></>:<></>}
      
    </div>
  )
}

export default Weather
