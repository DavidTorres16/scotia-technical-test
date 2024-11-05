import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import Header from './layout/Header/Header';

const App: React.FC = () => {

  const [isInsertFormVisible, setInsertFormVisible] = useState(false);

  const handleInsertClick = () => {
    setInsertFormVisible(true);
  };

  const handleCloseInsertForm = () => {
    setInsertFormVisible(false);
  };

  return (
    <Router>
      <Header onInsertClick={handleInsertClick} />
      <Routes>
        <Route path="/" element={<HomePage onInsertFormVisible={isInsertFormVisible} onCloseInsertForm={handleCloseInsertForm}/> }  />
        <Route path="*" element={<NotFoundPage />} /> {/* 404 Route */}
      </Routes>
    </Router>
  );
};

export default App;
