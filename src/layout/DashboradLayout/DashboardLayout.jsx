import { Sidebar } from '../../components/dashboardComponents/Sidebar'
import { Outlet } from 'react-router'

export const DashboardLayout = () => {
  return (
    <div className='flex gap-5'>
        <aside className=''>
            <Sidebar/>
        </aside>
<<<<<<< HEAD
        <aside className='flex-4 mr-5 mb-5 mt-5 bg-gray-50'> 
=======
        <aside className='flex-1 bg-gray-50 flex justify-center items-center'>
>>>>>>> a3670899076368960b0cc82cf28cdcba2a0624b2
            <Outlet></Outlet>
        </aside>
    </div>
  )
}
