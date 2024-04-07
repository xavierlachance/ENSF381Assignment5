import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Productpage from './components/Productpage';
import Loginpage from './components/Loginpage';

export const AuthContext = createContext(); // Create the context for authentication

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
      <Router>
        <div>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products" element={<Productpage />} />
            <Route path="/login" element={<Loginpage />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;