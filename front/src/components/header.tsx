import { Link, Menu, MenuItem } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Navbar, Container, Nav}  from 'react-bootstrap';
import {  useNavigate } from 'react-router-dom';

const apiUrl = 'http://localhost:8080'

axios.interceptors.request.use(
    config => {
      const { origin } = new URL(config.url as string);
      const allowedOrigins = [apiUrl];
      const token = localStorage.getItem('token');    if (allowedOrigins.includes(origin)) {
        config.headers!.authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

const Header : React.FC = () => {
  const nav = useNavigate()

  function logout() {
    localStorage.removeItem('token');
    nav('/')
  }

  function SignProfile() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    if (localStorage.getItem('token')) {
      const open = Boolean(anchorEl);

      const handleClick = (event: React.MouseEvent<HTMLParagraphElement, MouseEvent>) => {

        setAnchorEl(event.currentTarget);
        console.log(event.currentTarget)
        console.log(event.detail.toString());

      };

      const handleClose = () => {
        setAnchorEl(null);
      };

      const eraseAccount = async () => {
        try {
          await axios.delete(`${apiUrl}/auth/user`)
          localStorage.removeItem('token');
          nav('/')
        }
        catch {

        }
      }

      return (
        <>
        <Nav.Link href="">
            <p onClick={handleClick} className="navbar-title g-border-btn nav-spec">
              Mon profil
            </p>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem divider onClick={() => {nav('/news/me'); window.location.reload();}}>Mes posts</MenuItem>
              <MenuItem divider onClick={() => {nav('/news/liked'); window.location.reload();}}>Posts que j'aime</MenuItem>
              <MenuItem divider onClick={() => {nav('/news/saved'); window.location.reload();}}>Posts sauvegardés</MenuItem>
              <MenuItem onClick={eraseAccount}>Supprimer le compte</MenuItem>
            </Menu>
          </Nav.Link>
          <Nav.Link onClick={logout}>
            <p className="navbar-title p-border-btn nav-spec">
              Se déconnecter
            </p>
          </Nav.Link>
        </>
      )
    } else {
      return (
        <>
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
        </>
      )
    }
  }

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
                Fil d'actualité
              </p>
            </Nav.Link>
            <Nav.Link href="/upload">
              <p className="navbar-title">
                Publier
              </p>
            </Nav.Link>
            <SignProfile/>
            </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header