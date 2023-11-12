import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from 'antd'
import { AppProviders } from './context/index'
import './assets/css/global.css'
import router from './router'
import { store } from './store'
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={{
        token: {
          // Seed Token，影响范围大
          colorPrimary: '#00b96b',
        },
      }}>
        <AppProviders>
          <RouterProvider router={router} />
        </AppProviders>
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
)
