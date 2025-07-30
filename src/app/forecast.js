import React, { forwardRef } from 'react'


export const SidePanel = forwardRef((props, ref) =>{
    return(
        <div ref={ref}>
            <div>
                <p>test</p>
            </div>
        </div>
    )
})