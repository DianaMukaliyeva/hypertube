import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './styles/theme';
import jwt_decode from 'jwt-decode';

import setAuthToken from './utils/setAuthToken';

import Hypertube from './components/gallery/Index';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';

import Box from '@material-ui/core/Box';
import { Container } from 'react-bootstrap';

function App() {
  const [user, setUser] = useState({ userId: '', lang: '' });

  useEffect(() => {
    setAuthToken(localStorage.getItem('token'));
    if (localStorage.getItem('token')) {
      const decoded = jwt_decode(localStorage.getItem('token'));
      setUser({ userId: decoded.id, lang: decoded.lang });
    }
  }, []);

  // TO DO remove switch, once authentication is implemented on backend
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
              <Route path="/recoverylink">
                <Landing user={user} setUser={setUser} />
              </Route>
            </Switch>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
