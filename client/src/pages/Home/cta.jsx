import React from 'react'

const cta = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Experience AI-Powered Medical Diagnosis?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join thousands of healthcare professionals and patients who trust Checkify for accurate, fast, and reliable
            medical analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg cursor-pointer">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors cursor-pointer">
              Schedule Demo
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-6">No credit card required • 14-day free trial • Cancel anytime</p>
        </div>
      </section>
  )
}

export default cta