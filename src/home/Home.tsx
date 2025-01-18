import  { useState } from 'react'
import s from './home.module.css'
import { LuLightbulbOff } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import TimerWindow from './TimerWindow';


function Home() {
  const [light, setLight] = useState<boolean>(false)
  const [timer, setTimer] = useState<boolean>(false)
  const login = useSelector((state: RootState) => state.login)
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
        {timer && <TimerWindow turnOnOff={turnOnOff} showTimer={showTimer} />}
        {!light ? <LuLightbulbOff className={s.iconLight} onClick={showTimer} size={40} /> :
          <LuLightbulb className={s.iconLight} onClick={() => { setLight(false) }} size={40} />}
      </div>

    </div>
  )
}

export default Home