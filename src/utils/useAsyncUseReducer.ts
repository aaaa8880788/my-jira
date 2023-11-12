import { useMountedRef } from './index';
import { useCallback, useReducer, useState } from 'react';
interface State<D> {
  status: 'idle' | 'loading' | 'error' | 'success';
  data: D | null;
  error: Error | null;
}

const defaultInitialState: State<null> = {
  status: 'idle',
  error: null,
  data: null
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback((...args: T[]) => (mountedRef.current ? dispatch(...args) : void 0), [mountedRef, dispatch])
}

const asyncReducer = <D>(state: State<D>, action: Partial<State<D>>) => {
  return {
    ...state,
    ...action
  }
}

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, dispatch] = useReducer(asyncReducer, {
    ...defaultInitialState,
    ...initialState
  })

  const [retry, setRetry] = useState(() => () => {})
  const saveDispatch = useSafeDispatch(dispatch)

  const setData = (data: D) => (
    saveDispatch({
      data,
      status: 'success',
      error: null
    })
  )

  const setError = (error: Error) => (
    saveDispatch({
      error,
      status: 'error',
      data: null
    })
  )

  // run 用来触发异步请求
  const run = useCallback((promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
    return new Promise((resolve, reject) => {
      if(!promise || !promise.then) {
        throw new Error("请传入 Promise 类型数据");
      }
      setRetry(() => () => {
        if(runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      })
      saveDispatch({
        status: 'loading'
      })
      promise.then(data => {
        // 组件未卸载的时候才执行
        setData(data)
        resolve(data) 
      }).catch(error => {
        setError(error)
        reject(error) 
      })
    })
  }, [])

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    retry,
    ...state,
  }
}