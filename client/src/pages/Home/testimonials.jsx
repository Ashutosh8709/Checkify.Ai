import React from 'react'
import {Star} from "lucide-react";

const testimonials = () => {
  return (
    <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Trusted by Healthcare Professionals</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what doctors and patients are saying about Checkify's AI-powered medical diagnosis system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "Checkify has revolutionized how we approach preliminary diagnosis. The accuracy is remarkable and it
                saves us valuable time in patient consultations."
              </p>
              <div className="flex items-center">
                <img src="/professional-doctor-headshot.png" alt="Dr. Sarah Johnson" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Dr. Sarah Johnson</h4>
                  <p className="text-gray-500 text-sm">Chief of Internal Medicine</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "As a patient, Checkify gave me peace of mind with instant analysis of my symptoms. The detailed reports
                helped me have better conversations with my doctor."
              </p>
              <div className="flex items-center">
                <img src="/happy-patient-headshot.png" alt="Michael Chen" className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-semibold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-500 text-sm">Patient</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                "The AI diagnostic capabilities are impressive. It's become an essential tool in our emergency
                department for quick preliminary assessments."
              </p>
              <div className="flex items-center">
                <img
                  src="/emergency-doctor-headshot.png"
                  alt="Dr. Emily Rodriguez"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">Dr. Emily Rodriguez</h4>
                  <p className="text-gray-500 text-sm">Emergency Medicine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default testimonials