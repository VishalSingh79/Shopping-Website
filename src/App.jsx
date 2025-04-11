import { useState, useEffect } from 'react'
import './App.css'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Products from './components/Products'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CategoryProducts from './components/CategoryProducts';
import Cart from './components/Cart';
import { useSelector } from 'react-redux';

function App() {
  const token = useSelector(state => state.auth.Token);
  const location = useLocation();

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/auth/login" state={{ from: location }} replace />;
    }
    return children;
  };

  return (
    <div className='wrapper'>
      <Navbar/>
      
      <Routes>

        <Route path='/' element={
          token ? <Navigate to="/products" replace /> : <Login />
        }/>

        <Route path='/auth/login' element={
          token ? <Navigate to="/products" replace /> : <Login />
        }/>

        <Route path='/products' element={
          <ProtectedRoute>
            <Products/>
          </ProtectedRoute>
        }/>

        <Route path='/products/category/:category' element={
          <ProtectedRoute>
            <CategoryProducts/>
          </ProtectedRoute>
        }/>

        <Route path='/cart' element={
          <ProtectedRoute>
            <Cart/>
          </ProtectedRoute>
        }/>

      </Routes>
      
    </div>
  )
}

export default App
