import React, { useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { UserContext } from './components/services/UserContext';
import { Box } from '@chakra-ui/react';
import Index from './components/pages/Index';
import Account from './components/pages/Account';
import './constants/styles.css';
import { loadUserFromLocalStorage } from './components/services/loadUserFromLocalStorage';

function App() {
  const loadUser = loadUserFromLocalStorage();
  const [user, setUser] = useState(loadUser);

  return (
    <Router>
      <Box className="App" position="relative">
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" exact element={<Index />} />
            <Route path="/account" exact element={<Account />} />
          </Routes>
        </UserContext.Provider>
      </Box>
    </Router>
  );
}

export default App;
