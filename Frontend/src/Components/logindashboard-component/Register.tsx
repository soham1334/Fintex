import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

type FormError = {
  username?: string;
  password?:string;
};



function Registration (){
    
    const[username,setusername] = useState("")
    const[email,setemail] = useState("")
    const[password,setpassword] = useState("")
    const[register , setregister] = useState(false)
    const[error , seterror] = useState<FormError | null>(null)
    const[loading ,setloading] = useState<boolean |null>(null)


    const Register = async(e:React.FormEvent<HTMLFormElement>)=>{
      setloading(true)  
      e.preventDefault();
      const details = {
        username , email , password
      }

      try{
        const response = await axios.post("http://127.0.0.1:8000/API/v2/Register/",details)
        console.log("Resgistered Successfully!",response.data)
        setregister(true)
      }catch(error){
        const Error = error.response.data as FormError;
        console.error("TRY AGAIN",Error)
        seterror({'username':Error.username,'password':Error.password})
      }finally{
        setloading(false)
      }
    }
    
    return (

   <div
      className="min-h-screen w-full flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/gradient-backgrounds.webp')" }} // replace with your path
    >
      {/* <div className="absolute inset-0 bg-black/40 z-0" /> */}

      <div className="flex w-full max-w-4xl bg-black/10 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden">
        
                {/* Left Box */}
        <div className="w-1/2 p-10 flex flex-col items-center justify-start text-white bg-gradient-to-tr from-purple-900 to-indigo-800/60">
 
            {/* Welcome Message */}
  
           <h2 className="text-3xl font-medium  text-center font-serif">Welcome To</h2>        

          {/* Company Logo just below welcome */}
           <img
            src="/LogoW.png"
            alt="Lavandula Logo"
            className="w-60 h-30"
          />
 
  
        </div>


        {/* Right Box - Form */}
        <div className="w-1/2 p-10 z-10 bg-white/10 backdrop-blur-lg  text-white">
          <h2 className="text-2xl font-semibold mb-6 text-center">Create Account</h2>

          <form onSubmit = {Register} className="space-y-5">
           <div className="mb-4">
             
             <label className="block text-sm text-white/80 mb-1">Username</label>
             <div className="flex items-center bg-white/10 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
               <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5z" />
               </svg>
               <input
                 type="text"
                 placeholder="Enter your username"
                 value = {username}
                 onChange={(e)=>(setusername(e.target.value),seterror((prev)=>({...prev,"username":""})))}
                 className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
               />
             </div>
             {error?<div className='text-red-600 font-medium text-sm'>{error['username']}</div>:""}
           </div>
           

            <div className="mb-4">
              <label className="block text-sm text-white/80 mb-1">Email</label>
              <div className="flex items-center bg-white/10 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value = {email}
                  onChange={(e)=>(setemail(e.target.value))}
                  className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm text-white/80 mb-1">Password</label>
              <div className="flex items-center bg-white/10 rounded px-3 py-2 focus-within:ring-2 focus-within:ring-purple-500">
                <svg className="w-5 h-5 text-white mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 17a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm6-5V9a6 6 0 0 0-12 0v3H4v10h16V12h-2zm-2 0H8V9a4 4 0 0 1 8 0v3z" />
                </svg>
                <input
                  type="password"
                  placeholder="Set password"
                  value = {password}
                  onChange={(e)=>(setpassword(e.target.value),seterror((prev)=>({...prev,"password":""})))}
                  className="w-full bg-transparent text-white placeholder-white/60 focus:outline-none"
                />
              </div>
              {error?<div className='text-red-600 font-medium text-sm'>{error['password']}</div>:""}
            </div>

            {register?<div role="alert" className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded">Registered Successfully</div>:""}
            {loading?<button className="w-full py-2 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl border border-white/20 
                                        transition-all duration-300 ease-in-out 
                                        hover:from-purple-700 hover:to-blue-600 hover:scale-105 shadow-md hover:shadow-lg" disabled>
                         <i className="fas fa-spinner fa-spin"></i>
                              Loading...
                   </button>
                :  <button
                       type="submit"
                       className="w-full py-2 mt-4 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl border border-white/20 
                                  transition-all duration-300 ease-in-out 
                                  hover:from-purple-700 hover:to-blue-600 hover:scale-105 shadow-md hover:shadow-lg">
                            Register
                    </button>
            }                   
          </form>
          {register?<p className="mt-4 text-center text-sm text-white/70">
            Proceed to login -{' '}
            <a href="/login" className="text-purple-200 hover:underline">
              Login
            </a>
          </p> 
          :<p className="mt-4 text-center text-sm text-white/70">
            Already have an account?{' '}
            <a href="/login" className="text-purple-200 hover:underline">
              Log in here
            </a>
          </p>
          }
        </div>
      </div>
    </div>
    );

}

export default Registration