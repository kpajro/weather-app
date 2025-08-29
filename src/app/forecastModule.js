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
    }, [_list.length])
    return (
        <section className='forecast-sidepanel-column-panels fill'>
            <div className="forecast-module">
                <div className='forecast-module-information'>
                {
                    selected && (<>
                        <div>
                            <img className="icons" src={selected.day.condition.icon}/>
                            <p>{selected.day.condition.text}</p>
                        </div>
                        <div>
                            <img className="icons" src="./humidity.png"/>
                            <p>{selected.day.avghumidity}</p>
                        </div>
                        <div>
                            <img className="icons" src="./wind.png"/>
                            <p>{selected.day.maxwind_kph}</p>
                        </div>
                        <div>
                            <img className="icons" src='./temp.png'/>
                            <p>{selected.day.avgtemp_c}</p>
                        </div>
                        <div>
                            <p>{selected.day.mintemp_c}</p>
                        </div>
                        <div>
                            <p>{selected.day.maxtemp_c}</p>
                        </div>
                    </>
                )}
                </div>
                <div className='forecast-module-information'>
                    {list.map((item)=>{
                        return <p key={item.date_epoch} onClick={()=>getSelected(item)}>{item.date}</p>
                    })}
                </div>
            </div>
            {
                selected && (<GraphsModule _hours={selected.hour} />)
            }
            
        </section>    
    )
}