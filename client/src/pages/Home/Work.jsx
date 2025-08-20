import React from 'react'
import {
  Upload,
  Brain,
  CheckCircle,
} from "lucide-react";

const Work = () => {
  return (
    <section id='how-it-works' className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">How Checkify Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get accurate medical diagnosis in three simple steps using our advanced AI technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Upload Medical Data</h3>
              <p className="text-gray-600 leading-relaxed">
                Upload your medical images, lab results, or simply describe your symptoms. Our system accepts multiple
                formats including X-rays, MRIs, and blood tests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-white" />
              </div>
            
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed">
                Our advanced AI algorithms analyze your data using machine learning models trained on millions of
                medical cases for accurate diagnosis.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Get Results</h3>
              <p className="text-gray-600 leading-relaxed">
                Receive comprehensive diagnostic reports with treatment recommendations, risk assessments, and next
                steps for your healthcare journey.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Work