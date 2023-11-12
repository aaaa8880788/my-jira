import React, { memo } from 'react'
import { Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { selectProjectDrawerOpen, homeAction } from '@/store/home'

const ProjectDrawer = memo(() => {
  const dispatch = useDispatch()
  const projectDrawerOpen = useSelector(selectProjectDrawerOpen)
  return (
    <Drawer 
      width='100%'
      onClose={ () => {dispatch(homeAction.closeProjectDrawer())} } 
      open={projectDrawerOpen}>
        <p>Some contents...</p>
    </Drawer>
  )
})

export default ProjectDrawer