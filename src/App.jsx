import { useEffect, useState } from 'react'
import './App.css'
import { jwtDecode } from 'jwt-decode';
import { Navbar } from './components/Navbar/navbar.jsx'
import { Home } from './components/Home/Home.jsx'
import { CreateRoom } from './components/Room/CreateRoom.jsx'
import { Room } from './components/Room/Room.jsx'
import { Footer } from './components/Footer/Footer.jsx'
import { About } from './components/About/About.jsx'
import { SignUp } from './components/auth/SignUp.jsx'
import { Login } from './components/auth/Login.jsx'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Instructions } from './components/Instructions/Instructions.jsx'
import { Board } from './components/Board/Board.jsx'
import { Play } from './components/Play/Play.jsx'
import { JoinRoom } from './components/Room/JoinRoom.jsx'
import { ListPlays } from './components/Play/ListPlays.jsx'
import { UsersList } from './components/admin/UsersList.jsx'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [token, setToken] = useState(null)
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const jwtToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken')
    if (jwtToken) {
      setIsLoggedIn(true)
      setToken(jwtToken)
      const tokenDecode = jwtDecode(jwtToken);
      if (tokenDecode.scope && tokenDecode.scope.includes('admin')) {
        setAdmin(true)
      } else {
        setAdmin(false)
      }

    } else {
      setIsLoggedIn(false)
      setToken(null)
      setAdmin(false)
    }

    const timer = setTimeout(() => {
      setAuthChecked(true)
    }, 2000);

    return () => clearTimeout(timer)
  }, [token])

  const handleLogin = (jwtToken) => {
    if (jwtToken) {
      setIsLoggedIn(true)
      setToken(jwtToken)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('authToken')
    sessionStorage.removeItem('authToken')
    localStorage.removeItem('canThrowDice')
    localStorage.removeItem('diceValues')
    setIsLoggedIn(false)
    setToken(null)
  }
  
  if (!authChecked) {
    return (
      <div className='ap-spinner-container'>
        <div className='ap-spinner'></div>
      </div>
    );
  }

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} isAdmin={admin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room" element={isLoggedIn ? <CreateRoom token={token}/> : <Navigate to="/login" />} />
        <Route path="room/join" element={isLoggedIn ? <JoinRoom token={token}/> : <Navigate to="/login" />} />
        <Route path="room/list" element={isLoggedIn ? <ListPlays token={token}/> : <Navigate to="/login" />} />
        <Route path="/room/:roomId" element={isLoggedIn ? <Room token={token}/> : <Navigate to="/login" />} />
        <Route path="/about" element={<About/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login onLogin={handleLogin}/>} />
        <Route path="/instructions" element={<Instructions/>} />
        <Route path="/play" element={isLoggedIn ? <Play /> : <Navigate to="/login"/>} />
        <Route path="/board/:gameId" element={isLoggedIn ? <Board /> : <Navigate to="/login"/>} />
        <Route path="/admin/users" element={isLoggedIn && admin ? <UsersList token={token} /> : <Navigate to="/"/>} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
