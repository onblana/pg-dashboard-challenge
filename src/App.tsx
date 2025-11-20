import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import NotFound from './pages/NotFound'
import { SideMenu } from './components/SideMenu'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <SideMenu />
      <main className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
