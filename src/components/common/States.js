import React from 'react';
import { Alert, Box, Button, CircularProgress, Typography } from '@mui/material';
export function Loading({text='Loading amazing movies...'}){return <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',gap:2,p:8}}><CircularProgress color="primary"/><Typography>{text}</Typography></Box>}
export function ErrorState({message='Something went wrong while loading the movies.',retry}){return <Box sx={{p:6,textAlign:'center'}}><Alert severity="error" sx={{mb:2,justifyContent:'center'}}>{message}</Alert>{retry&&<Button variant="contained" onClick={retry}>Try again</Button>}</Box>}
export function EmptyState({title='Nothing here yet',message='Try another search or explore trending movies.'}){return <Box sx={{textAlign:'center',p:8,opacity:.75}}><Typography variant="h5" fontWeight={800}>{title}</Typography><Typography sx={{mt:1}}>{message}</Typography></Box>}
