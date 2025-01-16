import React, { useState } from 'react'
import s from './home.module.css'
import { LuLightbulbOff } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";


function Home() {
   const [light, setLight] = useState<boolean>(false)

   const turnOnOff = () => {
    setLight((pre) => !pre)
   }
  return (
    <div className={s.home}>
        {!light ? <LuLightbulbOff onClick={turnOnOff} size={40}/> : 
        <LuLightbulb onClick={turnOnOff} size={40}/>}
        </div>
  )
}

export default Home