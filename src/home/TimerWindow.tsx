import React, { useState } from 'react'

import s from './home.module.css'

type Props = {
    turnOnOff: (onOff: boolean) => void
    showTimer: () => void

}

function TimerWindow({ turnOnOff, showTimer }: Props) {


    const onClick = () => {
        turnOnOff(true)
        showTimer()
    }
    
    
    return (
        <div className={s.timerWindow}>
            <div>
                
           <input type='radio' />
            </div>

            <button onClick={onClick}>Start</button>
        </div>
    )
}

export default TimerWindow