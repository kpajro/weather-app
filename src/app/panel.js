import { GenImage } from './genimage'


export function Panel({ city, temp, overcast, overcastimg, wind, memeimg }){
    return(
        <div className="panel">
            <section style={{height: "inherit", width: "inherit"}}>
                <div style={{height: "inherit", width: "inherit", position: "absolute", display: "flex", justifyContent: "flex-end"}}>
                    {city ? <GenImage memeimg={memeimg} /> : ""}
                </div>
                <h4 className='fade-in' style={{color: "black", textAlign: "center", fontSize: "24px"}}>{city ? "" : "Type in a city name and you will know the weather!"}</h4>
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
            </section>
        </div>
    )
}