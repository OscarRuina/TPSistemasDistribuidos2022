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
  HStack,
  ModalBody,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
} from '@chakra-ui/react';
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import wallet from '../../Assets/wallet.jpg';
import { UserContext } from '../../constants/UserContext';
import useGetBalance from '../../hooks/useGetBalance';
import { addBalance } from '../../services/walletService';
import NavBar from '../ui/NavBar/NavBar';

export default function Wallet() {
  const { user } = useContext(UserContext);
  const { balance, loading, error } = useGetBalance(user.id);
  const [saldoActual, setsaldoActual] = useState(balance);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [balanceForm, setBalanceForm] = React.useState({ balance: 0 });
  const [isChargeDone, setIsChargeDone] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setsaldoActual(balance);
  }, [balance])
  

  const handleInputChange = e => {
    let { name, value } = e.target;
    setBalanceForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const addBalanceToWallet = async () => {
    await addBalance(user.id, balanceForm.balance)
      .then(res => {
        setIsChargeDone(true);
        setIsError(false);
        setBalanceForm({ balance: `` });
        setsaldoActual(res);
        onOpen();
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
        setIsChargeDone(false);
      });
  };

  /*
  <Box position="relative" r="0" h="100px" w="100%">
        <Button
          position="absolute"
          right="2rem"
          top="2rem"
          h="60px"
          w="100px"
          borderRadius="5px"
          onClick={() => navigate(-1)}
        >
          Return
        </Button>
      </Box>
  */

  return (
    <Box w="100%">
      <NavBar actual="wallet"/>
      
      <Flex pt="5rem" flexDir={'column'}>
        <Flex
          bg="#edf3f8"
          _dark={{ bg: '#3e3e3e' }}
          p={50}
          w="100%"
          minH="600px"
          alignItems="center"
          justifyContent="center"
        >
          <Box
            maxW="xl"
            mx="auto"
            bg="white"
            _dark={{ bg: 'gray.800' }}
            shadow="lg"
            rounded="lg"
            minH="500px"
            w="500px"
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
              mt="3rem"
              alignItems="center"
              justifyContent="space-between"
              flexDir="column"
              px={4}
              py={2}
              bg="gray.900"
              roundedBottom="lg"
              textAlign="start"
              mb="2rem"
            >
              <chakra.h1
                pt="2rem"
                color="white"
                fontWeight="bold"
                fontSize="2xl"
                textAlign={'left'}
              >
                {loading ? "cargando..." : `Wallet Balance : ${saldoActual}$` }
              </chakra.h1>
              <HStack pt="1rem" pb="1rem" gap="2rem">
                <Input
                  name="balance"
                  value={balanceForm.balance}
                  type="number"
                  onChange={handleInputChange}
                ></Input>
                <Button w="100px" mt="1rem" onClick={addBalanceToWallet}>
                  Add
                </Button>
              </HStack>
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay onClick={onClose} />
              <ModalContent h="20%">
                <ModalBody
                  display="flex"
                  textAlign="center"
                  justifyContent="center"
                  pt="50px"
                  fontSize="1.5rem"
                >
                  Added Balance
                </ModalBody>
              </ModalContent>
            </Modal>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}
