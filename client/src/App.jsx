import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { useState } from 'react';
import RefreshHandler from './components/RefreshHandler';
import Dashboard from './pages/Dashboard/Dashboard';
import ModelPage from './pages/Models/ModelsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // PrivateRoute wrapper
  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };

  return (
    <>
      <HashRouter>
        <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes Example */}
          <Route
            path="/dashboard"
            element={<PrivateRoute element={<Dashboard/>} />}
          />
          <Route
            path="/models/:id"
            element={<PrivateRoute element={<ModelPage />}/>}
          />


          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
