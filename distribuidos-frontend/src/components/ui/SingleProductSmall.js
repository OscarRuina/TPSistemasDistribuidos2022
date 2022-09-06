import { Box, Flex, Grid, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import bread from '../../Assets/images/bread1.jpg';

export default function SingleProductSmall({ product }) {
  return (
    <Flex
      minW="200px"
      p=".5rem"
      width="90%"
      h="100px"
      fontSize=".75rem"
      borderRadius="25px"
      boxShadow="1px 3px 7px black"
      bgGradient="linear-gradient(to right, #2C5364, #203A43, #0F2027)"
      transition="all 0.2s ease-in-out"
      _hover={{ transform: 'scale(1.1)' }}
      position="relative"
    >
      <HStack
        gap="1rem"
        placeItems="center"
        justifyContent="center"
        textAlign="center"
        display="flex"
      >
        <Grid w="100%" templateColumns="repeat(2 ,1fr)" gap=".25rem">
          <Text>Product: {product.name.toUpperCase()}</Text>
          <Text>Category: {product.category.toUpperCase()}</Text>
          <Text>Price: {product.price}</Text>
          <Text>Quantity: {product.quantity}</Text>
          <Text>Date: {product.date.toUpperCase()}</Text>
        </Grid>
        <Box
          right="0"
          overflow="hidden"
          borderRadius="25px"
          objectFit="cover"
          placeSelf="center"
          bgColor="red.500"
          w="100%"
          h="100%"
        >
          <Image src={bread} alt=""></Image>
        </Box>
      </HStack>
    </Flex>
  );
}
