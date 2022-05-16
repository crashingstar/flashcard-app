import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';

const pages = [
  ['Home','/home'], 
  ['Deck','/deck'], 
  ['Settings','/settingsTest'], 
  ['Logout','/logout']];

const NavBarComponent = () => {
  return (
    <AppBar position="static" >
        <Toolbar>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page[0]}
                sx={{ my: 2, color: 'white', display: 'block' }}
                href={page[1]}
                >
                {page[0]}
              </Button>
            ))}
          </Box>
          <Box sx={{ 
            right: '0%',
            position: 'absolute',
            display: { xs: 'none', md: 'flex' } 
            }}>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Login
              </Button>
              <Button sx={{ my: 2, color: 'white', display: 'block' }}>
                Register
              </Button>
          </Box>
        </Toolbar>
    </AppBar>
  );
};
export default NavBarComponent;