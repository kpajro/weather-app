import { GenImage } from './genimage'

export function Panel({ city, temp, humidity, overcast, overcastimg, wind, memeimg }){
    return(
        <>
            <h4 className='fade-in' style={{color: "black", textAlign: "center", fontSize: "24px", backgroundColor: "white"}}>{city ? "" : "Type in a city name and you will know the weather!"}</h4>
            <div className="panel">
                <div>
                    <div className="interior">
                        {city && 
                            <img className="icons" src="./plaza.png" />
                        }
                        <a>{city ? city : ''}</a>
                    </div>
                    <div className="interior">
                        <img src={overcastimg} />
                        <a>{overcast ? overcast : ''}</a>
                    </div>
                    <div className="interior">
                        { humidity && 
                            <img className="icons" src="./humidity.png" />
                        }
                        <a>{humidity ? humidity + '%' : ''}</a>
                    </div>
                    <div className="interior">
                        {wind &&
                            <img className="icons" src="./wind.png"/>
                        }
                        <a>{wind ? wind + ' kph' : ''}</a>   
                    </div>
                    <div className="interior">
                        {temp && 
                            <img className="icons" src="./temp.png" />
                        }
                        <a>{temp ? temp + ' °C' : ''}</a>
                    </div>
                </div>
                <div>
                    {city ? <GenImage memeimg={memeimg} /> : ""}
                </div>
            </div>
        </>
    )
}