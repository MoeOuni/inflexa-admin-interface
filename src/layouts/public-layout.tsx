import { Outlet } from 'react-router-dom'


const PublicLayout = () => {
  return (
    <div className='min-h-[100vh] flex justify-center items-center'>
        <Outlet />
    </div>
  )
}

export default PublicLayout