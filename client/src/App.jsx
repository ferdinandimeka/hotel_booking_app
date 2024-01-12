import { Routes, Route } from 'react-router-dom'
import './App.css'
//import HomeScreen from './screens/HomeScreen'
import Home from './screens/Home'

function App() {

  return (
      <>
        <Routes>
          <Route path="/" element={ <Home /> } />
        </Routes>
      </>
  )
}

export default App
