import { useEffect, useState, useRef } from 'react';
export const isVoid = (value: any) => [undefined, null, ''].includes(value)

// 清除对象的空值
export const cleanObject = (object:Record<string,unknown>) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if(isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

// 防抖hook
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value)
  
  useEffect(() => {
    const timeout = setTimeout(() => setDebounceValue(value), delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debounceValue
}

export const useArray = <T>(initialValue: Array<T>) => {
  const [value, setValue] = useState(initialValue)
  const add = (item: T) => {
    setValue([...value, item])
  }
  const clear = () => {
    setValue([])
  }
  const removeIndex = (index: number) => {
    const originValue = [...value]
    originValue.splice(index, 1)
    setValue(originValue)
  }
  return {
    value,
    add,
    clear,
    removeIndex
  }
}

// 修改页面标题
export const useDocumentTitle = (title: string, keepOnUnmount: boolean = true) => {
  // 保留旧的title
  const oldTitle = useRef(document.title).current

  useEffect(() => {
    document.title = title
  }, [title])  

  useEffect(() => {
    return () => {
      // 如果传false,则还原旧title,否则一直更新title
      if(!keepOnUnmount) {
        document.title = oldTitle
      }
    }
  }, [keepOnUnmount, oldTitle])
}

// 返回组件的挂载状态，如果还没挂载或者已经卸载，返回 false ，反之，返回 true
export const useMountedRef = () => {
  const mountedRef = useRef(false)
  useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  })
  
  return mountedRef
}