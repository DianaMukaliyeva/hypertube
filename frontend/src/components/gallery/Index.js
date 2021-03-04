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

  const getMovies = async () => {
    try {
      const moviesData = await galleryService.getMovies(page);
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

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <div>
      <Filter />
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
