import React from 'react'
import { Spin } from 'antd';
import { LoadingWrapper } from './style'

export default function FullPageLoading() {
  return (
    <LoadingWrapper>
      <Spin size="large"></Spin>
    </LoadingWrapper>
  )
}
