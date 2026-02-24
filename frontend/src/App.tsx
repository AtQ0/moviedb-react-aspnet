import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import NavLinks from './components/NavLinks'
import DiscoverPage from './pages/DiscoverPage'

function App() {


  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex flex-row flex-1 min-h-0">
        {/* Sidebar - static, no scroll */}
        <div className="max-sm:hidden w-69.5 shrink-0 border-r border-gray-500 flex flex-col items-center h-full overflow-hidden py-5">
          <a href="/">
            <h2 className="text-xl font-semibold">Movies</h2>
          </a>
          <div className="flex-1 flex flex-col justify-center px-4">
            <NavLinks />
          </div>
        </div>

        {/* Main: header static, only route content scrolls */}
        <main className="flex-1 flex flex-col min-h-0 p-3 gap-8">
          <Header />
          <div className="flex-1 min-h-0 overflow-y-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/discover" element={<DiscoverPage />} />
            </Routes>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
