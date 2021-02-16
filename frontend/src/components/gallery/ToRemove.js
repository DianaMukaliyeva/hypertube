/* eslint-disable no-magic-numbers */
import React from 'react';
import axios from 'axios';
import authService from '../../services/auth';
import Button from '@material-ui/core/Button';

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BACKEND_URL;

const ToRemove = () => {
  const [users, setUsers] = React.useState([]);
  const [movies, setMovies] = React.useState([]);

  const getMovies = async () => {
    const res = await axios.get(baseURL + '/api/movies');
    setMovies(res.data.movies);
  };

  const getUsers = async () => {
    const res = await axios.get(baseURL + '/api/users');
    setUsers(res.data.users);
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

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(baseURL + '/api/users', {
        username: e.target.username.value,
        firstname: e.target.firstname.value,
        lastname: e.target.lastname.value,
      });
    } catch (e) {
      alert(e.response.data.message);
    }
    e.target.username.value = '';
    e.target.firstname.value = '';
    e.target.lastname.value = '';
    getUsers();
  };

  const addMovie = async (e) => {
    e.preventDefault();
    try {
      await axios.post(baseURL + '/movies', { location: e.target.location.value });
    } catch (e) {
      alert(e.response.data.message);
    }
    e.target.location.value = '';
    getMovies();
  };

  React.useEffect(() => {
    getUsers();
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
      <h3>Add user:</h3>
      <form onSubmit={addUser}>
        <div>
          <label>username:</label>
          <input name="username"></input>
        </div>
        <div>
          <label>firstname:</label>
          <input name="firstname"></input>
        </div>
        <div>
          <label>lastname:</label>
          <input name="lastname"></input>
        </div>
        <button type="submit">Save</button>
      </form>
      <h3>List of all users:</h3>
      <table style={{ border: '1px solid black', width: '100%' }}>
        <tbody>
          <tr>
            <th style={{ border: '1px solid black' }}></th>
            <th style={{ border: '1px solid black' }}>user id</th>
            <th style={{ border: '1px solid black' }}>username</th>
            <th style={{ border: '1px solid black' }}>firstname</th>
            <th style={{ border: '1px solid black' }}>lastname</th>
          </tr>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{index + 1}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{user.id}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{user.username}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{user.firstname}</td>
              <td style={{ border: '1px solid black', textAlign: 'center' }}>{user.lastname}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        TEST AUTH
      </Button>
    </>
  );
};

export default ToRemove;
