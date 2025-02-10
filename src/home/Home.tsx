import { useEffect } from "react"
import {  useTakeSensorsQuery } from "../services/apiHomeReducer"
import Home1 from "./Home1"
import Home2 from "./Home2"
import s from './home.module.css'
import { useAppDispatch } from "../services/hooks"
import { getHomeSensors } from "../services/homeSlice"

function Home() {
  const sensor = useTakeSensorsQuery(undefined)
  const dispatch = useAppDispatch()
  
  
  useEffect(() => {
    if(sensor.data?.state) {
      dispatch(
        getHomeSensors(sensor.data.state)
      )
    }
  },[sensor])
  
  return (
    <div className={s.home}>
        <Home1 />
        <Home2 />
    </div>
  )
}

export default Home