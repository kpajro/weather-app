import React, { useState, useEffect, useRef } from 'react'
import { ModButton } from './modbutton'
import { Panel } from './panel'
import { SidePanel } from './forecast'
import citiesjson from './data/cities'

export function Weather(){

    //================ JsVars ==================//
    let api_key = "c02994a36ef44760839110600242607"
    let port = "7174"
    const forecastDays = 4

    //================ useStates ==================//
    const [debug, setDebug] = useState(false)
    const [forecast, setForecast] = useState([]);
    const [country, setCountry] = useState('');
    const [forecastPanel, setForecastPanel] = useState(false)
    const [imagesrc, setImagesrc] = useState('')

    const [images, setImages] = useState({
        hot:[],
        cold:[],
        rain:[],
        normal:[]
    })

    const [list, setList] = useState([]);

    //================ useRefs ==================//
    const autocompleteRef = useRef()

    const forecastSidePanelRef = useRef()

    //================ Functions ==================//
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

    function fuzzySearch(string, q){
        string = string.toLowerCase()
        q = q.toLowerCase()

        let i = 0, last = -1, curr = q[i]
        while (curr){
            if (!~(last = string.indexOf(curr, last + 1))){
                return false
            }

            curr = q[++i]
        }
        return true
    }

    function fetchData(){
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${JSON.stringify(country)}&days=${forecastDays}`, {method: "GET"})
        .then(response => response.json())
        .then(data => setForecast(data))
        .then(console.log(forecast))
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
            const filteredCities = citiesjson.cities.filter(item => fuzzySearch(item, value))
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
    
    const handleClickOutside = (event) => {
        if (!event.target.closest('.autocomplete-container')) {
            setList([]);
        }
    };

    function handleAutocomplete(){
        const divauto = autocompleteRef
        if (divauto.current.children.length > 0){
            divauto.current.style.overflow = "scroll"
        } else {
            divauto.current.style.overflow = "hidden" 
        }
    }
    // this is so bad but i don't know any other solution
    function toggleSidePanelDisplay(){
        const forecastpanel = forecastSidePanelRef.current
        if (forecastpanel.classList.contains("close-sidepanel")) {
            forecastpanel.classList.add("hidden");
        }
        forecastpanel.removeEventListener("animationend", toggleSidePanelDisplay);
    }

    const openForecastPanel = () => {
        const forecastpanel = forecastSidePanelRef.current

        if (forecastpanel.classList.contains("open-sidepanel")) {
            forecastpanel.classList.remove("open-sidepanel");
            forecastpanel.classList.add("close-sidepanel");
            forecastpanel.addEventListener("animationend", toggleSidePanelDisplay);
        } else {
            forecastpanel.classList.remove("hidden");
            forecastpanel.classList.remove("close-sidepanel");
            forecastpanel.classList.add("open-sidepanel");
        }
    }
    
    //================ useEffects ==================//
    useEffect(() =>{
        if (forecast != null){
            const temp = determineImage()
            const src = getUrl(temp?.[randomiser(temp.length)])
            setImagesrc(src)
        }
    }, [forecast])

    useEffect(() =>{
        setCountry('');
        Fetcher()
    }, [])

    useEffect(()=> {
        document.addEventListener('click', handleClickOutside);
        handleAutocomplete()
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    })

    return(
        <div style={{ display: "flex"}}>
            <div className='mainDiv'>
                <div className='endDiv'>
                    <Panel city={forecast?.location?.name} temp={forecast?.current?.temp_c} overcast={forecast?.current?.condition?.text} overcastimg={forecast?.current?.condition?.icon} wind={forecast?.current?.wind_kph}
                    memeimg={imagesrc} />
                    <ModButton _text={">"} _function={openForecastPanel} _buttonclass="button-forecastsidepanel" _title={"Forecast Side Panel"} _divstyle={{display: "flex", flexDirection: "column", justifyContent: "center"}}/>
                </div>
                <div className='input-box'>
                    <input className="inputfield" placeholder='ex. Warsaw, Beijing, Tokyo' type="text" onChange={InputChange} value={country}></input>
                    <div className='autocomplete-container' id="autocomplete" ref={autocompleteRef}>
                        {list.map((item, key) =>(
                            <div key={key} onClick={() => ItemResponder(item)}>
                                {item}
                            </div>
                        ))}
                    </div>
                    <ModButton _text={"Confirm"} _function={fetchData}/>
                    {/*{debug && <>
                        <FetchButton name={"showForecast"} fetchData={showForecast} keys={Debug}/>
                        <FetchButton name={"test Function"} fetchData={testFunction} />
                    }
                    </>*/}
                </div>
            </div>
            <SidePanel ref={forecastSidePanelRef}/>
        </div>
    )
}