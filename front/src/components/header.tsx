import * as React from 'react';

import {Navbar, Container, Nav}  from 'react-bootstrap';

function Header () {
  return (
    <Navbar bg="transparent" sticky="top" expand="lg" style={{backgroundColor: 'black'}} >
      <Container fluid style={{backgroundColor: 'black'}} >
        <Navbar.Brand href="/" style={{margin: '0em', marginLeft: '5em', marginTop: '1em'}}>
          <img
            alt=""
            src="/mtk.png"
            width="100"
            height="100"
            className="d-inline-block align-top mtk-logo"
          />{' '}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll"/>
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
          <Nav
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/news">
              <p className="navbar-title">
                News
              </p>
            </Nav.Link>
            <Nav.Link href="/upload">
              <p className="navbar-title">
                Publier
              </p>
            </Nav.Link>
            <Nav.Link href="/signin">
              <p className="navbar-title">
                Se connecter
              </p>
            </Nav.Link>
            <Nav.Link href="/signup">
              <p className="navbar-title">
                S'inscrire
              </p>
            </Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header