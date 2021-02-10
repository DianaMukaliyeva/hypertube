import React from 'react';

import { Container } from 'react-bootstrap';
import Landing from './components/layout/Landing';
import Hypertube from './components/gallery/Index';
// import Navigation from './components/layout/Navigation';
import Navbar from './components/layout/Navbar';
import CssBaseline from '@material-ui/core/CssBaseline';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Box from '@material-ui/core/Box';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Container>
          <Navbar />
          <Box mt={10}>
            <Route exact path="/" component={Landing}></Route>
            <Switch>
              <Route exact path="/hypertube" component={Hypertube} />
            </Switch>
          </Box>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
