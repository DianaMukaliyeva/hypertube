import React from 'react';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

import MovieCard from './MovieCard';
import Filter from './Filter';
import galleryService from '../../services/gallery';

const Gallery = ({ setUser }) => {
  const [movies, setMovies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [filter, setFilter] = React.useState({});
  const [search, setSearch] = React.useState({
    value: '',
    typingTimeout: 0,
  });

  const getMovies = async () => {
    try {
      const moviesData = await galleryService.getMovies(page, filter, search.value);
      setPage(page + 1);
      if (moviesData.movies.length === 0) {
        setHasMore(false);
      } else {
        setMovies(movies.concat(moviesData.movies));
      }
    } catch (e) {
      if (e.response && e.response.status === 401) {
        setUser({ userId: '', lang: '' });
      }
    }
  };

  const type = (value) => {
    if (search.typingTimeout) {
      clearTimeout(search.typingTimeout);
    }
    setSearch({
      value,
      typingTimeout: setTimeout(() => {
        getMovies();
      }, 500),
    });
  };

  React.useEffect(() => {
    getMovies();
  }, [filter]);

  return (
    <div>
      <Filter type={type} filter={filter} setFilter={setFilter} />
      <InfiniteScroll
        style={{ overflow: 'none' }}
        dataLength={movies.length}
        next={getMovies}
        hasMore={hasMore}
        loader={
          <Box p={3} textAlign="center">
            <CircularProgress />
          </Box>
        }
        endMessage={<p></p>}>
        <Grid container spacing={3}>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Grid>
      </InfiniteScroll>
    </div>
  );
};

Gallery.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default Gallery;
