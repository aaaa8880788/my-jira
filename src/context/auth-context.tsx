// 用redux thunk的方法来实现登录信息存储
import React, { ReactNode, useCallback, useEffect } from "react";
import { useAsync } from "@/utils/useAsync";
import FullPageLoading from "@/views/fullPageLoading";
import { useDispatch, useSelector } from "react-redux";
import { loginThunk, registerThunk, logoutThunk, selectUser, initUser } from "@/store/login";

interface AuthForm {
  username: string,
  password: string
}

interface User {
  username: string,
  token: string
}


export const AuthProvider = ({children}:{children:ReactNode}) => {
  const {run, isLoading} = useAsync<User | null>()
  const dispatch: any = useDispatch()
  const user = useSelector(selectUser)
  useEffect(() => {
    if(!user) {
      run(dispatch(initUser()))
    }
  }, [])

  if(isLoading) {
    return <FullPageLoading></FullPageLoading>
  }

  return (
    <>
      {children}
    </>
  )
}

export const useAuth = () => {
  const dispatch:any = useDispatch()
  const user = useSelector(selectUser)
  const login = useCallback((form: AuthForm) => dispatch(loginThunk(form)), [dispatch])
  const register = useCallback((form: AuthForm) => dispatch(registerThunk(form)), [dispatch])
  const logout = useCallback(() => dispatch(logoutThunk()), [dispatch])
  return {
    user,
    login,
    register,
    logout
  }
}