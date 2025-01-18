import  { useState } from 'react'

import s from './home.module.css'
import { Switch } from '@mui/material'

type Props = {
    turnOnOff: (onOff: boolean) => void
    showTimer: () => void

}

function TimerWindow({ turnOnOff, showTimer }: Props) {


const [time, setTime] = useState<Array<boolean>>([
    false, false, true, false, false
])
const [handleTime, setHandleTime] = useState<number>(1)
    const onClick = () => {
        console.log(handleTime);
        
        turnOnOff(true)
        showTimer()
    }
  const timeString: Array<string> = ['1 min', '5 min', '10 min', '30 min', 'forever']  

  const onChange = (index:number) => {
    setHandleTime(index)
    setTime(
        prev => prev.map((_, i) => {
            if(i === index) return true
            return false
        })
    )
  }
  

    const switchCheck: JSX.Element[] = timeString.map((el, i) => {
        return (
            <div key={el}>
                    <Switch checked={time[i] ? true : false} color="warning" 
                    onChange={() => {onChange(i)}}/>
                    <span>{el}</span>
                </div>
        )
    })
    
    
    return (
        <div className={s.timerWindow}>
            <div className={s.switchWrapper}>
               {switchCheck}
            </div>

            <button onClick={onClick}>Start</button>
        </div>
    )
}

export default TimerWindow