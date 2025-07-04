import { useState, useEffect } from 'react'

const LoadingSpinner = () => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)

  const steps = [
    "Uploading image...",
    "Preprocessing data...",
    "Running AI analysis...",
    "Generating results..."
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % steps.length)
    }, 1000)

    return () => {
      clearInterval(interval)
      clearInterval(stepInterval)
    }
  }, [])

  return (
    <div className="text-center py-12">
      {/* Animated Spinner */}
      <div className="relative inline-flex items-center justify-center mb-6">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs mx-auto mb-4">
        <div className="bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <div className="text-sm text-gray-500 mt-2">
          {Math.min(Math.round(progress), 100)}% Complete
        </div>
      </div>

      {/* Current Step */}
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-gray-800">
          Analyzing Your Image
        </h3>
        <p className="text-blue-600 font-medium animate-pulse">
          {steps[currentStep]}
        </p>
        <p className="text-sm text-gray-500">
          This may take a few seconds...
        </p>
      </div>

      {/* Processing Steps Indicator */}
      <div className="mt-8 flex justify-center space-x-2">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>

      {/* Fun Facts */}
      <div className="mt-8 bg-blue-50 rounded-lg p-4 max-w-md mx-auto">
        <h4 className="font-medium text-blue-800 mb-2">Did you know?</h4>
        <p className="text-sm text-blue-700">
          Our AI model uses advanced Convolutional Neural Networks (CNN) with VGG16 architecture 
          to analyze medical images with high precision.
        </p>
      </div>
    </div>
  )
}

export default LoadingSpinner
