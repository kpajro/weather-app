import React, { forwardRef } from 'react'
import { ForecastModule } from './forecastModule'

export const SidePanel = forwardRef(({_forecast = {}}, ref) =>{
    return(
        <div className='forecast-sidepanel hidden' ref={ref}>
            <section className='forecast-sidepanel-column-panels fill'>
                <div>
                    <p className='center'>Tomorrow's Weather</p>
                    <ForecastModule _list={_forecast.forecastday}/>
                    <p>choose next days</p>
                </div>
                <div>
                    <p>-graph of each day (temp + humidity)-</p>
                </div>
            </section>
        </div>
    )
})

