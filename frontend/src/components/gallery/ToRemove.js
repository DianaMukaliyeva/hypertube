/* eslint-disable no-magic-numbers */
import React from 'react';
import axios from 'axios';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BACKEND_URL;

const ToRemove = () => {
  const [users, setUsers] = React.useState([]);
  const [movies, setMovies] = React.useState([]);

  const getMovies = async () => {
    const res = await axios.get(baseURL + '/api/movies');
    setMovies(res.data.movies);
  };

  const handleClick = async (event) => {
    event.preventDefault();
    try {
      await authService.test();
      console.log('test auth');
    } catch (exception) {
      console.log('test error');
    }
  };

  const addMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post(baseURL + '/movies', {
        location: e.target.location.value,
      });
    } catch (e) {
      alert(e.response.data.message);
    }
    e.target.location.value = '';
    getMovies();
  };

  React.useEffect(() => {
    getMovies();
  }, []);

  return (
    <>
      <h3>Add movie location:</h3>
      <form onSubmit={addMovie}>
        <label>Location:</label>
        <input name="location"></input>
        <button type="submit">Save</button>
      </form>
      <h3>List of all movies locations:</h3>
      <ul>{movies && movies.map((movie, index) => <li key={index}>{movie.title}</li>)}</ul>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        TEST AUTH
      </Button>
    </>
  );
};

export default ToRemove;
