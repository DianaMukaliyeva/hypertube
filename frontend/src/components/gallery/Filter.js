import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import CustomSelect from './CustomSelect';
import CustomSearch from './CustomSearch';
import options from './options.json';

const Filter = ({ filter, setFilter, setSearch }) => {
  const { t } = useTranslation();
  const onKeyDown = (e) => e.key === 'Enter' && setFilter({ ...filter });

  return (
    <Box py={5}>
      <Grid container direction="row" spacing={1} justify="space-evenly">
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <CustomSearch
            onKeyDown={onKeyDown}
            onChange={(e) => setSearch(e.target.value)}
            label={t('filter.searchLabel')}
            onClick={() => {
              setFilter({ ...filter });
            }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <CustomSelect
            id="movie-rating"
            label={t('filter.ratingLabel')}
            options={options.ratings}
            onChange={(event, value) =>
              setFilter({ ...filter, imdb: (value && value.rating) || null })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <CustomSelect
            id="movie-genre"
            label={t('filter.genreLabel')}
            options={options.genres.map((genre) => {
              return { title: t(genre.title), genre: genre.genre };
            })}
            onChange={(event, value) =>
              setFilter({ ...filter, genre: (value && value.genre) || null })
            }
          />
        </Grid>
        <Grid item xs={12} sm={4} md={4} lg={3}>
          <CustomSelect
            id="movie-sort"
            label={t('filter.sortLabel')}
            options={options.sorts.map((sort) => {
              return { title: t(sort.title), sort: sort.sort };
            })}
            onChange={(event, value) =>
              setFilter({ ...filter, sort: (value && value.sort) || null })
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

Filter.propTypes = {
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Filter;
