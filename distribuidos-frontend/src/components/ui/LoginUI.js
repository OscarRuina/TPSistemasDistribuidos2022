import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import {
  Button,
  Center,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { UserContext } from '../../constants/UserContext';
import { logInUser } from '../../services/userService';
import { saveInLocalStorage } from '../../services/localStorageService';
import {useNavigate} from "react-router-dom"

export default function LoginUI() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = React.useState({
    username: '',
    password: '',
  });
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = React.useState(false);

  const handleInputChange = e => {
    let { name, value } = e.target;
    setLoginForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    await logInUser(loginForm.username, loginForm.password)
      .then(res => {
        setUser(res.data);
        saveInLocalStorage(res.data);
        navigate('/');
      })
      .catch(err => {
        setError(true);
      });
  };

  return (
    <FormControl pt="2rem">
      <FormLabel>Usuario</FormLabel>
      <Input
        type="text"
        id={uuid()}
        name="username"
        value={loginForm.username}
        onChange={handleInputChange}
      />
      <FormLabel>Contraseña</FormLabel>
      <Input
        id={uuid()}
        name="password"
        type="password"
        value={loginForm.password}
        onChange={handleInputChange}
        required
      />
      <Center color="red">
        {error ? <p>Usuario o contraseña incorrectos</p> : null}
      </Center>
      <Flex pt="2rem" justifyContent="center">
        <Button onClick={handleSubmit}>Ingresar</Button>
      </Flex>
    </FormControl>
  );
}
