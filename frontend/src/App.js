import React, { useState, useEffect } from 'react';

import { Container } from 'react-bootstrap';
import Landing from './components/layout/Landing';
import Hypertube from './components/gallery/Index';
import Navbar from './components/layout/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';

function App() {
  const [user, setUser] = useState({ userId: '', lang: '' });

  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      const decoded = jwt_decode(localStorage.getItem('token'));
      setUser({ userId: decoded.id, lang: decoded.lang });
    }
    // console.log('app token', localStorage.getItem('token'));
  }, []);

  // TO DO private routing
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
          {user.userId && <Navbar user={user} setUser={setUser} />}
          <Box mt={10}>
            <Route exact path="/">
              {user.userId ? <Hypertube user={user} /> : <Landing user={user} setUser={setUser} />}
            </Route>
            <Switch>
              <Route exact path="/hypertube">
                <Hypertube user={user} />
              </Route>
            </Switch>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
