import { UserContext } from '../Components/UserContext';
import { useContext } from 'react';

const LoggingIn = (existingUser) => {

  const { setUser } = useContext(UserContext);

  let jsonData = {
    "email": existingUser.email,
    "password": existingUser.password
  }
  fetch('http://localhost:8081/SignIn', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(jsonData)
  })
  .then((response) => {
    if (response.status === 201) {
      setUser({
        loggedIn: true,
        email: existingUser.email
      })
    } else {
      setUser({
        loggedIn: false,
        email: ''
      })
    }
  })
}

export default LoggingIn;