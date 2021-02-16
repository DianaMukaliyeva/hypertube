import React, { useEffect } from 'react';
import i18n from '../../i18n';
import { useTranslation } from 'react-i18next';

import { Form } from 'react-bootstrap';

import { useHistory } from 'react-router-dom';
import CustomModal from '../common/CustomModal';
import LoginForm from '../user/LoginForm';

import useModal from '../../hooks/useModal';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';

/* eslint-disable react/prop-types */
const Landing = ({ user, setUser }) => {
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };
  const { t } = useTranslation();
  useEffect(() => {
    changeLanguage('en');
  }, []);

  const history = useHistory();

  const login = () => {
    const path = 'hypertube';
    history.push(path);
  };

  const loginModal = useModal(<LoginForm setUser={setUser} />);

  return (
    <div style={{ marginTop: '50px', textAlign: 'center' }}>
      <h1>{t('Welcome')}</h1>
      <Form>
        <Form.Group>
          <Form.Control
            size="sm"
            style={{ width: '100px' }}
            as="select"
            onChange={(e) => changeLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="de">German</option>
            <option value="fi">Finnish</option>
            <option value="ru">Russian</option>
          </Form.Control>
        </Form.Group>
      </Form>
      {!user.userId && (
        <>
          <Box display="flex" justifyContent="center">
            <Box mr={2}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                onClick={loginModal.handleClickOpen}>
                Login
              </Button>
            </Box>
            <Box>
              <Button type="submit" variant="outlined" color="secondary">
                Create Account
              </Button>
            </Box>
          </Box>
          <Box mt={5}>
            <Button type="submit" variant="outlined" color="primary" onClick={login}>
              go to next page without AUTH
            </Button>
          </Box>
        </>
      )}
      <CustomModal {...loginModal} />
    </div>
  );
};

Landing.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default Landing;
