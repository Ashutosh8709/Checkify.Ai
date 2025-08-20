import React from 'react'
import doctor from '../../assets/doctor.png'
import {Brain} from "lucide-react";
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                AI-Powered Disease Diagnosis at Your <span className="text-blue-600">Fingertips</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Revolutionary AI-powered medical diagnosis system that provides accurate, fast, and reliable health
                assessments. Get instant medical insights with cutting-edge artificial intelligence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg cursor-pointer inline-block">
                    Start Free Diagnosis
                </Link>
                <button className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors cursor-pointer">
                  Watch Demo
                </button>
              </div>
              {/* <div className="flex items-center space-x-6 mt-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>FDA Approved</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-blue-500" />
                  <span>HIPAA Compliant</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-teal-500" />
                  <span>10M+ Users</span>
                </div>
              </div> */}
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img
                  src={doctor}
                  alt="Checkify AI Interface"
                  className="w-full h-auto rounded-lg"
                />
              <div className="absolute -top-4 -right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg">
                <Brain className="w-6 h-6" />
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Hero