import React, { useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Flex, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { UserContext } from '../services/UserContext';
import { logInUser } from '../services/logInUser';
import { saveInLocalStorage } from '../services/saveUserLocalStorage';

export default function Login() {
  const [loginForm, setLoginForm] = React.useState({ user: '', password: '' });
  const { user, setUser } = useContext(UserContext);

  const handleInputChange = e => {
    let { name, value } = e.target;
    setLoginForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    await logInUser().then(data => {
      setUser(data.user);
      saveInLocalStorage(data.user);
    });
  };

  return (
    <FormControl pt="2rem">
      <FormLabel>Usuario</FormLabel>
      <Input
        type="text"
        id={loginForm.id}
        name="user"
        value={loginForm.user}
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
      <Flex pt="2rem" justifyContent="center">
        <Button onClick={handleSubmit}>Ingresar</Button>
      </Flex>
    </FormControl>
  );
}
