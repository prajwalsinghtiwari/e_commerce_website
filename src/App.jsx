import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import { Navigate, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { AuthProvider, useAuth } from './AuthContext';
import Login from './components/Login';
import Home from './Home';
import ProductDetails from './components/ProductDetails';

const Private = ({ children }) => {
  const { authState } = useAuth();
  return authState.isUserAuthenticated ? children : <Navigate to='/login' />;
};

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
                 <Navbar />
          <Routes>
            <Route path='/' element={<Private><Home /></Private>} />
            <Route path='/login' element={<Login />} />
            <Route path='/product/:id' element={<Private><ProductDetails /></Private>} />
          </Routes>
      
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
