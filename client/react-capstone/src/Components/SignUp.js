import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        OKR Tracker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignUp() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} >
                <TextField
                  autoComplete="given-name"
                  name="First Name"
                  required
                  fullWidth
                  id="First Name"
                  label="First Name"
                  autoFocus
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Last Name"
                  label="Last Name"
                  name="Last Name"
                  autoComplete="Last Name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Email"
                  label="Email"
                  type="Email"
                  id="Email"
                  autoComplete="new-email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                   required
                   fullWidth
                   id='Password'
                   label="Password"
                   name='Password'
                   autoComplete='Password'

                />
              </Grid>
               <Grid item xs={12} >
                <TextField
                  required
                  fullWidth
                  id="Organization"
                  label="Organization"
                  name="Organization"
                  autoComplete="Organization"
                />
              </Grid>
              < Grid item xs={12} >
                <TextField
                required
                fullWidth
                id='Rank'
                label='Rank'
                name='Rank'
                autoComplete='Rank'
                />
              </Grid>
              < Grid item xs={12}>
                <TextField
                required
                fullWidth
                id='Role'
                label='Role'
                name='Role'
                />

              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="SignIn" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

