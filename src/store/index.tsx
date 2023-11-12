import { configureStore } from '@reduxjs/toolkit'
import homeReducer from './home'
import loginReducer from './login'

export const rootReducer = {
  home: homeReducer,
  login: loginReducer
}

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch