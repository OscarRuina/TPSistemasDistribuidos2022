import {
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import DCButton from '../ui/DCButton';
import { UserContext } from '../../constants/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from '../ui/NavBar/NavBar';

export default function Account() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Box w="100%" h="100%">
        <Button
          position="absolute"
          right="2rem"
          top="2rem"
          w="100px"
          h="60px"
          borderRadius="5px"
          onClick={() => navigate('/')}
          zIndex="99"
        >
          Return
        </Button>
        <NavBar/>
  
    </Box>

  );
}
