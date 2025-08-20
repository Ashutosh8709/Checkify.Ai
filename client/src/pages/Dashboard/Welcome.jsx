import React from 'react'

const Welcome = () => {
    const loggedinUser=localStorage.getItem('loggedinUser');
  return (
    <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome, {loggedinUser}</h1>
          <p className="text-gray-600">Select an AI model to begin your medical image analysis</p>
    </div>
  )
}

export default Welcome