import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import App from './App';
import { AppProvider, useApp } from './context/AppContext';
import './index.css';

function ThemedApp() {
  const { darkMode } = useApp();
  const theme = React.useMemo(() => createTheme({ palette: { mode: darkMode ? 'dark' : 'light', primary: { main: '#f5c518' }, secondary: { main: '#7c4dff' }, background: { default: darkMode ? '#09090b' : '#f5f6fa', paper: darkMode ? '#121216' : '#ffffff' } }, typography: { fontFamily: 'Inter, Roboto, Arial, sans-serif' }, shape: { borderRadius: 14 } }), [darkMode]);
  return <ThemeProvider theme={theme}><CssBaseline /><App /></ThemeProvider>;
}
ReactDOM.render(<AppProvider><BrowserRouter><ThemedApp /></BrowserRouter></AppProvider>, document.getElementById('root'));
