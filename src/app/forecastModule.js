import React, { useState, useEffect, useInsertionEffect } from 'react'
import GraphsModule from './graphsModule'

export function ForecastModule({_list = []}){
    const [list, setList] = useState([])
    const [selected, setSelected] = useState(null)
    const getSelected = (param) =>{
        setSelected(param)
    }
    useEffect(()=>{
        setList(_list)
    }, [_list])
    return (
        <section>
            <div className="forecast-module">
                <div className='forecast-module-information'>
                {
                    selected && (<>
                        <div className='forecast-module-information-disposition forecast-module-information-border'>
                            <img className="icons" src={selected.day.condition.icon}/>
                            <p>{selected.day.condition.text}</p>
                        </div>
                        <div className='forecast-module-information-disposition forecast-module-information-border'>
                            <img className="icons" src="./humidity.png"/>
                            <p>{selected.day.avghumidity}</p>
                        </div>
                        <div className='forecast-module-information-disposition forecast-module-information-border'>
                            <img className="icons" src="./wind.png"/>
                            <p>{selected.day.maxwind_kph}</p>
                        </div>
                        <div className='forecast-module-information-disposition forecast-module-information-border'>
                            <img className="icons" src='./temp.png'/>
                            <p>Avg: {selected.day.avgtemp_c}</p>
                        </div>
                        <div className='forecast-module-information-disposition forecast-module-information-border'>
                            <p>Min: {selected.day.mintemp_c}</p>
                        </div>
                        <div className='forecast-module-information-disposition forecast-module-information-border'>
                            <p>Max: {selected.day.maxtemp_c}</p>
                        </div>
                    </>
                )}
                </div>
                <div className='forecast-module-information'>
                    {list?.forecastday?.map((item)=>{
                        return <p className='center forecast-buttons-border' key={item.date_epoch} onClick={()=>getSelected(item)}>{item.date}</p>
                    })}
                </div>
            </div>
            {
                selected && (<GraphsModule _hours={selected.hour} />)
            }
            
        </section>    
    )
}