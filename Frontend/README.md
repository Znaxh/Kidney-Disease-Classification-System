# Kidney Disease Classification - Frontend

Modern React.js web application for kidney disease classification with a clean, responsive interface built using Vite and TailwindCSS.

## 🎯 Overview

The frontend provides an intuitive web interface for:
- Uploading kidney CT scan images
- Real-time image classification
- Displaying prediction results
- Responsive design for all devices

## 🛠️ Tech Stack

- **React 19.1.0**: Modern React with latest features
- **Vite 7.0.0**: Fast build tool and development server
- **TailwindCSS 4.1.11**: Utility-first CSS framework
- **ESLint**: Code linting and formatting

## 🏗️ Project Structure

```
Frontend/
├── src/
│   ├── components/          # Reusable React components
│   ├── pages/              # Page components
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── styles/             # CSS and styling
│   ├── App.jsx             # Main application component
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
│   ├── vite.svg           # Vite logo
│   └── favicon.ico        # Favicon
├── index.html             # HTML template
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # TailwindCSS configuration
└── eslint.config.js       # ESLint configuration
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

## 📱 Features

### Current Features
- Modern React 19 with latest hooks
- Vite for fast development and building
- TailwindCSS for responsive styling
- ESLint for code quality
- Hot Module Replacement (HMR)

### Planned Features
- Image upload component
- Drag & drop functionality
- Real-time prediction display
- Loading states and animations
- Error handling and validation
- Image preview and cropping
- Results history
- Dark/light theme toggle

## 🎨 UI Components (To Be Implemented)

### ImageUpload Component
```jsx
// Upload kidney CT scan images
<ImageUpload
  onImageSelect={handleImageSelect}
  acceptedFormats={['jpg', 'jpeg', 'png']}
  maxSize="5MB"
/>
```

### PredictionResult Component
```jsx
// Display classification results
<PredictionResult
  prediction="Normal" // or "Tumor"
  confidence={0.95}
  processingTime="1.2s"
/>
```

### LoadingSpinner Component
```jsx
// Show loading state during prediction
<LoadingSpinner
  message="Analyzing image..."
  progress={75}
/>
```

## 🔌 API Integration

### Backend Communication
```javascript
// Example API call to backend
const classifyImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const response = await fetch('http://localhost:8080/predict', {
    method: 'POST',
    body: formData
  });

  return response.json();
};
```

### Error Handling
```javascript
// Robust error handling
try {
  const result = await classifyImage(image);
  setResult(result);
} catch (error) {
  setError('Failed to classify image. Please try again.');
}
```

## 🎨 Styling with TailwindCSS

### Responsive Design
```jsx
// Mobile-first responsive design
<div className="
  w-full
  max-w-md mx-auto
  p-4
  sm:max-w-lg
  md:max-w-xl
  lg:max-w-2xl
">
  {/* Content */}
</div>
```

### Custom Components
```jsx
// Styled button component
<button className="
  bg-blue-600
  hover:bg-blue-700
  text-white
  font-semibold
  py-2 px-4
  rounded-lg
  transition-colors
  duration-200
">
  Upload Image
</button>
```

## ⚡ Vite Configuration

### Development Features
- **Hot Module Replacement**: Instant updates during development
- **Fast Refresh**: Preserve component state during edits
- **Optimized Builds**: Tree-shaking and code splitting
- **TypeScript Support**: Ready for TypeScript migration

### Build Optimization
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@tailwindcss/vite']
        }
      }
    }
  }
}
```

## 🧪 Testing

### Unit Testing (To Be Implemented)
```bash
# Run unit tests
npm test

# Run tests with coverage
npm run test:coverage
```

### E2E Testing (To Be Implemented)
```bash
# Run end-to-end tests
npm run test:e2e
```

## 📦 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Building
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues

# Testing (when implemented)
npm test            # Run unit tests
npm run test:watch  # Run tests in watch mode
```

## 🔧 Configuration

### ESLint Configuration
- React hooks rules
- React refresh rules
- Modern JavaScript standards
- Import/export validation

### TailwindCSS Configuration
- Custom color palette
- Responsive breakpoints
- Custom utilities
- Component classes

### Vite Configuration
- React plugin with Fast Refresh
- TailwindCSS integration
- Development server settings
- Build optimizations

## 🚀 Deployment

### Static Hosting
```bash
# Build and deploy to Netlify/Vercel
npm run build
# Upload dist/ folder
```

### Docker Deployment
```dockerfile
# Dockerfile for frontend
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔄 Development Workflow

1. **Start Development Server**
   ```bash
   npm run dev
   ```

2. **Make Changes**
   - Edit components in `src/`
   - See changes instantly with HMR

3. **Code Quality**
   ```bash
   npm run lint
   ```

4. **Build and Test**
   ```bash
   npm run build
   npm run preview
   ```

## 🤝 Contributing

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use TailwindCSS for styling
- Write descriptive component names

### Pull Request Process
1. Create feature branch
2. Implement changes
3. Run linting: `npm run lint`
4. Test build: `npm run build`
5. Submit pull request

## 📄 Dependencies

### Production Dependencies
- **react**: ^19.1.0 - React library
- **react-dom**: ^19.1.0 - React DOM renderer
- **tailwindcss**: ^4.1.11 - CSS framework
- **@tailwindcss/vite**: ^4.1.11 - Vite integration

### Development Dependencies
- **vite**: ^7.0.0 - Build tool
- **@vitejs/plugin-react**: ^4.5.2 - React plugin
- **eslint**: ^9.29.0 - Code linting
- **@types/react**: ^19.1.8 - React TypeScript types

## 🚨 Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Use different port
   npm run dev -- --port 3001
   ```

2. **Build errors**
   ```bash
   # Clear cache and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **TailwindCSS not working**
   - Check `tailwind.config.js`
   - Verify CSS imports in `index.css`

## 📞 Support

For frontend-specific issues:
1. Check browser console for errors
2. Verify API connectivity to backend
3. Check Vite development server logs
4. Review TailwindCSS configuration
