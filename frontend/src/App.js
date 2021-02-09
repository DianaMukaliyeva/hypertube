import React from 'react';

import { Container } from 'react-bootstrap';
import Landing from './components/layout/Landing';
import Hypertube from './components/gallery/Index';
import Navigation from './components/layout/Navigation';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Navigation></Navigation>
          <Route exact path="/" component={Landing}></Route>
          <Switch>
            <Route exact path="/hypertube" component={Hypertube} />
          </Switch>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;
