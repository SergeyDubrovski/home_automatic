import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'
import './App.css'
import Home from './Home'

function App() {
  

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
