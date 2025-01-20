import  { useState } from 'react'
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
  const [time, setTime] = useState<number| undefined>(0)
  const login = useSelector((state: RootState) => state.login)
  const turnOnOff = (onOff: boolean) => {
    setLight(onOff)
  }
  const showTimer = () => {
    setTimer((prev) => !prev)
  }
  console.log(login);

  const myTime = new Date();
    if(time !== undefined) myTime.setSeconds(myTime.getSeconds() + time);

  return (
    <div className={s.home}>
      <div className={s.wrapper}>
        {timer && <TimerWindow startTime={setTime} turnOnOff={turnOnOff} showTimer={showTimer} />}
        {!light ? <LuLightbulbOff className={s.iconLight} onClick={showTimer} size={40} /> :
          <LuLightbulb className={s.iconLight} onClick={() => { setLight(false) }} size={40} />
          
          }
      <MyTimer expiryTimestamp={myTime} />
      </div>

    </div>
  )
}

export default Home