import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Register from './Register';
import Login from './Login';

export default function NavbarModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Ingresar</Button>
      <Modal h="600px" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Bienvenido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs>
              <TabList>
                <Tab ml="auto" mr="auto">
                  Login
                </Tab>
                <Tab mr="auto">Register</Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  {/* LOGIN PANEL  */}
                  <Login onClose={onClose} />
                </TabPanel>
                <TabPanel>
                  {/* REGISTER PANEL */}
                  <Register onClose={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
