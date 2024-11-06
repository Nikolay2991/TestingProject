import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Путь к вашему компоненту PrivateRoute
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Routes>
        {/*<PrivateRoute path="/" element={<Home />} />*/}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;