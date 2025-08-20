import React from 'react'
import { useNavigate } from 'react-router-dom';
import {Stethoscope} from "lucide-react";
import { handleError,handleSuccess } from '../../utils';

const Navbar = () => {
    const loggedinUser=localStorage.getItem('loggedinUser');
    const navigate=useNavigate();
  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-blue-600" />
              </div>
              <span className="text-xl font-bold text-gray-900">Checkify</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 transition-colors">
                How It Works
              </a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">
                Testimonials
              </a>
              <a href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                Contact
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
                {loggedinUser ? (<button className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" onClick={() => {
                            localStorage.removeItem('userId');
                            localStorage.removeItem('token');
                            localStorage.removeItem('loggedinUser');
                            handleSuccess('User Logged Out');
                            setTimeout(() => {
                              navigate('/');
                            }, 1000);}}>Log out</button>) :(<>
                <button className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer" onClick={()=>navigate('/login')}>Log In</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer" onClick={()=>navigate('/signup')}>
                    Get Started
                </button></>)}
            </div>
          </div>
        </div>
      </nav>
  )
}

export default Navbar