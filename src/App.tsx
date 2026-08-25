import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Landing } from './pages/Landing/Landing'
import { Signup } from './pages/Signup/Signup'
import { Login } from './pages/Login/Login'
import { Profile } from './pages/Profile/Profile'
import { ShoppingList } from './pages/ShoppingList/ShoppingList'
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute'

function App() {

  return (
    <div>
      <Routes>

        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/shopping-list/:id"element={<ShoppingList />}/>
          <Route path="/profile" element={<Profile />} />
        </Route>

      </Routes>
    </div>
  )
}

export default App