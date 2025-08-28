import React, { useState, useEffect, useInsertionEffect } from 'react'

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
        <div className="forecast-module">
            <div>
                {selected && <p>Selected: {selected.date}</p>}
            </div>
            <div>
                {list.map((item)=>{
                    return <p key={item.date_epoch} onClick={()=>getSelected(item)}>{item.date}</p>
                })}
            </div>
        </div>
    )
}