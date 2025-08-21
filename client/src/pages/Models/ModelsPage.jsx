"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useNavigate,Link } from "react-router-dom"
import { Upload, ArrowLeft, Download, Eye, Loader2, CheckCircle, AlertCircle, X,Stethoscope } from "lucide-react"
import axios from 'axios'
import { ToastContainer } from "react-toastify"
import { handleSuccess } from "../../utils"

const modelData = {
  "brain_tumor": {
    name: "Brain Tumor Analysis",
    description: "Upload X-ray images for AI-powered analysis of bone fractures, lung conditions, and abnormalities",
    acceptedFormats: ["JPEG", "PNG", "DICOM"],
    maxSize: "10MB",
    color: "bg-blue-500",
    icon: "🧠",
  },
  "retinopathy": {
    name: "Diabitic Retinopathy Detection",
    description: "Upload skin images to identify lesions, moles, rashes, and potential dermatological conditions",
    acceptedFormats: ["JPEG", "PNG"],
    maxSize: "5MB",
    color: "bg-green-500",
    icon: "👁️",
  },
  "osteoarthritis": {
    name: "Osteoarthritis Detection",
    description: "Upload ECG or cardiac imaging for heart rhythm and structural abnormality analysis",
    acceptedFormats: ["JPEG", "PNG", "PDF"],
    maxSize: "8MB",
    color: "bg-red-500",
    icon: "🦴",
  },
  "chest_xray": {
    name: "Chest X-Ray Analysis",
    description: "Upload microscopic images for cellular abnormality and tissue diagnosis analysis",
    acceptedFormats: ["JPEG", "PNG", "TIFF"],
    maxSize: "15MB",
    color: "bg-purple-500",
    icon: "🩻",
  },
}

