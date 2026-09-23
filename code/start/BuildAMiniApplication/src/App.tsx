
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Queue from './pages/Queue'
import { Login } from './components/authentication/Login'
import { ProtectedRoute } from './components/authentication/ProtectedRoute'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/queue" element={<ProtectedRoute><Queue /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
