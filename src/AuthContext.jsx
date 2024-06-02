import React, { createContext, useContext } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const AuthContext=createContext()

export const AuthProvider = ({children}) => {
    
    const [authState,setAuthState] = useState({
        isUserAuthenticated:false,
        email:null,
        token:null
    })
    const navigate=useNavigate()
    const login=(email,token)=>{
     setAuthState({isUserAuthenticated:true,email,token})
     navigate('/')
    }
    const logout=()=>{
        setAuthState({isUserAuthenticated:false,email:null,token:null})
        navigate('/login')
    }
  return (
    <AuthContext.Provider value={{authState,login,logout}}>
    {children}  
    </AuthContext.Provider>
  )
}

export const useAuth=()=>{
    return useContext(AuthContext)
}
