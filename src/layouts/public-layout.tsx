import React from 'react'
import { Outlet } from 'react-router-dom'

type Props = {}

const PublicLayout = (props: Props) => {
  return (
    <div className='min-h-[100vh] flex justify-center items-center'>
        <Outlet />
    </div>
  )
}

export default PublicLayout