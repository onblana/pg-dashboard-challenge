import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { PaymentsList } from './pages/PaymentsList'
import NotFound from './pages/NotFound'
import { SideMenu } from './components/SideMenu'
import { Title } from './components/Title'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <SideMenu />
      <main className="app-content">
        <Title />
        <div className="app-page">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/payments" element={<PaymentsList />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
