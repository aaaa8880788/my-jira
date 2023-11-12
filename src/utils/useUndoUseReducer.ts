// hook说明
// 该hook用于对初始值进行一系列操作后可以对操作的历史（过去）或将来进行回退
// 用useReducer进行管理
import { useCallback, useReducer } from "react"

const UNDO = 'UNDO'
const REDO = 'REDO'
const SET = 'SET'
const RESET = 'RESET'

type State<T> = {
  past: T[];
  present: T;
  future: T[];
}

type Action<T> = {
  type: typeof UNDO | typeof REDO | typeof SET | typeof RESET;
  newPresent?: T;
}

const undoReducer = <T>(state: State<T>, action: Action<T>) => {
  const {
    past,
    present,
    future
  } = state
  const {
    newPresent,
    type,
  } = action

  switch (type) {
    case UNDO: {
      if(past.length === 0) {
        return state
      }
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    }
    case REDO:  {
      // 从将来记录中进行切割，将将来记录中最近的一个值作为当前值，将来记录的其余值作为新的将来记录，而原来的当前值作为历史值放进历史记录数组中
      if(future.length === 0) {
        return state
      }
      const next = future[0]
      const newFeture = future.slice(1)

      return {
        past: [...past, present],
        present: next,
        future: newFeture,
      }
    }
    case SET: {
      if(newPresent === present) return state
      // 设置值的时候不需要future数组，所以置空，因为只有undo（撤销回退操作）了，才会有redo（前进操作）

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    }
    case RESET: {
      return {
        past: [],
        present: newPresent,
        future: [],
      }
    }
  }
}

export const useUndo = <T>(initialPresent: T) => {
  const [state, dispatch] = useReducer(undoReducer, {
    past: [],
    present: initialPresent,
    future: []
  } as State<T>)

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => dispatch({
    type: UNDO
  }), [])
  const redo = useCallback(() => dispatch({
    type: REDO
  }), [])
  const set = useCallback((newPresent: T) => dispatch({
    type: SET,
    newPresent
  }), [])
  const reset = useCallback((newPresent: T) => dispatch({
    type: RESET,
    newPresent
  }), [])

  return [
    state,
    {set, reset, undo, redo, canUndo, canRedo}
  ] as const
}