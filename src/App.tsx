import React from 'react'
import { useAuth } from './context/auth-context'
import { useGlobal } from './context/global-context'
import { Outlet, Navigate, useLocation } from 'react-router-dom'

function App() {
  const { user } = useAuth()
  const {contextHolder} = useGlobal()
  const location = useLocation()
  console.log(location);
  return (
    <>
      {contextHolder}
      {
        user ? <Navigate to={`${['/login',''].includes(location.pathname) ? '/home' : location.pathname}${location.search}`}/> : <Navigate to={`/login${location.search}`}/>
      }
      <Outlet></Outlet>
    </>
  )
}

export default App
