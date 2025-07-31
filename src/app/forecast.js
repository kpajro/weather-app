import React, { forwardRef } from 'react'
import { Panel } from "./panel"


export const SidePanel = forwardRef((props, ref) =>{
    return(
        <div className='forecast-sidepanel hidden' ref={ref}>
            <p>Tomorrow's Weather</p>
            <p>info -temp,humidity,windspeed-</p>
            <p>choose next days</p>
            <p>-graph of each day (temp + humidity)-</p>
        </div>
    )
})