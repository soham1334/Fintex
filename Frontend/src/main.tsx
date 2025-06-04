import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Components/Home+Navbar-component/StlNavbar.css'
import './Components/Home+Navbar-component/StlHome.css'
import App from './App.tsx'
import AuthContext_Provider from './Components/logindashboard-component/Auth-Context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContext_Provider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthContext_Provider>
  </StrictMode>,
)
