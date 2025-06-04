import './StlHome.css'
import '../../App.css'
import Navbar from './Navbar.tsx'
import { useEffect } from 'react'

import axiosInstance from '../logindashboard-component/axiosInstances.tsx'

function Home ()  {
   
    useEffect(()=>{
        const protected_data = async()=>{
            try{
                console.log('Base URL:', import.meta.env.VITE_BACKEND_API_KEY)

                const response = await axiosInstance.get("/protected-view/")
                console.log(response.data)
            }catch(error : any){
                console.log(error)
                console.error("Full error response:", error.response?.data);

               console.error("Error fetching data",error)
            }

        }
        protected_data()
        
},[])

    return (
    <div className= "home-content">
          {true?<Navbar/>: <></>}
        <div className ="main-div">
            
            <div className = "wel-name">
                <h2  className = "welcm">welcome </h2>
                <p className ="text-6xl text-white font-1800">to </p>
                <h1 className ="fin">Fintex </h1>
            </div>
            
            <div className = "left-div">
                <div className = "quote-box">
                    <pre className = "quote typewriter">
                        Transforming data into your next big move.<br/>
                            Grow smarter,with Fintex insights.<br/>
                            
                     </pre>
                </div>
            </div>
            
        
        
        </div>
    </div>
        
    )
    
    


};

export default Home;