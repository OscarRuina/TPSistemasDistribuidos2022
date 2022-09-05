import {
  Box,
  Button,
  Flex,
  ListItem,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { getBalance } from '../../services/walletService';
import DCButton from '../ui/DCButton';
import { useMutation, useQuery } from 'react-query';
import { UserContext } from '../../constants/UserContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Account() {
  const { user, setUser } = useContext(UserContext);
  const { data, isLoading, isError } = useQuery('balance', async () =>
    getBalance(user)
  );
  const navigate = useNavigate();

  const addBalance = () => {};
  return (
    <Box w="100%" h="100%">
      <DCButton />
      <Flex m="0" pl="2rem">
        <Button
          position="absolute"
          right="2rem"
          w="100px"
          h="60px"
          borderRadius="5px"
          onClick={() => navigate(-1)}
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
          gap="5rem"
          display="flex"
          textAlign="center"
          placeItems="center"
          justifyContent="center"
          fontSize="2rem"
          pt="1.5rem"
        >
          <Link to="/wallet">
            <ListItem
              __hover={{ bgColor: 'blue.800', transform: 'scale(1.2)' }}
            >
              Wallet
            </ListItem>
          </Link>
          <Link to="/products">
            <ListItem __hover={{ bgColor: 'blue.800' }}>Productos</ListItem>
          </Link>
          <Link to="/userProducts">
            <ListItem __hover={{ bgColor: 'blue.800' }}>My Products</ListItem>
          </Link>
        </UnorderedList>
      </Box>
    </Box>
  );
}
