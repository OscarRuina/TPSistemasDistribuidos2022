import { Button, Link } from '@chakra-ui/react';
import { Link as ReachLink } from 'react-router-dom';
import React, { useContext } from 'react';
import { UserContext } from '../../constants/UserContext';
import { disconnect } from '../../services/userService';

export default function DCButton() {
  const { user, setUser } = useContext(UserContext);
  const logOut = () => {
    setUser('');
    disconnect();
  };

  return (
    <Link as={ReachLink} to="/">
      <Button mt="2rem" ml="2rem" onClick={logOut}>
        Desconectar
      </Button>
    </Link>
  );
}
