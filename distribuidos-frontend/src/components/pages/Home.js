import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Link,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';

import { UserContext } from '../../constants/UserContext';
import DCButton from '../ui/DCButton';
import Products from '../ui/Products';

export default function Home() {
  const { user, setUser } = useContext(UserContext);

  return (
    <Box>
      <DCButton />
      <Flex mt="2rem" placeItems={'center'} gap="2rem">
        <Link as={ReactLink} to="/account">
          <IconButton ml="2rem" aria-label="View" icon={<ViewIcon />} />
        </Link>
        <Text fontFamily={'sans'} fontSize={'1.5rem'}>
          Bienvenido: {user.username.toUpperCase()}
        </Text>
      </Flex>
      <Center pt="2rem">
        <Products />
      </Center>
    </Box>
  );
}
