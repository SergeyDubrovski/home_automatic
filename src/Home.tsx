import React, { useState } from 'react'
import s from './home.module.css'
import { LuLightbulbOff } from "react-icons/lu";
import { LuLightbulb } from "react-icons/lu";
import { useSelector } from 'react-redux';
import { RootState } from './app/store';


function Home() {
   const [light, setLight] = useState<boolean>(false)
   const login = useSelector((state : RootState)=> state.login)
   const turnOnOff = () => {
    setLight((pre) => !pre)
   }
   console.log(login);
   
  return (
    <div className={s.home}>
        {!light ? <LuLightbulbOff onClick={turnOnOff} size={40}/> : 
        <LuLightbulb onClick={turnOnOff} size={40}/>}
        </div>
  )
}

export default Home