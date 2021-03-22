import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import CustomSelect from './CustomSelect';
import CustomSearch from './CustomSearch';
import options from './options.json';

const Filter = ({ clearInput, filter, setFilter, setSearch }) => {
  const { t } = useTranslation();
  const [key, setKey] = React.useState(false);
  const onKeyDown = (e) => e.key === 'Enter' && setFilter({ ...filter });
  const selectOptions = [
    {
      id: 'movie-imdb',
      label: 'filter.ratingLabel',
      options: options.ratings,
      name: 'imdb',
    },
    {
      id: 'movie-genre',
      label: 'filter.genreLabel',
      options: options.genres.map((genre) => {
        return { title: t(genre.title), genre: genre.genre };
      }),
      name: 'genre',
    },
    {
      id: 'movie-sort',
      label: 'filter.sortLabel',
      options: options.sorts.map((sort) => {
        return { title: t(sort.title), sort: sort.sort };
      }),
      name: 'sort',
    },
  ];
  React.useEffect(() => {
    setKey(!key);
  }, [clearInput]);

  return (
    <Box py={5}>
      <Grid container direction="row" spacing={1} justify="space-evenly">
        <Grid item xs={12} sm={12} md={12} lg={3}>
          <CustomSearch
            key={key}
            onKeyDown={onKeyDown}
            onChange={(e) => setSearch(e.target.value)}
            label={t('filter.searchLabel')}
            onClick={() => {
              setFilter({ ...filter });
            }}
          />
        </Grid>
        {selectOptions.map((select) => (
          <Grid key={select.id} item xs={12} sm={4} md={4} lg={3}>
            <CustomSelect
              key={key}
              id={select.id}
              label={t(select.label)}
              options={select.options}
              onChange={(event, value) =>
                setFilter({ ...filter, [select.name]: (value && value[select.name]) || null })
              }
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

Filter.propTypes = {
  clearInput: PropTypes.bool.isRequired,
  filter: PropTypes.object.isRequired,
  setFilter: PropTypes.func.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default Filter;
