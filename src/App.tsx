import React from 'react'
import { useAuth } from './context/auth-context'
import { useGlobal } from './context/global-context'
import { Outlet,Navigate } from 'react-router-dom'

function App() {
  const { user } = useAuth()
  const {contextHolder} = useGlobal()
  return (
    <>
      {contextHolder}
      {
        user ? <Navigate to='/home'/> : <Navigate to='/login'/>
      }
      <Outlet></Outlet>
    </>
  )
}

export default App
