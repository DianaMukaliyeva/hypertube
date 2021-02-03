import React from 'react';
import { Switch, Route } from 'react-router-dom';

import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { Form } from 'react-bootstrap';

import About from './components/About';
import Hypertube from './components/Hypertube';
import Navigation from './components/layout/Navigation';

function App() {
  const { t } = useTranslation();

  const changeLanguage = (lang) => {
    console.log('here');
    i18n.changeLanguage(lang);
  };

  React.useEffect(() => {
    changeLanguage('en');
  }, []);

  return (
    <div>
      <Navigation></Navigation>
      <Form.Group>
        <Form.Control size="sm" as="select" onChange={(e) => changeLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="de">German</option>
          <option value="fi">Finnish</option>
          <option value="ru">Russian</option>
        </Form.Control>
      </Form.Group>
      <h1>{t('Welcome')}</h1>
      <p>Hypertube is here!!!</p>
      <Switch>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/hypertube">
          <Hypertube />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
