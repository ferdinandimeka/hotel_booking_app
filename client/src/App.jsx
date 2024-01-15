import { Routes, Route } from 'react-router-dom'
import './App.css'
//import HomeScreen from './screens/HomeScreen'
import Home from './screens/Home'

function App() {

  return (
      <div className='py-3'>
        <Routes>
          <Route path="/" element={ <Home /> } />
        </Routes>
      </div>
  )
}

export default App
