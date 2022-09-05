import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Link,
  Text,
  chakra,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import wallet from '../../Assets/wallet.jpg';
import { UserContext } from '../../constants/UserContext';
import { getBalance } from '../../services/walletService';

export default function Wallet() {
  const { user, setUser } = useContext(UserContext);

  getBalance(user.userId);

  const navigate = useNavigate();

  const addBalance = () => {};

  return (
    <Box position="relative" w="100%">
      <Box position="absolute" r="0">
        <Button
          mr="2rem"
          w="100px"
          h="60px"
          borderRadius="5px"
          onClick={() => navigate(-1)}
        >
          Return
        </Button>
      </Box>
      <Flex pt="5rem" flexDir={'column'}>
        <Flex
          bg="#edf3f8"
          _dark={{ bg: '#3e3e3e' }}
          p={50}
          w="full"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            maxW="xs"
            mx="auto"
            bg="white"
            _dark={{ bg: 'gray.800' }}
            shadow="lg"
            rounded="lg"
          >
            <Box px={4} py={2}>
              <chakra.h1
                color="gray.800"
                _dark={{ color: 'white' }}
                fontWeight="bold"
                fontSize="3xl"
                textTransform="uppercase"
              >
                Wallet
              </chakra.h1>
              <chakra.p
                mt={1}
                fontSize="sm"
                color="gray.600"
                _dark={{ color: 'gray.400' }}
              >
                Add money to your wallet and use it to buy products
              </chakra.p>
            </Box>

            <Image h={48} w="full" fit="cover" mt={2} src={wallet} />

            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexDir="column"
              px={4}
              py={2}
              bg="gray.900"
              roundedBottom="lg"
              textAlign="start"
            >
              <chakra.h1
                color="white"
                fontWeight="bold"
                fontSize="lg"
                textAlign={'left'}
              ></chakra.h1>
              <Flex
                flexDir="row"
                placeItems="center"
                justifyContent="center"
                textAlign="center"
                m="0"
                p="0"
                border="1px solid white"
              >
                <Input type="number"></Input>
                <Button mt="1rem" onClick={addBalance()}>
                  Add
                </Button>
              </Flex>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
