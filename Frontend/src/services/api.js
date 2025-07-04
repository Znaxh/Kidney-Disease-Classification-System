// API configuration and service functions

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Health check
  async healthCheck() {
    return this.request('/health')
  }

  // Predict image
  async predictImage(base64Image) {
    return this.request('/predict', {
      method: 'POST',
      body: JSON.stringify({
        image: base64Image
      })
    })
  }

  // Start training
  async startTraining() {
    return this.request('/train', {
      method: 'POST'
    })
  }

  // Get model info
  async getModelInfo() {
    return this.request('/model-info')
  }
}

// Utility functions
export const convertToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export const validateImageFile = (file) => {
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

// Create and export API service instance
const apiService = new ApiService()
export default apiService
