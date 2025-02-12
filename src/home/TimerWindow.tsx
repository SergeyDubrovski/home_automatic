import { useState } from 'react'

import s from './home.module.css'
import { Switch } from '@mui/material'
import { LuBadgeX } from "react-icons/lu";
import { useSendTimerMutation } from '../services/apiHomeReducer';

type Props = {
    turnOnOff: (onOff: boolean) => void
    showTimer: () => void
    startTime: (time?: number) => void

}

function TimerWindow({ turnOnOff, showTimer, startTime }: Props) {


    const [time, setTime] = useState<Array<boolean>>([
        false, false, true, false, false
    ])
    const [handleTime, setHandleTime] = useState<number>(600)
    const [data] = useSendTimerMutation()
    
    const onClick = () => {

        startTime(handleTime)
        turnOnOff(true)
        showTimer()
        data({Relay1:'0',Relay2:null, Timer1:'' + handleTime, Timer2: null, Motor:false}).unwrap()
        .then(data => {
            console.log(data);
            
        })
    }
    const timeString: Array<string> = ['1 min', '5 min', '10 min', '30 min', 'forever']

    const onChange = (index: number) => {

        switch (index) {
            case 0: setHandleTime(60)

                break;
            case 1: setHandleTime(300)

                break;
            case 2: setHandleTime(600)

                break;
            case 3: setHandleTime(1800)

                break;

            default: setHandleTime(0)
                break;
        }

        setTime(
            prev => prev.map((_, i) => {
                if (i === index) return true
                return false
            })
        )
    }


    const switchCheck: JSX.Element[] = timeString.map((el, i) => {
        return (
            <div key={el}>
                <Switch size='medium' checked={time[i] ? true : false} color="warning"
                    onChange={() => { onChange(i) }} />
                <span>{el}</span>
            </div>
        )
    })


    return (
        <div className={s.timerWindow}>
            <LuBadgeX onClick={showTimer} className={s.iClose} size={40} />
            <div className={s.switchWrapper}>
                {switchCheck}
            </div>

            <button onClick={onClick}>Start</button>
        </div>
    )
}

export default TimerWindow