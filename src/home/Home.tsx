import { useEffect } from "react"
import { useTakeSensorsQuery } from "../services/apiHomeReducer"
import Home1 from "./Home1"
import Home2 from "./Home2"
import s from './home.module.css'
import { useAppDispatch } from "../services/hooks"
import { getHomeSensors } from "../services/homeSlice"
import { useNavigate } from "react-router-dom"

function Home() {
  const sensor = useTakeSensorsQuery(undefined)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (sensor.data?.state) {
      dispatch(
        getHomeSensors(sensor.data.state)
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sensor])

  return (
    <div className={s.home}>
      <button style={{ width: '100px', height: '50px' }} onClick={() => { navigate('/bar') }}>BAR-code</button>
      <button style={{ width: '100px', height: '50px' }} onClick={() => { navigate('/bar2') }}>BAR-code2</button>
      <button style={{ width: '100px', height: '50px' }} onClick={() => { navigate('/bar3') }}>BAR-code3</button>
      <Home1 />
      <Home2 />
    </div>
  )
}

export default Home