export default function ModelPage() {
  const {id} = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const [uploadedFile, setUploadedFile] = useState(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [analysisResults, setAnalysisResults] = useState(null)
  const [dragActive, setDragActive] = useState(false)

  const modelId = id;
  const model = modelData[modelId]

  if (!model) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900  mb-2">Model Not Found</h1>
          <p className="text-gray-600 mb-4">The requested AI model could not be found.</p>
          <Link
            to="/dashboard"
            className="text-blue-600 hover:text-blue-700"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file) => {
    setUploadedFile(file)
    setAnalysisComplete(false)
    setAnalysisResults(null)
  }

  const startAnalysis = async () => {
  if (!uploadedFile) return;

  setIsAnalyzing(true);

  try {
    const formData = new FormData();
    formData.append("file", uploadedFile);

    // change URL to your Python server endpoint
    const response = await fetch(`https://checkifyai-models.up.railway.app/predict/${modelId}`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to analyze image");
    }
    const data = await response.json();
    

    // Example expected response from backend:
    // {
    //   confidence: 92,
    //   findings: ["Possible pneumonia detected"],
    //   riskLevel: "Medium",
    //   processingTime: "1.5 seconds"
    // }

    setAnalysisResults(data);
    setAnalysisComplete(true);
    const userId=localStorage.getItem('userId');
    const res=await axios.post('https://checkifyai.up.railway.app/models/savePrediction',{userId,modelId,confidence:data.confidence,prediction:data.prediction});
    const result=res.data;
    const {success,error,message}=result;
    if(success){handleSuccess(message);}
    else if(error){
      const details=error.details[0].message;
      handleError(details);
    }else if(!success){handleError(message);}
  } catch (error) {
    console.error("Analysis error:", error);
    setAnalysisResults({
      confidence: 0,
      model:'no_model',
      prediction: "Error during analysis. Please try again.",
      all_predictions:{
        Glioma: 0.00000,
        Meningioma: 0.00000,
        No_tumor: 0.00000,
        Pituitary: 0.0000,
      }
    });
    setAnalysisComplete(true);
  } finally {
    setIsAnalyzing(false);
  }
};


  const resetAnalysis = () => {
    setUploadedFile(null)
    setAnalysisComplete(false)
    setAnalysisResults(null)
    setIsAnalyzing(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  function generateKeyFindings(result) {
    if(result){
      
      // Sort predictions by probability
      const { prediction, confidence, all_predictions } = result;
      const sortedPreds = Object.entries(all_predictions)
      .sort((a, b) => b[1] - a[1]);
      
      const topPrediction = sortedPreds[0];
      const secondPrediction = sortedPreds[1];
      
      // Generate human-readable findings
      return {
        primary: `The model suggests *${prediction}* with a confidence of ${confidence.toFixed(2)}%.`,
        differential: `Other possible findings: ${secondPrediction[0]} (${(secondPrediction[1] * 100).toFixed(2)}%).`,
        summary: confidence > 90
        ? "High confidence in the result."
        : confidence > 80
        ? "Moderate confidence — further review advised."
        : "Low confidence — clinical correlation recommended."
      };
    }
}

const findings = generateKeyFindings(analysisResults);  
  return (
    <div className="min-h-screen bg-gray-50 ">
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
            <Link
              to="/dashboard"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-blue-600" />
            </div>
              <span className="text-xl font-bold text-gray-900">Checkify</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-12 h-12 ${model.color} rounded-lg flex items-center justify-center text-2xl`}>
              {model.icon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 ">{model.name}</h1>
              <p className="text-gray-600">{model.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upload Medical Image</h2>

              {!uploadedFile ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                    dragActive
                      ? "border-blue-400 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Drop your image here, or click to browse
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Supported formats: {model.acceptedFormats.join(", ")} • Max size: {model.maxSize}
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Choose File
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/*,.dcm"
                    onChange={handleFileInput}
                  />
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-blue-600"/>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                          <p className="text-sm text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={resetAnalysis}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {!isAnalyzing && !analysisComplete && (
                    <button
                      onClick={startAnalysis}
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                    >
                      Start AI Analysis
                    </button>
                  )}

                  {isAnalyzing && (
                    <div className="text-center py-8">
                      <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Analyzing Image...</h3>
                      <p className="text-gray-600">Our AI is processing your medical image</p>
                    </div>
                  )}

                  {analysisComplete && analysisResults && (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 text-green-600">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Analysis Complete</span>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Results Summary</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Findings: </span>
                            <span className="font-medium text-gray-900">
                              Possible {analysisResults.prediction} Detected!
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Confidence Level:</span>
                            <span className="font-medium text-gray-900">
                              {analysisResults.confidence.toFixed(2)}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                              <span className="text-gray-600">Risk Level:</span>
                              <span className={`font-medium ${analysisResults.confidence <= 80 ? "text-green-600" : analysisResults.confidence <= 90 ? "text-yellow-600": "text-red-600"}`}>
                                    {analysisResults.confidence <= 80 ? "Low" : analysisResults.confidence <= 90 ? 'Medium' : 'High'}
                              </span>
                          </div>
                        <div className="mt-4">
                          <h5 className="font-medium text-gray-900 mb-2">All Predictions</h5>
                          <div className="space-y-1">
                            {analysisResults.all_predictions &&
                                  Object.entries(analysisResults.all_predictions).map(([key, value]) => (
                                  <div key={key} className="flex justify-between text-sm">
                                    <span className="text-gray-600">{key}</span>
                                    <span className="font-medium text-gray-900">{(value * 100).toFixed(2)}%</span>
                                  </div>))}
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <h4 className="font-medium text-gray-900 mb-3">Key Findings</h4>
                        <ul className="space-y-1">
                            <li className="text-gray-700 text-sm">
                              • {findings.primary}                              
                            </li>
                            <li className="text-gray-700 text-sm">
                              • {findings.differential}                              
                            </li>
                            <li className="text-gray-700 text-sm">
                              • {findings.summary}                              
                            </li>
                        </ul>
                      </div>

                      <div className="flex space-x-3">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                          <Download className="w-4 h-4" />
                          <span>Download Report</span>
                        </button>
                        <button
                          onClick={resetAnalysis}
                          className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                          New Analysis
                        </button>
                      </div>
                    </div>
                  </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Model Information</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-gray-600">Accuracy Rate:</span>
                  <span className="font-medium text-gray-900 ml-2">94.2%</span>
                </div>
                <div>
                  <span className="text-gray-600">Processing Speed:</span>
                  <span className="font-medium text-gray-900 ml-2">2-3 seconds</span>
                </div>
                <div>
                  <span className="text-gray-600">Supported Formats:</span>
                  <span className="font-medium text-gray-900 ml-2">
                    {model.acceptedFormats.join(", ")}
                  </span>
                </div>
                <div>
                  <span className="text-gray-600">Max File Size:</span>
                  <span className="font-medium text-gray-900 ml-2">{model.maxSize}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl border border-blue-200 p-6">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-900  mb-2">Important Notice</h4>
                  <p className="text-sm text-blue-800">
                    This AI analysis is for diagnostic assistance only and should not replace professional medical
                    judgment. Always consult with qualified healthcare professionals for final diagnosis and treatment
                    decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )}
