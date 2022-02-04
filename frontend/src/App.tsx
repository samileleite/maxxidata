import React from 'react';
import styles from './App.module.scss';
import { BrowserRouter as Router } from 'react-router-dom';


import RoutesApp from './routes';

const App: React.FC = () => (
  <Router>
    <RoutesApp />
  </Router>

)
export default App;

