import React from 'react'
import Navbar from './Navbar'
import Welcome from './Welcome'
import Stats from './Stats'
import Models from './Models'
import Recent from './Recent'
import { ToastContainer } from 'react-toastify'



const Dashboard = () => {
    return(
        <div className="min-h-screen bg-gray-50 ">
        <Navbar/>
        <div className="max-w-7xl mx-auto px-6 py-8">
        <Welcome/>
        <Stats/>
        <Models/>
        <Recent/>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default Dashboard