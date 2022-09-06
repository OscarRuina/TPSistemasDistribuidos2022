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

export default function Account() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <Box w="100%" h="100%">
      <DCButton />
      <Flex m="0" pl="2rem">
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
        <Flex
          w="100%"
          position="relative"
          flexDir="row"
          gap="2rem"
          placeItems={'center'}
          boxShadow="1px 1px 0 gray.100"
        >
          <Text mr="auto" as="h1" pb="2rem" fontSize="1.5rem" mt="1.5rem">
            Bienvenido: {user.username.toUpperCase()}
          </Text>
        </Flex>
      </Flex>
      <Box
        h="100px"
        w="100%"
        border="1px solid black"
        bgColor="blue.900"
        color="white"
      >
        <UnorderedList
          listStyleType="none"
          gap="3rem"
          display="flex"
          textAlign="center"
          placeItems="center"
          justifyContent="center"
          fontSize="1.5rem"
          pt="1.5rem"
        >
          <Link to="/wallet">
            <ListItem
              transition="all 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.3)' }}
            >
              Wallet
            </ListItem>
          </Link>
          <Link to="/products">
            <ListItem
              transition="all 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.3)' }}
            >
              Productos
            </ListItem>
          </Link>
          <Link to="/userProducts">
            <ListItem
              transition="all 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.3)' }}
            >
              My Products
            </ListItem>
          </Link>
          <Link to="/userPurchase">
            <ListItem
              transition="all 0.2s ease-in-out"
              _hover={{ transform: 'scale(1.3)' }}
            >
              Purchase Records
            </ListItem>
          </Link>
        </UnorderedList>
      </Box>
    </Box>
  );
}
