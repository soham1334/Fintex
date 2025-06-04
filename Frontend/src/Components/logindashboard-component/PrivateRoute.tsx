
import { useContext ,type ReactNode} from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Auth-Context";

type Prop = {
    children:ReactNode
 
 }


function PrivatRoute  ({children}:Prop){
   const {Islogedin} = useContext(AuthContext)!
  
   return Islogedin?(
    children
   ):(
    <Navigate to = '/' replace/>
   );
}

export default PrivatRoute