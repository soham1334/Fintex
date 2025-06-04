
import {useNavigate}from 'react-router-dom';

function LoginDashboard  () {

  const  navigate =  useNavigate();
  return (
    <div                    
      className="h-screen w-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/gradient-backgrounds.webp')" }} // 🔁 Replace with your image path
    >
      {/* Top-left Login/Register buttons */}
      <div className="absolute top-4 right-18 flex gap-15">
        <button 
          onClick={()=>navigate('/login')}
          className= " w-25 bg-transparent text-white border-1 border-white font-medium px-4 py-2 hover:border-purple-900 rounded hover:bg-purple-900 hover:text-white shadow-md transition">
          Login
        </button>
        <button 
          onClick = {()=>(navigate('/Register'))}
          className="w-25  text-white border-1 bg-purple-900 border-purple-900 font-semibold px-4 py-2 hover:border-white rounded hover:bg-transparent hover:text-white shadow-md transition">
          Register
        </button>
      </div>

      {/* Center content: Logo + Paragraph */}
      <div className=" flex flex-col items-center justify-center h-full text-center px-4">
         <div className="h-[350px] bg-black/25 backdrop-blur-md rounded-xl p-6 shadow-xl border-2 border-white/30">
           <img
             src="/LogoW.png" // 🔁 Replace with your actual logo path
             alt="Company Logo"
             className="w-[250px] h-[150px] mb-2 mx-auto"
           />
           <p className="text-white text-lg font-semibold max-w-x2 mb-3"> Welcome to FinText</p>
           <p className="text-white text-lg max-w-xl">
            
             Empowering smarter financial decisions with AI. We harness advanced technology to simplify complex financial data, interpret market movements, and deliver insights that empower investors and businesses alike.
             Innovate. Analyze. Transform.


           </p>
         </div>
       </div>

    </div>
  );
};

export default LoginDashboard;
