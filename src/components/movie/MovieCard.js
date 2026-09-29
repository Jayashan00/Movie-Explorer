import React from 'react';
import { Card, CardActionArea, CardContent, CardMedia, IconButton, Rating, Typography, Box } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { posterUrl } from '../../services/tmdb';
import { useApp } from '../../context/AppContext';
export default function MovieCard({movie}){const {isFavorite,toggleFavorite}=useApp(); const fav=isFavorite(movie.id); return <Card sx={{height:'100%',position:'relative',overflow:'hidden',background:'background.paper',transition:'.25s','&:hover':{transform:'translateY(-6px)',boxShadow:'0 18px 45px rgba(0,0,0,.3)'}}}>
 <IconButton aria-label={fav?'Remove favorite':'Add favorite'} onClick={()=>toggleFavorite(movie)} sx={{position:'absolute',zIndex:2,right:7,top:7,background:'rgba(0,0,0,.6)',color:fav?'#f5c518':'white'}}>{fav?<Favorite/>:<FavoriteBorder/>}</IconButton>
 <CardActionArea component={Link} to={`/movie/${movie.id}`}><CardMedia component="img" image={posterUrl(movie.poster_path)} alt={movie.title} sx={{aspectRatio:'2/3',objectFit:'cover',background:'#202025'}}/><CardContent sx={{p:1.5}}><Typography fontWeight={800} noWrap>{movie.title}</Typography><Box sx={{display:'flex',alignItems:'center',gap:1,mt:.7}}><Rating value={Number(movie.vote_average||0)/2} precision={.1} size="small" readOnly/><Typography variant="caption">{movie.vote_average ? Number(movie.vote_average).toFixed(1):'N/A'}</Typography></Box><Typography variant="caption" color="text.secondary">{movie.release_date?.slice(0,4)||'TBA'}</Typography></CardContent></CardActionArea>
 </Card>}
