import React, { forwardRef } from 'react'
import { ForecastModule } from './forecastModule'

export const SidePanel = forwardRef(({_forecast = {}}, ref) =>{
    return(
        <div className='forecast-sidepanel hidden' ref={ref}>
            <ForecastModule _list={_forecast.forecastday}/>
        </div>
    )
})

