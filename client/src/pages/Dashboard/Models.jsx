import React from 'react'
import { Bone,Eye,Microscope,ArrowRight,Brain} from 'lucide-react'
import { Link } from 'react-router-dom'




const models = [
  {
    id: "brain_tumor",
    name: "Brain Tumor Analysis",
    description: "Advanced AI analysis of X-ray images for bone fractures, lung conditions, and abnormalities",
    icon: Brain,
    accuracy: "94.2%",
    processingTime: "2-3 seconds",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-blue-600",
  },
  {
    id: "retinopathy",
    name: "Diabitic Retinopathy Detection",
    description: "Identify skin lesions, moles, rashes, and potential dermatological conditions",
    icon: Eye,
    accuracy: "91.8%",
    processingTime: "1-2 seconds",
    color: "bg-green-500",
    gradient: "from-green-500 to-green-600",
  },
  {
    id: "osteoarthritis",
    name: "Osteoarthritis Detection",
    description: "ECG and cardiac imaging analysis for heart rhythm and structural abnormalities",
    icon: Bone,
    accuracy: "96.1%",
    processingTime: "3-4 seconds",
    color: "bg-red-500",
    gradient: "from-red-500 to-red-600",
  },
  {
    id: "chest_xray",
    name: "Chest X-Ray Analysis",
    description: "Microscopic image analysis for cellular abnormalities and tissue diagnosis",
    icon: Microscope,
    accuracy: "89.7%",
    processingTime: "4-5 seconds",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-purple-600",
  },
]

const Models = () => {
  return (
    <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Available AI Models</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {models.map((model) => {
              const IconComponent = model.icon
              return (
                <Link key={model.id} to={`/models/${model.id}`}>
                  <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 ${model.color} rounded-lg flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>

                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{model.name}</h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">{model.description}</p>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div>
                          <span className="text-gray-500">Accuracy:</span>
                          <span className="font-semibold text-gray-900 ml-1">{model.accuracy}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Speed:</span>
                          <span className="font-semibold text-gray-900 ml-1">
                            {model.processingTime}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
  )
}

export default Models