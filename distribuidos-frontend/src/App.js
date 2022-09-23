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
import UserPurchase from './components/pages/UserPurchase/UserPurchase';
import { CartProvider } from './constants/CartContext';
import ProductDetails from './components/pages/ProductDetails';

function App() {
  const loadUser = loadUserFromLocalStorage();
  const [user, setUser] = useState(loadUser);

  return (
    <Router>
      <Box className="App">
        <UserContext.Provider value={{ user, setUser }}>
          <CartProvider>
            <Routes>
              <Route exact path="/" element={<Index />} />
              <Route path="/account" element={<Account />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/newProduct" element={<RegisterProduct />} />
              <Route path="/userProducts" element={<UserProducts />} />
              <Route
                path="/userProducts/:productId"
                element={<ProductDetails />}
              />
              <Route path="/userPurchase" element={<UserPurchase />} />
            </Routes>
          </CartProvider>
        </UserContext.Provider>
      </Box>
    </Router>
  );
}

export default App;
