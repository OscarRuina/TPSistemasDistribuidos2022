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
  VStack,
} from '@chakra-ui/react';
import { UserContext } from '../../constants/UserContext';
import React, { useContext } from 'react';
import { getAllProductsDiferent } from '../../services/productService';
import SingleProduct from '../ui/SingleProduct';
import SingleProductSmall from '../ui/SingleProductSmall';

export default function Products() {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [productForm, setProductForm] = React.useState([
    {
      name: '',
      category: '',
      priceMin: '',
      priceMax: '',
      dateInitial: '',
      dateFinal: '',
      userIdDistinct: user.id,
    },
  ]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProductForm({ ...productForm, [name]: value });
  };

  const submitForm = async () => {
    setLoading(true);
    await getAllProductsDiferent(productForm).then(res => {
      setProducts(res.products);
      setLoading(false);
    });
    console.log(products);
  };

  const showProducts = e => {
    return products.map((product, idx) => {
      return <SingleProductSmall key={idx} product={product} />;
    });
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
      <Flex flexDir={'column'} width="30%" minW="400px" gap="2rem">
        <Text as="h1" fontSize="xl" textDecor={'underline'}>
          Filtros
        </Text>
        <Flex>
          <FormLabel fontSize="1rem">Categoria</FormLabel>
          <Input
            value={productForm.category || ''}
            variant="outline"
            name="category"
            onChange={handleChange}
          ></Input>
        </Flex>
        <Flex gap=".5rem">
          <FormLabel fontSize="1rem" gap=".25rem" placeItems="center">
            Precio minimo
          </FormLabel>
          <Input
            value={productForm.priceMin || ''}
            name="priceMin"
            variant="outline"
            type="number"
            onChange={handleChange}
          ></Input>
          <FormLabel fontSize="1rem" gap=".25rem">
            Precio Maximo
          </FormLabel>
          <Input
            name="priceMax"
            value={productForm.priceMax || ''}
            onChange={handleChange}
            variant="outline"
            type="number"
          ></Input>
        </Flex>
        <Flex gap=".5rem">
          <FormLabel fontSize="1rem" gap=".25rem">
            Fecha desde
          </FormLabel>
          <Input
            name="dateInitial"
            value={productForm.dateInitial || ''}
            onChange={handleChange}
            variant="outline"
            type="date"
          ></Input>
          <FormLabel fontSize="1rem" gap=".25rem">
            hasta
          </FormLabel>
          <Input
            value={productForm.dateFinal || ''}
            name="dateFinal"
            variant="outline"
            type="date"
            onChange={handleChange}
          ></Input>
        </Flex>
      </Flex>
      <Box width="70%" paddingInline={'2rem'}>
        <FormLabel textDecor={'underline'}>Product</FormLabel>
        <Flex flexDir="row" justifyContent="space-between" gap="20px">
          <Input
            p="1rem"
            name="name"
            borderRadius="15px"
            value={productForm.name || ''}
            onChange={handleChange}
            variant="flushed"
            type="email"
          />
          <IconButton icon={<SearchIcon />} onClick={submitForm}></IconButton>
        </Flex>
        <FormHelperText>what are you looking for ? </FormHelperText>
        {products && (
          <Box>
            <VStack w="100%" p="1rem" minH="500px" gap="1rem" overflow="scroll">
              {showProducts()}
            </VStack>
          </Box>
        )}
      </Box>
    </FormControl>
  );
}
