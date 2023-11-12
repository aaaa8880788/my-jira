// 用createContext方法来实现登录信息存储
import React, { createContext, ReactNode, useContext, useEffect } from "react";
import * as auth from '@/utils/authProvider'
import { useAsync } from "@/utils/useAsync";
import FullPageLoading from "@/views/fullPageLoading";

interface AuthForm {
  username: string,
  password: string
}

interface User {
  username: string,
  token: string
}

const AuthContext = createContext<{
  user: User | null,
  login: (form: AuthForm) =>Promise<any>,
  register: (form: AuthForm) => Promise<any>,
  logout: () => Promise<void>
} | undefined>(undefined);
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({children}:{children:ReactNode}) => {
  const {run, isLoading, data: user, setData: setUser} = useAsync<User | null>()

  const login = (form: AuthForm) => auth.login(form).then(res => {
    setUser(res)
    return Promise.resolve(res)
  }).catch(err => {
    return Promise.reject(err)
  })
  const register = (form: AuthForm) => auth.register(form).then(res => {
    setUser(res)
    return Promise.resolve(res)
  }).catch(err => {
    return Promise.reject(err)
  })
  const logout = () => auth.logout().then(() => setUser(null))

  useEffect(() => {
    run(auth.initUser())
  }, [])

  if(isLoading) {
    return <FullPageLoading></FullPageLoading>
  }

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