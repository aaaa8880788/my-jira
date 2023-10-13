import React from 'react'
import { useRouteError } from "react-router-dom";
import { Link } from 'react-router-dom'
import { Empty } from 'antd'
import { ErrorPageWrapper } from './style' 

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <ErrorPageWrapper>
      <Link to='/'>
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Not Found"/>
      </Link>
    </ErrorPageWrapper>
  );
}