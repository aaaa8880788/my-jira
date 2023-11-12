import { useUndo } from '@/utils/useUndoUseReducer'
import { Button } from 'antd'
import React, { memo } from 'react'

const TestPage = memo(() => {
  const [state, config] = useUndo(0)
  return (
    <div className='TestPage'>
      <h2>You clicked {state.present as number} times</h2>
      <Button onClick={() => {config.set(state.present as number + 1)}}>+</Button>
      <Button onClick={() => {config.set(state.present as number - 1)}}>-</Button>
      <Button disabled={!config.canUndo} onClick={() => {config.undo()}}>undo</Button>
      <Button disabled={!config.canRedo} onClick={() => {config.redo()}}>redo</Button>
      <Button onClick={() => {config.reset(0)}}>reset</Button>
    </div>
  )
})

export default TestPage