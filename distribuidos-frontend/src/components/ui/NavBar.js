import { Box, Flex, HStack } from '@chakra-ui/react';
import React from 'react';
import NavbarModal from './NavbarModal';
export default function NavBar() {
  return (
    <Flex mt="2rem">
      <HStack mr="2rem" ml="2rem">
        <NavbarModal type="Ingresar" variant="modal" />
      </HStack>
    </Flex>
  );
}
