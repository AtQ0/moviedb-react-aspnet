import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import Header from './components/Header'
import NavLinks from './components/NavLinks'

function App() {


  return (
    <div className="flex flex-col h-screen">
      {/* SideBar NavLinks */}
      <div className="flex flex-row flex-1">
        <div className="max-sm:hidden w-69.5 shrink-0 border-r border-gray-500 flex flex-col items-center h-screen py-5 overflow-hidden">
          <a href="/">
            <h2 className="text-xl font-semibold">Movies</h2>
          </a>

          <div className="flex-1 flex flex-col justify-center px-4">
            <NavLinks />
          </div>
        </div>

        <main className="p-3 flex-1 flex flex-col gap-3">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
