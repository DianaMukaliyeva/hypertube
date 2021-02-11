import React from 'react';

import { Container } from 'react-bootstrap';
import Landing from './components/layout/Landing';
import Hypertube from './components/gallery/Index';
import Navigation from './components/layout/Navigation';
import VideoPlayer from './components/VideoPlayer/VideoPlayer';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Container>
        <Navigation></Navigation>
        <Route exact path="/" component={Landing}></Route>
        <Switch>
          <Route exact path="/hypertube" component={Hypertube} />
          <Route exact path="/video-player" component={VideoPlayer} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
