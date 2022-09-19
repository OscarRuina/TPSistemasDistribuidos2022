import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../ui/NavBar/NavBar';

export default function UserPurchase() {
  const navigate = useNavigate();

  /*
  <Button
          right="1rem"
          h="60px"
          w="100px"
          borderRadius="5px"
          onClick={() => navigate(-1)}
        >
          Return
        </Button>
  */
  return (
    <div>
      <NavBar actual="userPurchase"/>
      
    </div>
  );
}
