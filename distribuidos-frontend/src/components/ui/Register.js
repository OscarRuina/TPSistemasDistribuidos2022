import React from 'react';
import { v4 as uuid } from 'uuid';
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
} from '@chakra-ui/react';
import '../../constants/styles.css';
import { registerUser } from '../services/registerUser';

export default function Register() {
  const [registerForm, setRegisterForm] = React.useState({
    user: '',
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = React.useState(false);

  const handleInputChange = e => {
    let { name, value } = e.target;
    setRegisterForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = () => {
    if (registerForm.password !== registerForm.repeatPassword) {
      setError(prev => true);
      return false;
    }
    setError(false);
    registerUser(registerForm);
  };

  return (
    <>
      <FormControl mt="2rem">
        <FormLabel>Email</FormLabel>
        <Input
          id={uuid()}
          type="text"
          name="user"
          value={registerForm.user}
          onChange={handleInputChange}
          required
        />
        <FormLabel>Contraseña</FormLabel>
        <Input
          id={uuid()}
          type="password"
          name="password"
          value={registerForm.password}
          onChange={handleInputChange}
          required
        />
        <FormLabel>Repetir Contraseña</FormLabel>
        <Input
          id={uuid()}
          type="password"
          name="repeatPassword"
          value={registerForm.repeatPassword}
          onChange={handleInputChange}
          required
        />
        {error && (
          <Text className="error ">passwords doesnt match, try again</Text>
        )}
        <Flex pt="2rem" justifyContent="center">
          <Button onClick={handleSubmit}>Registrar</Button>
        </Flex>
      </FormControl>
    </>
  );
}
