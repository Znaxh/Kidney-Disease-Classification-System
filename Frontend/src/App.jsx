import { useState, useEffect, useRef } from 'react'
import './App.css'
import useResponsive from './hooks/useResponsive'

function App() {
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [uploadedImage, setUploadedImage] = useState(null)
  const [dragActive, setDragActive] = useState(false)
  const [apiStatus, setApiStatus] = useState('checking')
  const fileInputRef = useRef(null)

  // Use responsive hook for better mobile experience
  const { isMobile, isTablet, isSmallScreen } = useResponsive()

  // Check API health on component mount
  useEffect(() => {
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
      const response = await fetch(`${apiUrl}/health`)
      if (response.ok) {
        setApiStatus('connected')
      } else {
        setApiStatus('disconnected')
      }
    } catch (error) {
      setApiStatus('disconnected')
    }
  }

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = (error) => reject(error)
    })
  }

  const validateImageFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png']
    const maxSize = 10 * 1024 * 1024 // 10MB

    if (!validTypes.includes(file.type)) {
      throw new Error('Please upload a valid image file (JPEG, JPG, or PNG)')
    }

    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB')
    }

    return true
  }

  const handleImageUpload = async (imageFile) => {
    setIsLoading(true)
    setError(null)
    setPrediction(null)

    try {
      validateImageFile(imageFile)
      const base64Image = await convertToBase64(imageFile)
      setUploadedImage(URL.createObjectURL(imageFile))

      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080'
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          image: base64Image.split(',')[1]
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setPrediction(result)
    } catch (err) {
      setError(err.message || 'Failed to classify image. Please try again.')
      console.error('Prediction error:', err)
    } finally {
      setIsLoading(false)
    }
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
      handleImageUpload(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleImageUpload(e.target.files[0])
    }
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleReset = () => {
    setPrediction(null)
    setError(null)
    setUploadedImage(null)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-white to-cyan-50 overflow-x-hidden">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="w-full max-w-none px-4 lg:px-6 xl:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-3 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  KidneyAI
                </h1>
                <p className="text-sm text-gray-500">Disease Classification System</p>
              </div>
            </div>

            {/* API Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                apiStatus === 'connected' ? 'bg-green-500' :
                apiStatus === 'disconnected' ? 'bg-red-500' : 'bg-yellow-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {apiStatus === 'connected' ? 'API Connected' :
                 apiStatus === 'disconnected' ? 'API Disconnected' : 'Checking...'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 lg:px-6 xl:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-4 lg:mb-6">
            AI-Powered Kidney
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent block">
              Disease Detection
            </span>
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed px-4">
            Upload kidney CT scan images for instant AI analysis. Our advanced CNN model
            provides accurate classification to assist in medical diagnosis.
          </p>
        </div>

        {/* Main Interface */}
        <div className="w-full max-w-7xl mx-auto">
          <div className={`grid gap-6 lg:gap-8 ${
            isSmallScreen ? 'grid-cols-1' : 'grid-cols-1 xl:grid-cols-2'
          }`}>

            {/* Upload Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                Upload CT Scan
              </h3>

              {/* Upload Area */}
              <div
                className={`relative border-2 border-dashed rounded-xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50'
                    : uploadedImage
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                } ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleChange}
                  disabled={isLoading}
                />

                {uploadedImage ? (
                  <div className="space-y-4">
                    <div className="relative inline-block">
                      <img
                        src={uploadedImage}
                        alt="Uploaded CT scan"
                        className="max-w-full max-h-64 rounded-lg shadow-md"
                      />
                      {!isLoading && (
                        <button
                          onClick={onButtonClick}
                          className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors"
                          title="Upload new image"
                        >
                          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      ✓ Image uploaded successfully!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 lg:space-y-6">
                    <div className="text-gray-400">
                      <svg className="w-16 h-16 lg:w-20 lg:h-20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>

                    <div>
                      <p className="text-xl font-medium text-gray-700 mb-2">
                        Drop your CT scan here
                      </p>
                      <p className="text-gray-500 mb-6">
                        or click to browse files
                      </p>
                    </div>

                    <button
                      onClick={onButtonClick}
                      disabled={isLoading}
                      className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2.5 lg:px-8 lg:py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm lg:text-base"
                    >
                      {isLoading ? 'Processing...' : 'Choose File'}
                    </button>

                    <div className="text-xs text-gray-400 space-y-1">
                      <p>Supported: JPEG, PNG, JPG • Max size: 10MB</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              )}

              {/* Upload Guidelines */}
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Guidelines:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Use high-quality kidney CT scan images</li>
                  <li>• Ensure clear, well-lit medical images</li>
                  <li>• Avoid blurry or low-resolution files</li>
                </ul>
              </div>
            </div>

            {/* Results Section */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-6 lg:p-8 border border-gray-200">
              <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                Analysis Results
              </h3>

              {isLoading && (
                <div className="text-center py-12">
                  <div className="relative inline-flex items-center justify-center mb-6">
                    <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-600 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  <h4 className="text-lg font-medium text-gray-800 mb-2">Analyzing Image</h4>
                  <p className="text-blue-600 font-medium animate-pulse">Processing your CT scan...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
                </div>
              )}

              {prediction && !isLoading && (
                <div className="space-y-6">
                  {/* Main Result */}
                  <div className={`rounded-xl p-6 ${
                    prediction.prediction.toLowerCase() === 'normal'
                      ? 'bg-green-50 border border-green-200'
                      : 'bg-red-50 border border-red-200'
                  }`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className={`${
                        prediction.prediction.toLowerCase() === 'normal'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {prediction.prediction.toLowerCase() === 'normal' ? (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <h4 className={`text-xl font-bold ${
                          prediction.prediction.toLowerCase() === 'normal'
                            ? 'text-green-800'
                            : 'text-red-800'
                        }`}>
                          {prediction.prediction.toLowerCase() === 'normal'
                            ? 'Normal Kidney Tissue'
                            : 'Tumor Detected'}
                        </h4>
                        <p className={`${
                          prediction.prediction.toLowerCase() === 'normal'
                            ? 'text-green-600'
                            : 'text-red-600'
                        } text-sm font-medium`}>
                          Classification: {prediction.prediction}
                        </p>
                      </div>
                    </div>

                    <p className={`${
                      prediction.prediction.toLowerCase() === 'normal'
                        ? 'text-green-700'
                        : 'text-red-700'
                    } mb-4`}>
                      {prediction.prediction.toLowerCase() === 'normal'
                        ? 'The AI analysis indicates normal kidney tissue with no signs of tumors or abnormalities.'
                        : 'The AI analysis has detected potential tumor presence in the kidney tissue.'}
                    </p>

                    <div className={`${
                      prediction.prediction.toLowerCase() === 'normal'
                        ? 'bg-green-100'
                        : 'bg-red-100'
                    } rounded-lg p-4`}>
                      <h5 className={`font-medium ${
                        prediction.prediction.toLowerCase() === 'normal'
                          ? 'text-green-800'
                          : 'text-red-800'
                      } mb-2`}>
                        Recommendation:
                      </h5>
                      <p className={`${
                        prediction.prediction.toLowerCase() === 'normal'
                          ? 'text-green-700'
                          : 'text-red-700'
                      } text-sm`}>
                        {prediction.prediction.toLowerCase() === 'normal'
                          ? 'Continue regular health checkups and maintain a healthy lifestyle.'
                          : 'Please consult with a medical professional immediately for further evaluation and treatment options.'}
                      </p>
                    </div>
                  </div>

                  {/* Technical Details */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Technical Details</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-1">Processing Time</div>
                        <div className="font-medium text-gray-800">
                          {prediction.processing_time ? `${prediction.processing_time}s` : 'N/A'}
                        </div>
                      </div>
                      <div className="bg-white rounded-lg p-4">
                        <div className="text-sm text-gray-500 mb-1">Model Type</div>
                        <div className="font-medium text-gray-800">CNN + VGG16</div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleReset}
                      className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-xl hover:bg-gray-700 transition-colors font-medium"
                    >
                      Upload New Image
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-colors font-medium"
                    >
                      Save Results
                    </button>
                  </div>

                  {/* Medical Disclaimer */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <div className="text-yellow-600 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="font-medium text-yellow-800 mb-1">Medical Disclaimer</h5>
                        <p className="text-sm text-yellow-700">
                          This AI tool is for educational and research purposes only. It should not be used as a substitute for professional medical diagnosis or treatment.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!prediction && !isLoading && !error && (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <p className="text-gray-500 text-lg">
                    Upload a CT scan image to see analysis results
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-12 lg:mt-16 bg-white/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200">
          <h3 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 lg:mb-8 text-center">
            How It Works
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Upload Image</h4>
              <p className="text-gray-600 text-sm">
                Upload a kidney CT scan image in JPG, PNG, or JPEG format
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">AI Analysis</h4>
              <p className="text-gray-600 text-sm">
                Our CNN model analyzes the image using advanced deep learning
              </p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Get Results</h4>
              <p className="text-gray-600 text-sm">
                Receive instant classification: Normal or Tumor detected
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 lg:py-8 mt-12 lg:mt-16">
        <div className="w-full px-4 lg:px-6 xl:px-8 text-center">
          <p className="text-gray-400 text-sm lg:text-base">
            © 2024 KidneyAI. Built with React, FastAPI, and TensorFlow.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
