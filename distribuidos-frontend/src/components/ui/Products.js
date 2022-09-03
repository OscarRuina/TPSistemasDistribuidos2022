import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Input,
  Text,
} from '@chakra-ui/react';

import React from 'react';
import { getProduct } from '../../services/productService';

export default function Products() {
  const [product, setProduct] = React.useState([
    {
      name: '',
      category: '',
      priceMin: '',
      priceMax: '',
      dateInitial: '',
      dateFinal: '',
    },
  ]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const submitForm = async () => {
    getProduct(product);
  };

  return (
    <FormControl
      pl="2rem"
      pr="2rem"
      width="100%"
      display="flex"
      boxShadow="1px 3px 7px  rgba(0,0,0,0.6)"
      pt="2rem"
      minH="500px"
      w="95%"
    >
      <Flex flexDir={'column'} width="30%" minW="400px" gap="20px">
        <Text as="h1" fontSize="xl" textDecor={'underline'}>
          filtros
        </Text>
        <FormLabel fontSize="1rem">Categoria</FormLabel>
        <Input
          value={product.category || ''}
          variant="outline"
          name="category"
          onChange={handleChange}
        ></Input>
        <Box></Box>
        <Flex>
          <FormLabel>Precio minimo</FormLabel>
          <Input
            value={product.priceMin || ''}
            name="priceMin"
            variant="outline"
            type="number"
            onChange={handleChange}
          ></Input>
          <FormLabel>Precio Maximo</FormLabel>
          <Input
            name="priceMax"
            value={product.priceMax || ''}
            onChange={handleChange}
            variant="outline"
            type="number"
          ></Input>
        </Flex>
        <Flex>
          <FormLabel>Fecha desde</FormLabel>
          <Input
            name="dateInitial"
            value={product.dateInitial || ''}
            onChange={handleChange}
            variant="outline"
            type="date"
          ></Input>
          <FormLabel>hasta</FormLabel>
          <Input
            value={product.dateFinal || ''}
            name="dateFinal"
            variant="outline"
            type="date"
            onChange={handleChange}
          ></Input>
        </Flex>
      </Flex>
      <Box width="70%" paddingInline={'2rem'}>
        <FormLabel textDecor={'underline'}>Producto</FormLabel>
        <Flex flexDir="row" justifyContent="space-between" gap="20px">
          <Input
            name="name"
            value={product.name || ''}
            onChange={handleChange}
            variant="flushed"
            type="email"
          />
          <IconButton icon={<SearchIcon />} onClick={submitForm}></IconButton>
        </Flex>
        <FormHelperText>Ingresa lo que estás buscando</FormHelperText>
      </Box>
    </FormControl>
  );
}
