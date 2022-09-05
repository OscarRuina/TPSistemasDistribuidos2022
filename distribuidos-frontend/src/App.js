import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserContext } from './constants/UserContext';
import { Box } from '@chakra-ui/react';
import Index from './components/pages/Index';
import Account from './components/pages/Account';
import './constants/styles.css';
import { loadUserFromLocalStorage } from './services/localStorageService';
import Wallet from './components/pages/Wallet';
import RegisterProduct from './components/pages/RegisterProduct';
import UserProducts from './components/pages/UserProducts';

function App() {
  const loadUser = loadUserFromLocalStorage();
  const [user, setUser] = useState(loadUser);

  return (
    <Router>
      <Box className="App" fontFamily="sans-serif" position="relative">
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route exact path="/" element={<Index />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/products" element={<RegisterProduct />} />
            <Route path="/userProducts" element={<UserProducts />} />
          </Routes>
        </UserContext.Provider>
      </Box>
    </Router>
  );
}

export default App;
