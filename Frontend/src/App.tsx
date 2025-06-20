
import {Routes ,Route} from 'react-router-dom'
import Home from './Components/Home+Navbar-component/home'

import News from './Components/News-components/News'
import YFinanceDashboard from './Components/Stock/stock'
import './index.css'
import './App.css'
import Login from './Components/logindashboard-component/Login'
// import { useContext, useState } from 'react'
import AuthContext_Provider from './Components/logindashboard-component/Auth-Context'
import LoginDashboard from './Components/logindashboard-component/login_dashboard'
import Registration from './Components/logindashboard-component/Register'
import PrivatRoute from './Components/logindashboard-component/PrivateRoute'
function App() {

  // const{Islogedin,setIslogedin} = useContext(AuthContext)!;
  
  return (
    <div className=" web_page" >
      <AuthContext_Provider>
          
          
                <main className="flex-grow overflow-auto  flex flex-col items-center  z-10">
                  
                <Routes>
                  <Route path = "/" element = {<LoginDashboard/>}/> 
                  <Route path = "/Register" element = {<Registration/>}/> 
                  <Route path = "/login" element = {<Login/>}/> 
                  <Route path = "/Home" element = {<PrivatRoute><Home/></PrivatRoute>} />
                  <Route path = "/News" element = {<PrivatRoute><News/></PrivatRoute>} />
                  <Route path = "/StockMarket" element = {<PrivatRoute><YFinanceDashboard/></PrivatRoute>}/>
                </Routes>
              </main> 
      </AuthContext_Provider>  
        
    

    </div>
  )
}

export default App
