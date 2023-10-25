import { useMountedRef } from './index';
import { useCallback, useState } from 'react';
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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  })

  const [retry, setRetry] = useState(() => () => {})
  const mountedRef = useMountedRef()

  const setData = (data: D) => {
    setState({
      data,
      status: 'success',
      error: null
    })
  }

  const setError = (error: Error) => setState({
    error,
    status: 'error',
    data: null
  })

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
      setState({
        ...state,
        status: 'loading'
      })
      promise.then(data => {
        // 组件未卸载的时候才执行
        if(mountedRef.current) {
          setData(data)
        }
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