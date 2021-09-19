import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '@components/Navbar';
import { useHandleCheckAuth } from './AppService';
import Switch from './Switch';
import Modals from './Modals';
import './App.css';

function App() {
  useHandleCheckAuth();

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch />
        <Modals />
      </Router>
    </div>
  );
}

export default App;
