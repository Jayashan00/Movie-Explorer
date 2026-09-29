import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { tmdb } from '../../services/tmdb';
import MovieGrid from '../movie/MovieGrid';
import { Loading, ErrorState } from '../common/States';

export default function MovieList({ type = 'popular', title }) {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(
    async (p = 1) => {
      try {
        setLoading(true);
        setError('');

        let r;

        if (type === 'top-rated') {
          r = await tmdb.topRated(p);
        } else if (type === 'upcoming') {
          r = await tmdb.upcoming(p);
        } else {
          r = await tmdb.popular(p);
        }

        setMovies((current) =>
          p === 1 ? r.data.results : [...current, ...r.data.results]
        );
      } catch (e) {
        setError(
          'Unable to load movies. Please check your API key or network connection.'
        );
      } finally {
        setLoading(false);
      }
    },
    [type]
  );

  useEffect(() => {
    setMovies([]);
    setPage(1);
    load(1);
  }, [type, load]);

  if (error && !movies.length) {
    return <ErrorState message={error} retry={() => load(1)} />;
  }

  return (
    <section>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography className="section-title">
          {title ||
            type
              .replace('-', ' ')
              .replace(/\b\w/g, (c) => c.toUpperCase())}
        </Typography>

        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Collection</InputLabel>

          <Select
            value={type}
            label="Collection"
            onChange={(e) =>
              (window.location.href = `/movies/${e.target.value}`)
            }
          >
            <MenuItem value="popular">Popular</MenuItem>
            <MenuItem value="top-rated">Top Rated</MenuItem>
            <MenuItem value="upcoming">Upcoming</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <MovieGrid movies={movies} />

      {loading && <Loading />}

      {!loading && movies.length > 0 && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="outlined"
            onClick={() => {
              const nextPage = page + 1;
              setPage(nextPage);
              load(nextPage);
            }}
          >
            Load More
          </Button>
        </Box>
      )}
    </section>
  );
}