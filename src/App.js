import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import DoesntExists from './components/DoesntExists';
import Login from './components/Login';
import Signup from './components/Signup';
import DataContext from './contexts/DataContext';
import ThemeContext from './contexts/ThemeContext';

function App() {
  const [theme, setTheme] = useState('dark');
  return (
    <ThemeContext.Provider value={{ color: theme, setTheme: setTheme }}>
      <DataContext.Provider>
        <div className="App">
          <Routes>
            <Route path='/register' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<DoesntExists />} />
          </Routes>
        </div>
      </DataContext.Provider>

    </ThemeContext.Provider>

  );
}

export default App;
