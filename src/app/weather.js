import React, { useState, useEffect, useRef } from 'react'
import { FetchButton } from './fetchButton'
import { Panel } from './panel'
import citiesjson from './data/cities'

export function Weather(){

    let api_key = "c02994a36ef44760839110600242607"
    let port = "7174"

    const [debug, setDebug] = useState(false)
    const [forecast, setForecast] = useState([]);
    const [country, setCountry] = useState('');

    const [imagesrc, setImagesrc] = useState('')

    const [images, setImages] = useState({
        hot:[],
        cold:[],
        rain:[],
        normal:[]
    })

    const [list, setList] = useState([]);

    const randomiser = (max) =>{
        return Math.floor(Math.random() * max)
    }

    const playAnimation = () =>{
        
    } 

    const fetchHot = async ()=>{
        await fetch(`https://api-weather-app-eight.vercel.app/api/hot`, {method: "GET"})
        .then(response => response.json())
        .then(data => setImages((prev)=>({
            ...prev,
            hot: [...prev.hot, data]
        })))
        .catch((err) =>{
            console.error(err.message)
        })
    }

    const fetchCold = async ()=>{
        await fetch(`https://api-weather-app-eight.vercel.app/api/cold`, {method: "GET"})
        .then(response => response.json())
        .then(data => setImages((prev)=>({
            ...prev,
            cold: [...prev.cold, data]
        })))
        .catch((err) =>{
            console.error(err.message)
        })
    }

    const fetchRainy = async ()=>{
        await fetch(`https://api-weather-app-eight.vercel.app/api/rain`, {method: "GET"})
        .then(response => response.json())
        .then(data => setImages((prev)=>({
            ...prev,
            rain: [...prev.rain, data]
        })))
        .catch((err) =>{
            console.error(err.message)
        })
    }

    const fetchNormal = async () =>{
        await fetch(`https://api-weather-app-eight.vercel.app/api/normal`, {method: "GET"})
        .then(response => response.json())
        .then(data => setImages((prev) =>({
            ...prev,
            normal:[...prev.normal, data]
        })))
        .catch((err) =>{
            console.error(err.message)
        })
    }

    function getUrl(img){
        const type = imageType(img)
        const url = `https://api-weather-app-eight.vercel.app/api/${type}/${img?.filename}`
        //console.log(url, type, img?.filename)
        return url
    }

    function imageType(img){
        if(img?.filename.toLowerCase().includes("h")){
            return "hot"
        }
        if(img?.filename.toLowerCase().includes("n")){
            return "normal"
        }
        if(img?.filename.toLowerCase().includes("c")){
            return "cold"
        }
        if(img?.filename.toLowerCase().includes("r")){
            return "rain"
        }
    }

    function fetchData(){
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${JSON.stringify(country)}`, {method: "GET"})
        .then(response => response.json())
        .then(data => setForecast(data))
        .catch((err) => {
            console.error(err.message)
        });
    }
    
    function Fetcher(){
        fetchHot()
        fetchCold()
        fetchRainy()
        fetchNormal()
    }
    
    const InputChange = (event)=>{
        const value = event.target.value;
        setCountry(value);
        if(value){
            const filteredCities = citiesjson.cities.filter(item =>
                item.toLowerCase().includes(value.toLowerCase())
            );
            setList(filteredCities)
        } else {
            setList([])
        }
    }

    const ItemResponder = (item)=>{
        setCountry(item);
        setList([]);
    }

    function determineImage(){
        const temp = forecast?.current?.temp_c
        const rainy = forecast?.forecast?.forecastday[0]?.day?.daily_will_it_rain
        if (rainy){
            return images.rain[randomiser(images.rain.length)]
        }
        if (temp < 8.0){
            return images.cold[randomiser(images.cold.length)]
        } else if (temp >= 26.0){
            return images.hot[randomiser(images.hot.length)]
        } else {
            return images.normal[randomiser(images.normal.length)]
        }
    }
    /*
    const Debug = (e) =>{
        if (e.key == "e"){
            console.log("pressed")
            setDebug(pdebug => !pdebug)
        }
    }
    */
    useEffect(() =>{
        if (forecast != null){
            const temp = determineImage()
            const src = getUrl(temp?.[randomiser(temp.length)])
            setImagesrc(src)
            //console.log(src)
        }
    }, [forecast])

    useEffect(() =>{
        setCountry('');
        Fetcher()
        /*window.addEventListener("keydown", Debug)
        return () =>{
            window.removeEventListener("keydown", Debug)
        }*/
    }, [])

    function showForecast(){
        console.log(forecast)
        console.log(forecast?.location?.name)
        console.log(imagesrc)
    }

    function testFunction(){
        const temp = determineImage()
        getUrl(temp?.[randomiser(temp.length)])
    }

    return(
        <div>
            <div className='mainDiv'>
                <div className='endDiv'>
                    <Panel city={forecast?.location?.name} temp={forecast?.current?.temp_c} overcast={forecast?.current?.condition?.text} overcastimg={forecast?.current?.condition?.icon} wind={forecast?.current?.wind_kph}
                    memeimg={imagesrc} />
                </div>
                <div className='input-box'>
                    <input className="inputfield" type="text" onChange={InputChange} value={country}></input>
                    {list.map((item, key) =>(
                        <div key={key} onClick={() => ItemResponder(item)}>
                            {item}
                        </div>
                    ))}
                    <FetchButton name={"Confirm"} fetchData={fetchData}/>
                    {/*{debug && <>
                        <FetchButton name={"showForecast"} fetchData={showForecast} keys={Debug}/>
                        <FetchButton name={"test Function"} fetchData={testFunction} />
                    }
                    </>*/}
                </div>
            </div>
        </div>
    )
}