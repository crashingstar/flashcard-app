
import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Deck from './component/DeckComponent';
import Home from './component/HomeComponent';
import Login from './pages/LoginComponent';
import Register from './pages/RegisterComponent';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route path="home" element={<Home/>} />
        <Route path="deck" element={<Deck/>} />
      </Routes>
    </BrowserRouter>);
}

export default App;