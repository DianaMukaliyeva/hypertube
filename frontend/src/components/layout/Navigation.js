import React from 'react';
import { Link } from 'react-router-dom';
// import { Navbar } from 'react-bootstrap';

// const Navigation = () => {
//   return (
//     <Navbar bg="light" expand="lg">
//       <Navbar.Brand href="#home">Hypertube</Navbar.Brand>
//       <Navbar.Toggle aria-controls="basic-navbar-nav" />
//       <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
//     </Navbar>
//   );
// };
// export default Navigation;

const Navigation = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        {' '}
        home
      </Link>
      <Link style={padding} to="/about">
        {' '}
        about
      </Link>
      <Link style={padding} to="/hypertube">
        {' '}
        hypertube
      </Link>
    </div>
  );
};
export default Navigation;
