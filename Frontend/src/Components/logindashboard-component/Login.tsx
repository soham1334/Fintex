import React from 'react';
import { useState,useContext } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import {AuthContext} from './Auth-Context';

const Login = () => {

    const navigate = useNavigate();
    const{setIslogedin} = useContext(AuthContext)!; 
    const[username,setusername] = useState("")
    const[password,setpassword] = useState("")
    const[loading,setloading] = useState<boolean | null>(null)
    const[error ,seterror] = useState("")
    
    const handleLogin = async (e:React.FormEvent<HTMLFormElement>)=>{
        setloading(true)
        e.preventDefault()
        const details = {username ,password}

        try{
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_API_KEY}/token/`,details)
            localStorage.setItem('accessToken',response.data.access)
            localStorage.setItem('refreshToken',response.data.refresh)
            setIslogedin(true)
            navigate('/Home')
        }catch(error){
          console.log(error)
            console.error("Invalid Credentials")
            seterror("Invalid Credentials")
        }finally{
          setloading(false)
        }

        
    }

  return (
    <div className=" h-screen w-full flex items-center justify-center overflow-hidden relative">

      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('/gradient-backgrounds.webp')` }}

      />
       <img
        src="/LogoW.png"
        alt="FinText Logo"
         className="absolute top-0 left-4 h-20 md:h-32 object-contain z-40 cursor-pointer"
      /> 
     
      <div className="absolute inset-0 bg-black/20 z-0" />

      {/* Login Card */}
      <div className="relative z-10 bg-white/10 backdrop-blur-lg p-10 rounded-[2rem] w-full max-w-sm shadow-lg">
      
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white opacity-70" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
            </svg>
          </div>
        </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-white drop-shadow-sm tracking-wide">Welcome Back</h2>
          <p className="text-sm text-blue-100 mt-1 opacity-80">Please sign in to continue</p>
        </div>
        {/* FORM */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
              </svg>
              <input
                type="text"
                placeholder="Username"
                value = {username}
                onChange={(e)=>(setusername(e.target.value),seterror(""))}
                className="bg-transparent border-b border-white/50 w-full py-2 px-1 text-white placeholder-white focus:outline-none focus:border-white"
              />
            </label>
          </div>

          <div>
            <label className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 17a2 2 0 1 0 .001-3.999A2 2 0 0 0 12 17zm6-5V9a6 6 0 1 0-12 0v3H4v10h16V12h-2zm-8 0V9a4 4 0 0 1 8 0v3h-8z" />
              </svg>
              <input
                type="password"
                placeholder="Password"
                value = {password}
                onChange={(e)=>(setpassword(e.target.value),seterror(""))}
                className="bg-transparent border-b border-white/50 w-full py-2 px-1 text-white placeholder-white focus:outline-none focus:border-white"
              />
            </label>
          </div>
          {error && <div className='text-red-600 font-medium text-sm'>{error}</div> }
          {/* <div className="flex justify-between items-center text-sm text-white mt-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2 accent-white" />
              Remember me
            </label>
            <a href="#" className="text-white/70 hover:underline">Forgot Password?</a>
          </div> */}
          {loading? <button className="w-full py-2 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl border border-white/20 
                                      transition-all duration-300 ease-in-out 
                                      hover:from-purple-700 hover:to-blue-600 hover:scale-105 shadow-md hover:shadow-lg" disabled>
                         <i className="fas fa-spinner fa-spin"></i>
                              Loading...
                    </button>
                   : <button
                         type="submit"
                         className="w-full py-2 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl border border-white/20 
                                    transition-all duration-300 ease-in-out 
                                   hover:from-purple-700 hover:to-blue-600 hover:scale-105 shadow-md hover:shadow-lg"
                    >
                                   LOGIN
                    </button>
          } 
        </form>
        <p className="mt-4 text-center text-sm text-white/70">
          Don't have an account?{' '}
          <a href="/register" className="text-purple-300 hover:underline">
            Sign up now
          </a>
        </p>
        
      </div>
    </div>
  );
};

export default Login;
