import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import StudyGuide from './StudyGuide.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Your original cards are at the root: / */}
        <Route path="/" element={<App />} />
        {/* Your new study guide is at: /guide */}
        <Route path="/guide" element={<StudyGuide />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)