import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { getBalance } from '../../services/walletService';
import DCButton from '../ui/DCButton';
import { useMutation, useQuery } from 'react-query';
import { UserContext } from '../../constants/UserContext';

export default function Account() {
  const { user, setUser } = useContext(UserContext);
  const { data, isLoading, isError } = useQuery('balance', async () =>
    getBalance(user)
  );
  const mutation = useMutation('balance', async () => getBalance(user));

  const addBalance = () => {
    console.log('sarasa');
  };
  return (
    <Box w="100%" h="100%">
      <DCButton />
      <Flex mt="2rem" ml="2rem">
        {isLoading ? (
          <h1>loading..</h1>
        ) : (
          <Flex flexDir="column" gap="2rem">
            <Text as="h1">{user.toUpperCase()} WALLET</Text>
            <Text as="h2">Balance: {data}</Text>
            <Button onClick={addBalance()}>Deposit</Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
}
