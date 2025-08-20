import React from 'react'
import {
  Heart,
  Shield,
  Zap,
  Users,
  Upload,
  Brain,
} from "lucide-react";

const Features = () => {
  return (
    <section id='features' className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Advanced AI Medical Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by cutting-edge artificial intelligence and machine learning algorithms to provide the most
              accurate medical diagnoses.
            </p>
          </div>
        
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group cursor-pointer">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-blue-600">
                <Brain className="w-8 h-8 text-blue-600 transition-colors duration-300 group-hover:text-white"/>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI-Powered Analysis</h3>
            <p className="text-gray-600 leading-relaxed">
                Advanced machine learning algorithms analyze symptoms and medical data to provide accurate diagnostic
                suggestions with 95% accuracy rate.
            </p>
        </div>



            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group cursor-pointer">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-teal-600">
                <Zap className="w-8 h-8 text-teal-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 ">Instant Results</h3>
              <p className="text-gray-600 leading-relaxed ">
                Get comprehensive medical analysis and diagnostic reports in under 30 seconds. No more waiting for hours
                or days for results.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group cursor-pointer">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-green-600">
                <Shield className="w-8 h-8 text-green-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 ">Secure & Private</h3>
              <p className="text-gray-600 leading-relaxed ">
                Your medical data is encrypted and protected with bank-level security. HIPAA compliant and fully
                confidential medical analysis.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group cursor-pointer">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-purple-600">
                <Heart className="w-8 h-8 text-purple-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 ">Comprehensive Care</h3>
              <p className="text-gray-600 leading-relaxed ">
                Complete health monitoring including vital signs analysis, symptom tracking, and personalized health
                recommendations.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group cursor-pointer">
              <div className="mx-auto w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-orange-600">
                <Users className="w-8 h-8 text-orange-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 ">Expert Network</h3>
              <p className="text-gray-600 leading-relaxed ">
                Connect with certified medical professionals for second opinions and detailed consultations when needed.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 text-center group cursor-pointer">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6 transition-colors duration-300 group-hover:bg-indigo-600">
                <Upload className="w-8 h-8 text-indigo-600 transition-colors duration-300 group-hover:text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4 ">Easy Upload</h3>
              <p className="text-gray-600 leading-relaxed ">
                Simply upload medical images, lab results, or describe symptoms. Our AI handles multiple input formats
                seamlessly.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Features