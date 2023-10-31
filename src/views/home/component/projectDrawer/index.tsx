import React, { memo } from 'react'
import { Drawer } from 'antd'

const ProjectDrawer = memo(({onClose, open}: {onClose: () => void; open: boolean}) => {
  return (
    <Drawer 
      width='100%'
      onClose={onClose} 
      open={open}>
        <p>Some contents...</p>
    </Drawer>
  )
})

export default ProjectDrawer