import React, {  createContext, useState, type ReactNode } from "react";
type Prop = {
    children:ReactNode
 
 }
const AuthContext = createContext<{ Islogedin: boolean; setIslogedin: (val: boolean) => void } | null>(null);
function AuthContext_Provider ({children}:Prop){

    const [Islogedin,setIslogedin] = useState(
        localStorage.getItem('accessToken')?true:false
    )
   
    return(
        <>
        <AuthContext.Provider  value = {{Islogedin,setIslogedin}}>
            {children}
        </AuthContext.Provider>
        </>

    )

}

export default AuthContext_Provider
export {AuthContext};