import { Routes, Route, Navigate } from 'react-router-dom'
import DesignSystemPage from './pages/DesignSystemPage'
import EditorPage from './pages/EditorPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/editor" replace />} />
      <Route path="/editor" element={<EditorPage />} />
      <Route path="/design-system" element={<DesignSystemPage />} />
    </Routes>
  )
}
