import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState, useContext  } from 'react';
import { useNavigate } from 'react-router-dom'
import { UserContext } from './UserContext';

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

export default function SignIn() {
  const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [existingUser, setExisitingUser] = useState();
    const { user, setUser } = useContext(UserContext);
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        let jsonData = {
            "email": existingUser.email,
            "password": existingUser.password,
          }
          fetch('http://localhost:8081/SignIn', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(jsonData)
          })
          .then((response) => {
            if (response.status === 201) {
              fetch('http://localhost:8081/SignIn')
                .then(res => res.json())
                .then(data => data.filter(element => element.email === existingUser.email))
                .then(filteredInfo => setUser({
                    loggedIn: true,
                    email: filteredInfo[0].email,
                    organization_id: filteredInfo[0].organization_id
                }))
              navigate('/');
            } else {
                alert('email/password incorrect')
                setUser({
                  loggedIn: false,
                  email: '',
                  password: ''
                })
                setEmail('');
                setPassword('');
            }
          })
        }
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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={event => setPassword(event.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setExisitingUser({
                email: email,
                password: password
              })}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}