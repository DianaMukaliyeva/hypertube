import React from 'react';
// import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Box from '@material-ui/core/Box';

const ratings = [
  {
    title: '9+',
    rating: 9,
  },
  {
    title: '8+',
    rating: 8,
  },
  {
    title: '7+',
    rating: 7,
  },
  {
    title: '6+',
    rating: 6,
  },
  {
    title: '5+',
    rating: 5,
  },
  {
    title: '4+',
    rating: 4,
  },
  {
    title: '3+',
    rating: 3,
  },
  {
    title: '2+',
    rating: 2,
  },
  {
    title: '1+',
    rating: 1,
  },
  {
    title: '0+',
    rating: 0,
  },
];

const Filter = () => {
  const { t } = useTranslation();
  const [year, setYear] = React.useState();
  const [genre, setGenre] = React.useState();
  const [rating, setRating] = React.useState();
  const [sort, setSort] = React.useState();
  const [search, setSearch] = React.useState('');
  console.log('filter', year, genre, rating, sort, search);

  const years = [
    {
      title: '2020' + t('filter.s'),
      year: 2020,
    },
    {
      title: '2010' + t('filter.s'),
      year: 2010,
    },
    {
      title: '2000' + t('filter.s'),
      year: 2000,
    },
    {
      title: '1990' + t('filter.s'),
      year: 1990,
    },
    {
      title: '1980' + t('filter.s'),
      year: 1980,
    },
    {
      title: '1970' + t('filter.s'),
      year: 1970,
    },
    {
      title: '1960' + t('filter.s'),
      year: 1960,
    },
    {
      title: t('filter.earlier'),
      year: 0,
    },
  ];

  const sorts = [
    {
      title: 'A - Z',
      sort: 'title asc',
    },
    {
      title: 'Z - A',
      sort: 'title desc',
    },
    {
      title: t('filter.newest'),
      sort: 'year desc',
    },
    {
      title: t('filter.oldest'),
      sort: 'year asc',
    },
    {
      title: t('filter.mostPopular'),
      sort: 'rating desc',
    },
    {
      title: t('filter.leastPopular'),
      sort: 'rating asc',
    },
  ];

  const genres = [
    {
      title: t('genres.comedy'),
      genre: 'comedy',
    },
    {
      title: t('genres.sci-fi'),
      genre: 'sci-fi',
    },
    {
      title: t('genres.horror'),
      genre: 'horror',
    },
    {
      title: t('genres.romance'),
      genre: 'romance',
    },
    {
      title: t('genres.action'),
      genre: 'action',
    },
    {
      title: t('genres.thriller'),
      genre: 'thriller',
    },
    {
      title: t('genres.drama'),
      genre: 'drama',
    },
    {
      title: t('genres.documentary'),
      genre: 'documentary',
    },
    {
      title: t('genres.mystery'),
      genre: 'mystery',
    },
    {
      title: t('genres.crime'),
      genre: 'crime',
    },
    {
      title: t('genres.animation'),
      genre: 'animation',
    },
    {
      title: t('genres.adventure'),
      genre: 'adventure',
    },
    {
      title: t('genres.fantasy'),
      genre: 'fantasy',
    },
    {
      title: t('genres.superhero'),
      genre: 'superhero',
    },
    {
      title: t('genres.biography'),
      genre: 'biography',
    },
    {
      title: t('genres.family'),
      genre: 'family',
    },
    {
      title: t('genres.history'),
      genre: 'history',
    },
    {
      title: t('genres.film-noir'),
      genre: 'film-noir',
    },
    {
      title: t('genres.musical'),
      genre: 'musical',
    },
    {
      title: t('genres.sport'),
      genre: 'sport',
    },
    {
      title: t('genres.war'),
      genre: 'war',
    },
  ];

  return (
    <Box py={5}>
      <Grid container direction="row" spacing={1} justify="space-evenly">
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <FormControl size="small" fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">{t('filter.searchLabel')}</InputLabel>
            <OutlinedInput
              style={{ borderRadius: '50px' }}
              id="outlined-adornment-amount"
              onChange={(e) => setSearch(e.target.value)}
              endAdornment={
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              }
              labelWidth={140}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={2}>
          <Autocomplete
            size="small"
            id="movie-year"
            onChange={(event, value) => setYear(value)}
            options={years}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={t('filter.yearLabel')} />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={2}>
          <Autocomplete
            size="small"
            id="movie-rating"
            onChange={(event, value) => setRating(value)}
            options={ratings}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={t('filter.ratingLabel')} />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={2}>
          <Autocomplete
            size="small"
            id="movie-genre"
            onChange={(event, value) => setGenre(value)}
            options={genres}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={t('filter.genreLabel')} />
            )}
          />
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={2}>
          <Autocomplete
            size="small"
            id="movie-sort"
            onChange={(event, value) => setSort(value)}
            options={sorts}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
              <TextField {...params} variant="outlined" label={t('filter.sortLabel')} />
            )}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

// Filter.propTypes = {
//   movie: PropTypes.object.isRequired,
// };

export default Filter;
