import React, { createContext, ReactNode, useContext } from "react";
import { message } from 'antd';

const GlobalContext = createContext<{
  messageApi: any
  contextHolder: any
} | undefined>(undefined);
GlobalContext.displayName = 'GlobalContext'

export const GlobalProvider = ({children}:{children:ReactNode}) => {
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <GlobalContext.Provider value={{messageApi, contextHolder}} children={children}></GlobalContext.Provider>
  )
}

export const useGlobal = () => {
  const context = useContext(GlobalContext)
  if(!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context
}