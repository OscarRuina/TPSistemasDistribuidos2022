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
import { registerUser } from '../../services/userService';
import {useNavigate} from "react-router-dom"

export default function Register({ onClose }) {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = React.useState({
    name: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    repeatPassword: '',
    role: ""
  });

  const [error, setError] = React.useState(false);
  const [registerError, setRegisterError] = React.useState(false);

  const handleInputChange = e => {
    let { name, value } = e.target;
    setRegisterForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async () => {
    console.log(registerForm);
    if (registerForm.password !== registerForm.repeatPassword) {
      setError(prev => true);
      return false;
    }
    await registerUser(registerForm)
      .then(res => {
        onClose();
        return res.data;
      })
      .catch(err => {
        setError(false);
        setRegisterError(true);
      });
  };

  return (
    <>
      <FormControl mt="2rem">
        <FormLabel>Nombre</FormLabel>
        <Input
          id={uuid()}
          type="text"
          name="name"
          value={registerForm.name}
          onChange={handleInputChange}
          required
        />
        <FormLabel>Apellido</FormLabel>
        <Input
          id={uuid()}
          type="text"
          name="lastname"
          value={registerForm.lastname}
          onChange={handleInputChange}
          required
        />
        <FormLabel>Email</FormLabel>
        <Input
          id={uuid()}
          type="email"
          name="email"
          value={registerForm.email}
          onChange={handleInputChange}
          required
        />
        <FormLabel>Username</FormLabel>
        <Input
          id={uuid()}
          type="text"
          name="username"
          value={registerForm.username}
          onChange={handleInputChange}
          required
        />
        <FormLabel>Role</FormLabel>
        <Input
          id={uuid()}
          type="text"
          name="role"
          value={registerForm.role}
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
        <FormLabel>Repetir contraseña</FormLabel>
        <Input
          id={uuid()}
          type="password"
          name="repeatPassword"
          value={registerForm.repeatPassword}
          onChange={handleInputChange}
          required
        />
        {error && (
          <Text className="error ">las contraseñas no coinciden, intente de nuevo</Text>
        )}
        {registerError && (
          <Text className="error ">username ya existente, intente con otro</Text>
        )}
        <Flex pt="2rem" justifyContent="center">
          <Button onClick={handleSubmit}>Registrar</Button>
        </Flex>
      </FormControl>
    </>
  );
}
