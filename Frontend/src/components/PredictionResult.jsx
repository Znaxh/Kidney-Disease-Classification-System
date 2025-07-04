const PredictionResult = ({ prediction, onReset }) => {
  const isNormal = prediction.prediction.toLowerCase() === 'normal'
  
  const getResultColor = () => {
    return isNormal ? 'green' : 'red'
  }

  const getResultIcon = () => {
    if (isNormal) {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    } else {
      return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      )
    }
  }

  const getResultMessage = () => {
    if (isNormal) {
      return {
        title: "Normal Kidney Tissue",
        description: "The AI analysis indicates normal kidney tissue with no signs of tumors or abnormalities.",
        recommendation: "Continue regular health checkups and maintain a healthy lifestyle."
      }
    } else {
      return {
        title: "Tumor Detected",
        description: "The AI analysis has detected potential tumor presence in the kidney tissue.",
        recommendation: "Please consult with a medical professional immediately for further evaluation and treatment options."
      }
    }
  }

  const resultMessage = getResultMessage()
  const colorClass = getResultColor()

  return (
    <div className="space-y-6">
      {/* Main Result */}
      <div className={`bg-${colorClass}-50 border border-${colorClass}-200 rounded-xl p-6`}>
        <div className="flex items-center space-x-4 mb-4">
          <div className={`text-${colorClass}-600`}>
            {getResultIcon()}
          </div>
          <div>
            <h3 className={`text-xl font-bold text-${colorClass}-800`}>
              {resultMessage.title}
            </h3>
            <p className={`text-${colorClass}-600 text-sm`}>
              Classification: {prediction.prediction}
            </p>
          </div>
        </div>
        
        <p className={`text-${colorClass}-700 mb-4`}>
          {resultMessage.description}
        </p>
        
        <div className={`bg-${colorClass}-100 rounded-lg p-4`}>
          <h4 className={`font-medium text-${colorClass}-800 mb-2`}>
            Recommendation:
          </h4>
          <p className={`text-${colorClass}-700 text-sm`}>
            {resultMessage.recommendation}
          </p>
        </div>
      </div>

      {/* Technical Details */}
      <div className="bg-gray-50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-800 mb-4">Technical Details</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Input Size</div>
            <div className="font-medium text-gray-800">224×224×3</div>
          </div>
          <div className="bg-white rounded-lg p-4">
            <div className="text-sm text-gray-500 mb-1">Framework</div>
            <div className="font-medium text-gray-800">TensorFlow</div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
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
              This AI tool is for educational and research purposes only. It should not be used as a substitute for professional medical diagnosis or treatment. Always consult with qualified healthcare professionals for medical decisions.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onReset}
          className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Upload New Image
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Save Results
        </button>
      </div>

      {/* Additional Information */}
      <div className="bg-blue-50 rounded-xl p-6">
        <h4 className="font-semibold text-blue-800 mb-3">Understanding the Results</h4>
        <div className="space-y-3 text-sm text-blue-700">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <p><strong>Normal:</strong> Indicates healthy kidney tissue with no detected abnormalities</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <p><strong>Tumor:</strong> Suggests the presence of abnormal tissue that may require medical attention</p>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
            <p><strong>Accuracy:</strong> Our model is trained on medical imaging data but should not replace professional diagnosis</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PredictionResult
