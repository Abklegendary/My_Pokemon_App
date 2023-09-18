import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import MyPokemon from './MyPokemon';
import PokemonDetails from './components/PokemonDetails';

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MyPokemon />} />
        <Route path='/pokemon/:id' element={<PokemonDetails/>} />
      </Routes>
    </BrowserRouter>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

