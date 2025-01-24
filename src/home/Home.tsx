import { useEffect, useState } from 'react'
import s from './home.module.css'
import { LuLightbulbOff } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import TimerWindow from './TimerWindow';
import MyTimer from './MyTimer';

function Home() {
  const [light, setLight] = useState<boolean>(false)
  const [timer, setTimer] = useState<boolean>(false)
  const [time, setTime] = useState<number | undefined>(undefined)
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
console.log(login);

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
            }} size={40} />

        }
        {(time  && light) ? <MyTimer expiryTimestamp={myTime} /> : undefined}
      </div>

    </div>
  )
}

export default Home