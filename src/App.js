import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import About from './components/About';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [mode, setMode] = useState('light');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message,
      type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#212529';
      document.body.style.color = 'white';
      showAlert('Dark mode has been enabled', 'primary');
    } else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      document.body.style.color = '#212529';
      showAlert('Light mode has been enabled', 'primary');
    }
  };

  return (
    <>
      <Router>
        <Navbar
          title="Text Utils"
          aboutText="About Text Utils"
          mode={mode}
          toggleMode={toggleMode}
        />
        <Alert alert={alert} />
        <Routes>
          <Route path="/about" element={<About />}></Route>
          <Route
            path="/home"
            element={
              <TextForm
                showAlert={showAlert}
                heading="Enter the text to analyse below"
              />
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
