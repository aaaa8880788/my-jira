import React,{ ReactNode } from "react";
import { AuthProvider } from "./auth-context";
import { GlobalProvider } from "./global-context";

export const AppProviders = ({children}:{children: ReactNode}) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </GlobalProvider>
  )
}