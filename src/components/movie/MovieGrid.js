import React from 'react'; import MovieCard from './MovieCard'; import { EmptyState } from '../common/States';
export default function MovieGrid({movies=[]}){return movies.length?<div className="movie-grid">{movies.map(m=><MovieCard key={m.id} movie={m}/>)}</div>:<EmptyState/>}
