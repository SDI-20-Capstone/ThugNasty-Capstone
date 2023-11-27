import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom'; // Assuming you're using React Router
import { UserContext } from './UserContext'
import { useContext, useState } from 'react'
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import PersonIcon from '@mui/icons-material/Person';

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logout = () => {
    setUser({
      loggedIn: false,
      email: "",
      organization_id: "",
      role: ""
    })
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>
              <AccountBoxIcon />
              <Link to="/Home" style={{ textDecoration: 'none', color: 'inherit' }}>
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <PersonIcon />
              <Link to="/Personal" style={{ textDecoration: 'none', color: 'inherit' }}>
                Personal Objectives
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <WorkIcon />
              <Link to="/Organization" style={{ textDecoration: 'none', color: 'inherit' }}>
                Organization Objectives
              </Link>
            </MenuItem>
            {user.role !== "user" ?
            <MenuItem onClick={handleClose}>
              <PersonIcon />
              <Link to="/admin" style={{ textDecoration: 'none', color: 'inherit' }}>
                Admin
              </Link>
            </MenuItem> :
            <></> }
          </Menu>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My OKRA
          </Typography>
          <Button color="inherit" onClick={() => logout()}>logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}



