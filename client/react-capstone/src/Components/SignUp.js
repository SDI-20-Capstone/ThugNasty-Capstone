import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from "react";
import { useNavigate } from 'react-router-dom'

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
    const [newUser, setNewUser] = useState();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [organization, setOrganization] = useState("");
    const [rank, setRank] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();



    const handleSubmit = (event) => {
        event.preventDefault();
        let jsonData = {

          first_name: newUser.first_name,
          last_name: newUser.last_name,
          email: newUser.email,
          password: newUser.password,
          organization: newUser.organization,
          rank: newUser.rank,
          role: newUser.role
        };

        fetch("http://localhost:8081/userinfo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(jsonData),
        })
        .then((response) => {
          if (response.status === 200) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setOrganization("");
            setRank("");
            setRole("");
            alert("Account Created Successfully")
            navigate("/")
          } else {
            alert("Something went wrong, please try again")
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setOrganization("");
            setRank("");
            setRole("");
          }
        })
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
                  onChange={event => setFirstName(event.target.value)}
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
                  onChange={event => setLastName(event.target.value)}
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
                  onChange={event => setEmail(event.target.value)}
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
                   onChange={event => setPassword(event.target.value)}

                />
              </Grid>
               <Grid item xs={12} >
                <FormControl fullWidth>
                  <InputLabel id="org-dropdown">Organization</InputLabel>
                  <Select
                    labelId="organization-dropwdown"
                    id="org-select"
                    value={organization}
                    label="Organization"
                    onChange={event => setOrganization(event.target.value)}
                  >
                    <MenuItem value="SLD 30">SLD 30</MenuItem>
                    <MenuItem value="30 OG">30 OG</MenuItem>
                    <MenuItem value="30 MSG">30 MSG</MenuItem>
                    <MenuItem value="30 MDG">30 MDG</MenuItem>
                    <MenuItem value="30 CPTS">30 CPTS</MenuItem>
                    <MenuItem value="2 ROPS">2 ROPS</MenuItem>
                    <MenuItem value="2 SLS">2 SLS</MenuItem>
                    <MenuItem value="30 OSS">30 OSS</MenuItem>
                    <MenuItem value="30 SCS">30 SCS</MenuItem>
                    <MenuItem value="30 CES">30 CES</MenuItem>
                    <MenuItem value="30 CONS">30 CONS</MenuItem>
                    <MenuItem value="30 FSS">30 FSS</MenuItem>
                    <MenuItem value="30 LRS">30 LRS</MenuItem>
                    <MenuItem value="30 SFS">30 SFS</MenuItem>
                    <MenuItem value="30 HCOS">30 HCONS</MenuItem>
                    <MenuItem value="30 OMRS">30 OMRS</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              < Grid item xs={12} >
                <TextField
                required
                fullWidth
                id='Rank'
                label='Rank'
                name='Rank'
                autoComplete='Rank'
                onChange={event => setRank(event.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={() => setNewUser({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                organization: organization,
                rank: rank,
                role: 'user'
              }, () => {
                handleSubmit();
              })}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
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

