import React from 'react';
import { AppBar, Toolbar, Button, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'; // If using react-router-dom for navigation

function Navbar() {
const navigate = useNavigate();

  return (
    <AppBar position="static" color="default">
      <Container>
        <Toolbar sx={{justifyContent:"space-around"}}>
          <Link to="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Dashboard</Button>
          </Link>
          <Link to="/add-patient" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Button color="inherit">Add Patient</Button>
          </Link>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }} >
            <Button color="inherit" onClick={() => {localStorage.removeItem("refreshToken"); navigate("/")}} >Logout</Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;