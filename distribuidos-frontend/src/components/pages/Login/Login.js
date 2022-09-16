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
  import Register from '../../ui/Register';
  import LoginUI from '../../ui/LoginUI';
  import NavBar from '../../ui/NavBar/NavBar';
  
  export default function Login() {
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
                  <Tab mr="auto">Registro</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    {/* LOGIN PANEL  */}
                    <LoginUI onClose={onClose} />
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