import { useEffect, useState } from 'react'
import s from './home.module.css'
import { LuLightbulbOff } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { RootState } from '../services/store';
import TimerWindow from './TimerWindow';
import MyTimer from './MyTimer';
import { useSendTimerMutation } from '../services/apiHomeReducer';

function Home() {
  const [light, setLight] = useState<boolean>(false)
  const [timer, setTimer] = useState<boolean>(false)
  const [time, setTime] = useState<number | undefined>(undefined)
  const [data, {isError, isLoading}] = useSendTimerMutation()
  const login = useSelector((state: RootState) => state.login)

  const myTime = new Date();
  useEffect(() => {

    if (time !== undefined) myTime.setSeconds(myTime.getSeconds() + time);
   

  }, [time])
  const turnOnOff = (onOff: boolean) => {
    setLight(onOff)
  }
  const showTimer = () => {
    setTimer((prev) => !prev)
    
  }


  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        {timer && <TimerWindow startTime={setTime}
          turnOnOff={turnOnOff} showTimer={showTimer} />}
        {!light ? <LuLightbulbOff className={s.iconLight}
          onClick={showTimer} size={40} /> :
          <LuLightbulb className={s.iconLight}
            onClick={() => { setLight(false) 
              setTime(undefined)
              data({Relay1:'1',Relay2:null, Timer1:null, Timer2: null})
            }} size={40} />

        }
        {(time  && light) ? <MyTimer setLight={setLight} expiryTimestamp={myTime} /> : undefined}
      </div>

    </div>
  )
}

export default Home