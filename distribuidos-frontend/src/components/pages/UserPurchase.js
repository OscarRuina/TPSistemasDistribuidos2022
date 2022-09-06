import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UserPurchase() {
  const navigate = useNavigate();

  return (
    <Box position="relative">
      <Flex position="absolute" right="2rem" top="2rem">
        <Button
          right="1rem"
          h="60px"
          w="100px"
          borderRadius="5px"
          onClick={() => navigate(-1)}
        >
          Return
        </Button>
      </Flex>
    </Box>
  );
}
