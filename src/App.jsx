import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { useAuth } from './context/AuthProvider';

function App() {
  const [authUser] = useAuth(); // ✅ getting the user token from context
  console.log("Auth User:", authUser);

  return (
    <div>
      <Routes>
        {/* If logged in, show Home, else redirect to Login */}
        <Route
          path="/"
          element={authUser ? <Home /> : <Navigate to="/login" />}
        />

        {/* If logged in, redirect to Home, else show Login */}
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />

        {/* If logged in, redirect to Home, else show Signup */}
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
    </div>
  );
}

export default App;
