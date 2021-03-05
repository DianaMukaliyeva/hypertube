import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import theme from './styles/theme';

import Hypertube from './components/gallery/Index';
import Landing from './components/layout/Landing';
import Navbar from './components/layout/Navbar';
import setAuthToken from './utils/setAuthToken';
import authService from './services/auth';

function App() {
  const [user, setUser] = useState({ userId: '', lang: '' });
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const setUserFromToken = (token) => {
      const decoded = jwt_decode(token);
      setUser({ userId: decoded.id, lang: decoded.lang });
			setAuthToken(token);
    };

    const checkToken = async () => {
      try {
        const { token } = await authService.getToken();
        setUserFromToken(token);
				history.push('/');
      } catch (e) {
        console.log(e);
      }
    };

    if (location.search === '?auth=token') {
      checkToken();
    } else if (localStorage.getItem('token')) {
      setUserFromToken(localStorage.getItem('token'));
    } else setAuthToken(null);
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
          {user.userId && <Navbar user={user} setUser={setUser} />}
          <Box mt={10}>
            <Route exact path="/">
              {user.userId ? (
                <Hypertube user={user} />
              ) : (
                <Landing user={user} setUser={setUser} />
              )}
            </Route>
            <Switch>
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
