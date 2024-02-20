import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './Home'
import './global.css'
import NavBar from './components/Navbar/Navbar'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavBar />
    <Home />
  </React.StrictMode>,
)
