import './App.css'
import BookListPage from './pages/BookListPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CartConfirmationPage from './pages/CartConfirmationPage'
import CartPage from './pages/CartPage'
import { CartProvider } from './context/CartContext'
import BookPage from './pages/BookPage'
import AdminBooksPage from './pages/AdminBooksPage'

function App() {

  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/book/:bookId" element={<BookPage />} />
          <Route path="/confirmation/:title/:quantity" element={<CartConfirmationPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/admin" element={<AdminBooksPage />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </Router>
    </CartProvider>
    </>
  )
}

export default App
