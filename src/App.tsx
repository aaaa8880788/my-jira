import React from 'react'
import { useAuth } from './context/auth-context'
import { ConfigProvider } from 'antd'
import Home from './views/home'
import Login from './views/login'

function App() {
  const { user } = useAuth()
  return (
    <ConfigProvider theme={{
      token: {
        // Seed Token，影响范围大
        // colorPrimary: '#00b96b',
      },
    }}>
      {
        user ? <Home></Home> : <Login></Login>
      }
    </ConfigProvider>
  )
}

export default App
