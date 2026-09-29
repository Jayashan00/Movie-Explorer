
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { tmdb } from '../../services/tmdb';
import MovieGrid from '../../components/movie/MovieGrid';
import {
  Loading,
  ErrorState,
  EmptyState,
} from '../../components/common/States';
import { useApp } from '../../context/AppContext';

export default function Search() {
  const [params, setParams] = useSearchParams();

  const query = params.get('q') || '';

  const [term, setTerm] = useState(query);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState(0);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { setLastSearch } = useApp();
  const sentinel = useRef(null);

  useEffect(() => {
    tmdb
      .genres()
      .then((r) => setGenres(r.data.genres || []))
      .catch(() => {});
  }, []);

  const run = useCallback(
    async (p = 1) => {
      if (!query.trim()) return;

      try {
        setLoading(true);
        setError('');

        const filters = {};

        if (year) {
          filters.year = year;
        }

        if (genre) {
          filters.with_genres = genre;
        }

        if (rating) {
          filters['vote_average.gte'] = rating;
        }

        const r =
          genre || year || rating
            ? await tmdb.discover(p, { ...filters })
            : await tmdb.search(query, p, {});

        setMovies((current) =>
          p === 1
            ? r.data.results
            : [...current, ...r.data.results]
        );

        setTotalPages(r.data.total_pages || 1);
        setPage(p);
        setLastSearch(query);
      } catch {
        setError('Search failed. Please try again.');
      } finally {
        setLoading(false);
      }
    },
    [query, genre, year, rating, setLastSearch]
  );

  useEffect(() => {
    setMovies([]);
    setPage(1);
    run(1);
  }, [query, genre, year, rating, run]);

  useEffect(() => {
    if (!sentinel.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loading &&
          page < totalPages
        ) {
          run(page + 1);
        }
      },
      {
        rootMargin: '500px',
      }
    );

    observer.observe(sentinel.current);

    return () => observer.disconnect();
  }, [
    page,
    totalPages,
    loading,
    query,
    genre,
    year,
    rating,
    run,
  ]);

  const submit = (e) => {
    e.preventDefault();

    if (term.trim()) {
      setParams({
        q: term.trim(),
      });
    }
  };

  return (
    <main className="page">
      <Typography variant="h3" fontWeight={950} mb={3}>
        Discover Movies
      </Typography>

      <Box
        component="form"
        onSubmit={submit}
        sx={{
          display: 'flex',
          gap: 1,
          mb: 3,
        }}
      >
        <TextField
          fullWidth
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search by movie title..."
        />

        <Button
          type="submit"
          variant="contained"
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </Box>

      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        mb={4}
      >
        <FormControl
          size="small"
          sx={{ minWidth: 180 }}
        >
          <InputLabel>Genre</InputLabel>

          <Select
            value={genre}
            label="Genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <MenuItem value="">
              All genres
            </MenuItem>

            {genres.map((g) => (
              <MenuItem
                key={g.id}
                value={g.id}
              >
                {g.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          size="small"
          label="Year"
          type="number"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          inputProps={{
            min: 1900,
            max: 2100,
          }}
        />

        <Box
          sx={{
            minWidth: 220,
            px: 1,
          }}
        >
          <Typography variant="caption">
            Minimum rating: {rating || 'Any'}
          </Typography>

          <Slider
            value={rating}
            min={0}
            max={10}
            step={0.5}
            onChange={(_, value) => setRating(value)}
            valueLabelDisplay="auto"
          />
        </Box>
      </Stack>

      {error ? (
        <ErrorState
          message={error}
          retry={() => run(1)}
        />
      ) : !query ? (
        <EmptyState
          title="Start exploring"
          message="Search for a movie above to discover the TMDb catalog."
        />
      ) : movies.length ? (
        <>
          <MovieGrid movies={movies} />

          <div
            ref={sentinel}
            style={{ height: 20 }}
          />

          {loading && (
            <Loading text="Finding more movies..." />
          )}

          {!loading && page < totalPages && (
            <Button
              variant="outlined"
              onClick={() => run(page + 1)}
              sx={{
                display: 'block',
                mx: 'auto',
                my: 3,
              }}
            >
              Load More Results
            </Button>
          )}

          {!loading && page >= totalPages && (
            <Typography
              textAlign="center"
              sx={{
                p: 4,
                opacity: 0.6,
              }}
            >
              You've reached the end of the results.
            </Typography>
          )}
        </>
      ) : loading ? (
        <Loading />
      ) : (
        <EmptyState
          title="No movies found"
          message="Try another title or loosen your filters."
        />
      )}
    </main>
  );
}
