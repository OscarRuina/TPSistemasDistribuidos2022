import { Box, Button, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { logout } from '../services/logOut';
import { UserContext } from '../services/UserContext';

export default function Home() {
  const { user, setUser } = useContext(UserContext);

  const logOut = () => {
    setUser('');
    logout();
  };
  return (
    <Box mt="2rem" ml="2rem">
      <Button onClick={logOut}>Desconectar</Button>
      <Text pt="2rem">Bienvenido: {user}</Text>
    </Box>
  );
}
