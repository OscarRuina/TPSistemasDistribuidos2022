import { Flex, Grid, HStack, Image, Text } from '@chakra-ui/react';
import React from 'react';
import bread from '../../Assets/images/bread1.jpg';

export default function SingleProduct({ product }) {
  return (
    <Flex
      minW="600px"
      p="1rem"
      width="80%"
      h="60%"
      borderRadius="25px"
      boxShadow="1px 3px 7px black"
      bgGradient="linear-gradient(to right, #2C5364, #203A43, #0F2027)"
      transition="all 0.2s ease-in-out"
      _hover={{ transform: 'scale(1.1)' }}
    >
      <HStack>
        <Grid w="100%" templateColumns="repeat(2 ,1fr)" gap="1rem">
          <Text>Product: {product.name.toUpperCase()}</Text>
          <Text>Category: {product.category.toUpperCase()}</Text>
          <Text>Price: {product.price}</Text>
          <Text>Quantity: {product.quantity}</Text>
          <Text>Date: {product.date.toUpperCase()}</Text>
        </Grid>
        <Image w="30%" borderRadius="25px" src={bread} alt=""></Image>
      </HStack>
    </Flex>
  );
}
