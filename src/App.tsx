import './App.css'
import { Routes , Route } from 'react-router-dom'
import { Home} from './pages/Home/Home'
import { Landing } from './pages/Landing/Landing'
import { Signup } from './pages/Signup/Signup'
import { Login } from './pages/Login/Login'
import { Profile } from './pages/Profile/Profile'

function App() {
  

  return (
    <div>
      <Routes>
        <Route path = '/home' element = {<Home/>}/>
        <Route path = '/'  element= {<Landing/>}/>
        <Route path = '/signup' element = {<Signup/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/profile' element = {<Profile/>}/>
      </Routes> 

     
    </div>
  )
}

export default App
