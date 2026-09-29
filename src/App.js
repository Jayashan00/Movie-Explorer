import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/header/Header';
import Home from './pages/home/home';
import Movie from './pages/movieDetail/movie';
import MovieList from './components/movieList/movieList';
import Login from './pages/login/Login';
import Favorites from './pages/favorites/Favorites';
import Search from './pages/search/Search';
import { useApp } from './context/AppContext';
import './App.css';

function Protected({ children }) { const { user } = useApp(); return user ? children : <Navigate to="/login" replace />; }
export default function App() {
  return <div className="App"><Header /><Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Protected><Home /></Protected>} />
    <Route path="/search" element={<Protected><Search /></Protected>} />
    <Route path="/favorites" element={<Protected><Favorites /></Protected>} />
    <Route path="/movie/:id" element={<Protected><Movie /></Protected>} />
    <Route path="/movies/:type" element={<Protected><MovieList /></Protected>} />
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes></div>;
}
