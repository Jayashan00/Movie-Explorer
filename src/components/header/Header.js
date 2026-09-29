import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button, IconButton, TextField, InputAdornment, Menu, MenuItem, Chip } from '@mui/material';
import { Search, DarkMode, LightMode, Favorite, Logout, Movie as MovieIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import './Header.css';

export default function Header(){
 const {user,logout,darkMode,setDarkMode,lastSearch}=useApp(); const [q,setQ]=useState(lastSearch); const [anchor,setAnchor]=useState(null); const nav=useNavigate();
 const submit=e=>{e.preventDefault(); if(q.trim()){nav(`/search?q=${encodeURIComponent(q.trim())}`)}};
 return <AppBar position="sticky" elevation={0} className="header"><Toolbar sx={{gap:1,flexWrap:'wrap',py:1}}>
  <Typography component={Link} to="/" variant="h5" sx={{fontWeight:900,mr:2,display:'flex',alignItems:'center',gap:.7}}><MovieIcon sx={{color:'#f5c518'}}/>MOVIE<span style={{color:'#f5c518'}}>X</span></Typography>
  <Box component="form" onSubmit={submit} sx={{flex:1,minWidth:220,maxWidth:620}}><TextField fullWidth size="small" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search movies, actors, titles..." InputProps={{startAdornment:<InputAdornment position="start"><Search/></InputAdornment>}} /></Box>
  <Box sx={{display:'flex',alignItems:'center',gap:.5,ml:'auto'}}>
   <Button component={Link} to="/favorites" startIcon={<Favorite/>} color="inherit" sx={{display:{xs:'none',sm:'inline-flex'}}}>Favorites</Button>
   <IconButton color="inherit" onClick={()=>setDarkMode(!darkMode)}>{darkMode?<LightMode/>:<DarkMode/>}</IconButton>
   {user && <><Chip label={user.username} onClick={e=>setAnchor(e.currentTarget)} sx={{display:{xs:'none',md:'flex'}}}/><Menu anchorEl={anchor} open={Boolean(anchor)} onClose={()=>setAnchor(null)}><MenuItem onClick={()=>{logout();setAnchor(null);nav('/login')}}><Logout sx={{mr:1}}/>Logout</MenuItem></Menu></>}
  </Box>
 </Toolbar></AppBar>
}
