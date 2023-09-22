import { useEffect, useState } from 'react';
export const isFalsy = (value: unknown) => value === 0 ? false : !value

export const cleanObject = (object:Record<string,any>) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if(isFalsy(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}

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