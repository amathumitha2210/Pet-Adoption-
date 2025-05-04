import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PetProvider } from './context/PetContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PetManagementPage from './pages/PetManagementPage';
import Alert from './components/Alert';
import './App.css';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  return (
    <PetProvider>
      <div className="app-container">
        <Navbar />
        <Alert alert={alert} />
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<HomePage showAlert={showAlert} />} />
            <Route
              path="/manage"
              element={<PetManagementPage showAlert={showAlert} />}
            />
          </Routes>
        </div>
      </div>
    </PetProvider>
  );
}

export default App;