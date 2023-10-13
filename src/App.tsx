import React from 'react'
import { useAuth } from './context/auth-context'
import { ConfigProvider } from 'antd'
import Home from './views/home'
import Login from './views/login'
import { useGlobal } from './context/global-context'

function App() {
  const { user } = useAuth()
  const {contextHolder} = useGlobal()
  return (
    <ConfigProvider theme={{
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#00b96b',
      },
    }}>
      {contextHolder}
      {
        user ? <Home></Home> : <Login></Login>
      }
    </ConfigProvider>
  )
}

export default App
