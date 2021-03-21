import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import MovieCard from './MovieCard';
import Filter from './Filter';
import galleryService from '../../services/gallery';

const Loader = () => (
  <Box p={3} textAlign="center">
    <CircularProgress />
  </Box>
);

const Gallery = ({ setUser, clearFilter }) => {
  const { t } = useTranslation();
  const [movies, setMovies] = React.useState([]);
  const [pageState, setPageState] = React.useState({ page: 0, hasMore: true, loading: true });
  const [search, setSearch] = React.useState('');
  const [filter, setFilter] = React.useState({});
  const [clearInput, setClearInput] = React.useState(false);
  const mountedRef = React.useRef(true);
  const filterRef = React.useRef(false);

  const getMovies = async () => {
    try {
      const pageToLoad = filterRef.current ? 1 : pageState.page + 1;
      const moviesData = await galleryService.getMovies(pageToLoad, filter, search);
      if (!mountedRef.current) return null;
      if (!filterRef.current) {
        setMovies(movies.concat(moviesData.movies));
      } else {
        setMovies(moviesData.movies);
        filterRef.current = false;
      }
      setPageState({
        page: moviesData.movies.length === 0 ? t('gallery.noMovies') : pageToLoad,
        loading: false,
        hasMore: moviesData.hasMore,
      });
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setUser({ userId: '', lang: '' });
        localStorage.removeItem('token');
      }
    }
  };

  React.useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (Object.values(filter).filter((v) => v).length > 0 || search) {
      setSearch('');
      setFilter({});
      setClearInput(!clearInput);
    }
  }, [clearFilter]);

  React.useEffect(() => {
    filterRef.current = true;
    setPageState({ ...pageState, loading: true });
    getMovies();
  }, [filter]);

  return (
    <div>
      <Filter clearInput={clearInput} setSearch={setSearch} filter={filter} setFilter={setFilter} />
      {pageState.loading ? (
        <Loader />
      ) : (
        <InfiniteScroll
          style={{ overflow: 'none' }}
          dataLength={movies.length}
          next={getMovies}
          hasMore={pageState.hasMore}
          endMessage={
            <Box p={3} textAlign="center">
              {pageState.page}
            </Box>
          }
          loader={<Loader />}>
          <Grid container spacing={3}>
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </Grid>
        </InfiniteScroll>
      )}
    </div>
  );
};

Gallery.propTypes = {
  setUser: PropTypes.func.isRequired,
  clearFilter: PropTypes.bool.isRequired,
};

export default Gallery;
