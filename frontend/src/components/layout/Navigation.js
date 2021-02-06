import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { PersonFill } from 'react-bootstrap-icons';
import { CameraReelsFill } from 'react-bootstrap-icons';
import { BoxArrowRight } from 'react-bootstrap-icons';

const Navigation = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/hypertube">
        {' '}
        <CameraReelsFill />
        Hypertube
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="ml-auto">
        <Nav.Link href="/profile">
          <PersonFill />
          Profile
        </Nav.Link>
        <Nav.Link href="/">
          <BoxArrowRight />
          Logout
        </Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
