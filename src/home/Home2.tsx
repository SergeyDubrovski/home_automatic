import { useState } from 'react';
import s from './home.module.css'
import {
  LuCaptions, LuCaptionsOff, LuTimer, LuTimerOff, LuTriangle,
  LuTriangleAlert, LuSquareCheckBig
} from "react-icons/lu";

import { getHomeSensors } from '../services/homeSlice';
import { useAppDispatch, useAppSelector } from '../services/hooks';
import { useSendTimerMutation } from '../services/apiHomeReducer';


function Home2() {
  const sensor = useAppSelector(state => state.home)
  const [timer, setTimer] = useState<boolean>(true)
  const [show, setShow] = useState<boolean>(false)

  const dispatch = useAppDispatch()
  const [data] = useSendTimerMutation()

  const onClick = (timer?: string) => {

    if (!timer) {

      data({ Relay1: null, Relay2: null, Timer1: null, Timer2: null, Motor: false })
        .then(
          () => {

            dispatch(getHomeSensors({ ...sensor, Motor: false }))
          }
        )
    } else {
      data({ Relay1: null, Relay2: null, Timer1: null, Timer2: timer, Motor: true })
        .then(
          () => {

            dispatch(getHomeSensors({ ...sensor, Motor: true }))
            setShow(false)
          }
        )

    }



  }



  return (
    <div className={s.Home1}>
      <div className={s.wrapper}>
        {!sensor.Motor ? <LuCaptionsOff onClick={()=> {setShow(prev => !prev)}} size={40} className={s.iconLight} />
          : <LuCaptions onClick={() => {onClick()}} size={40} className={s.iconLight} />
        }
        {!show ? <LuTimerOff opacity={0.3} size={40} className={s.iconLight} /> :

          <>
            {
              timer ? <LuTimer onClick={() => setTimer(prev => !prev)} size={40} className={s.iconLight} />
                : <LuTimerOff onClick={() => setTimer(prev => !prev)} size={40} className={s.iconLight} />
            }

          </>

        }
        <LuSquareCheckBig onClick={() => {
          if(timer) onClick('900000')
            else onClick('1')
          }
        
        } size={40} className={s.iconLight} opacity={show ?
          1 : 0
        } />
        {sensor.Sensor1 === 1 ? <LuTriangle size={40} className={s.iconLight} /> :
          <LuTriangleAlert size={40} className={s.iconLight} color='red' />
        }

      </div>

    </div>
  )
}

export default Home2