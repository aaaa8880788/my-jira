// hook说明
// 该hook用于对初始值进行一系列操作后可以对操作的历史（过去）或将来进行回退
import { useCallback, useState } from "react"

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: []
  })

  const canUndo = state.past.length !== 0
  const canRedo = state.future.length !== 0

  const undo = useCallback(() => {
    // 从历史记录中进行切割，将历史记录中最近的一个值作为当前值，历史记录的其余值作为新的历史记录，而原来的当前值作为将来值放进将来记录数组中
    setState(currentState => {
      const {past, present, future} = currentState
      if(past.length === 0) {
        return currentState
      }
      const previous = past[past.length - 1]
      const newPast = past.slice(0, past.length - 1)
      
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      }
    })
  }, [])

  const redo = useCallback(() => {
    // 从将来记录中进行切割，将将来记录中最近的一个值作为当前值，将来记录的其余值作为新的将来记录，而原来的当前值作为历史值放进历史记录数组中
    setState(currentState => {
      const {past, present, future} = currentState
      if(future.length === 0) {
        return currentState
      }
      const next = future[0]
      const newFeture = future.slice(1)
      return {
        past: [...past, present],
        present: next,
        future: newFeture,
      }
    })
  }, [])

  const set = useCallback((newPresent: T) => {
    setState(currentState => {
      const {past, present, future} = currentState
      if(newPresent === currentState) return currentState
      // 设置值的时候不需要future数组，所以置空，因为只有undo（撤销回退操作）了，才会有redo（前进操作）
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      }
    })
  }, [])

  const reset = useCallback((newPresent: T) => {
    setState(currentState => ({
      past: [],
      present: newPresent,
      future: [],
    }))
  }, [])

  return [
    state,
    {set, reset, undo, redo, canUndo, canRedo}
  ] as const
}