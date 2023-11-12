import { createSlice } from "@reduxjs/toolkit"
import { AppDispatch, RootState } from ".."
import * as auth from '@/utils/authProvider'

interface User {
  username: string,
  token: string
}

interface State {
  user: User | null
}

interface AuthForm {
  username: string, 
  password: string
}

const initialState: State = {
  user: null
}

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload
    },
  },
})

export const selectUser = (state:RootState) => state.login.user
export const loginAction = loginSlice.actions 
export default loginSlice.reducer

export const loginThunk = (form: AuthForm) => (dispatch: AppDispatch) => (
  auth.login(form).then(user => dispatch(loginAction.setUser(user)))
)

export const registerThunk = (form: AuthForm) => (dispatch: AppDispatch) => (
  auth.register(form).then(user => dispatch(loginAction.setUser(user)))
)

export const logoutThunk = () => (dispatch: AppDispatch) => (
  auth.logout().then(() => dispatch(loginAction.setUser(null)))
)

export const initUser = () => (dispatch: AppDispatch) => (
  auth.initUser().then(user => dispatch(loginAction.setUser(user)))
)

