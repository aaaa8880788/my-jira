import React, { useState, createContext, ReactNode, useContext, useEffect } from "react";
import * as auth from '@/utils/authProvider'
import { http } from "@/service";

interface AuthForm {
  username: string,
  password: string
}

interface User {
  username: string,
  token: string
}

const initUser = async() => {
  let user = null
  const token = auth.getToken()
  if(token) {
    const result = await http('/getUserByToken', {
      data: {
        token: token
      }
    })
    user = result.data
  }
  return user
}

const AuthContext = createContext<{
  user: User | null,
  login: (form: AuthForm) =>Promise<void>,
  register: (form: AuthForm) => Promise<void>,
  logout: () => Promise<void>
} | undefined>(undefined);
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode}) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  useEffect(() => {
    initUser().then(setUser)
  }, [])

  return (
    <AuthContext.Provider value={{user, login, register, logout}} children={children}></AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if(!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context
}