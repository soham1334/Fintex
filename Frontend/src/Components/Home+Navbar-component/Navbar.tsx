
import { NavLink } from 'react-router-dom'
import './StlNavbar.css'
import { useContext } from 'react'
import { AuthContext } from '../logindashboard-component/Auth-Context'

function Navbar (){
    const {setIslogedin} = useContext(AuthContext)!
    const logout = ()=>{
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        setIslogedin(false)
    }
    return (
        <nav className = "navbar">
            
            <div className ="nav-obj">
                <NavLink to ="/Home" className = "nav-link">Home</NavLink> 
                <NavLink to ="/News" className = "nav-link">News</NavLink>
                <NavLink to ="/StockMarket" className = "nav-link">StockMarket</NavLink>
            </div>
            <div>    
                <NavLink to ="/" className="logout-link" onClick = {logout} >Logout</NavLink> 
            </div>
        </nav>
       
    )
}

export default Navbar