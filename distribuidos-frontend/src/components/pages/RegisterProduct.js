import React, { useContext } from 'react';
import { UserContext } from '../../constants/UserContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Button,
  Center,
  Grid,
} from '@chakra-ui/react';
import { createProduct } from '../../services/productService';

export default function RegisterProduct() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const defaultOpts = {
    name: '',
    category: '',
    quantity: '',
    price: '',
    date: '',
    userId: user.id,
    photos: [],
  };
  const [isError, setIsError] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [registerProductForm, setRegisterProductForm] =
    React.useState(defaultOpts);

  const handleInputChange = e => {
    let { name, value } = e.target;
    setRegisterProductForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const submitForm = async () => {
    await createProduct(registerProductForm)
      .then(res => {
        setIsSuccess(true);
        setIsError(false);
        setRegisterProductForm(defaultOpts);
      })
      .catch(err => {
        console.log(err);
        setIsError(true);
        setIsSuccess(false);
      });
  };

  return (
    <Box position="relative" mb="5rem">
      <Button
        position="absolute"
        top="-5rem"
        right="2rem"
        w="100px"
        h="60px"
        borderRadius="5px"
        onClick={() => navigate(-1)}
      >
        Return
      </Button>
      <Box
        mt="7rem"
        w="90%"
        h="550px"
        ml="auto"
        mr="auto"
        pt="5rem"
        boxShadow="1px 1px 3px rgba(255,255,255,0.6)"
        bgColor="whiteAlpha.400"
        borderRadius="25px"
      >
        <FormControl>
          <FormLabel>
            <Center
              fontSize="2rem"
              mb="2rem"
              textDecor="underline"
              textUnderlineOffset="2px"
              textDecorationThickness="1px"
            >
              Add new Product
            </Center>
          </FormLabel>
          <Grid templateColumns="repeat(2,1fr)" gap=".5rem" p="1rem">
            <Box>
              <FormLabel>Name</FormLabel>
              <Input
                htmlFor="name"
                id={uuid()}
                type="text"
                name="name"
                value={registerProductForm.name}
                onChange={handleInputChange}
                required
              ></Input>
            </Box>
            <Box>
              <FormLabel>Category</FormLabel>
              <Input
                htmlFor="category"
                id={uuid()}
                type="text"
                name="category"
                value={registerProductForm.category}
                onChange={handleInputChange}
                required
              ></Input>
            </Box>
            <Box>
              <FormLabel>Quantity</FormLabel>
              <Input
                htmlFor="quantity"
                id={uuid()}
                type="number"
                name="quantity"
                value={registerProductForm.quantity}
                onChange={handleInputChange}
                required
              ></Input>
            </Box>
            <Box>
              <FormLabel>Price</FormLabel>
              <Input
                htmlFor="price"
                id={uuid()}
                type="number"
                name="price"
                value={registerProductForm.price}
                onChange={handleInputChange}
                required
              ></Input>
            </Box>
            <Box>
              <FormLabel>Date</FormLabel>
              <Input
                htmlFor="date"
                id={uuid()}
                type="date"
                name="date"
                value={registerProductForm.date}
                onChange={handleInputChange}
                required
              ></Input>
            </Box>
          </Grid>
          <Center>
            {isSuccess ? (
              <Box
                bgColor="green.400"
                color="white"
                p="1rem"
                borderRadius="5px"
                w="100%"
                textAlign="center"
              >
                Product added successfully
              </Box>
            ) : null}
            {isError ? (
              <Box
                bgColor="red.400"
                color="white"
                p="1rem"
                borderRadius="5px"
                w="100%"
                textAlign="center"
              >
                Error adding product
              </Box>
            ) : null}
          </Center>
          <Center mt="2rem">
            <Button type="submit" onClick={submitForm}>
              Add Product
            </Button>
          </Center>
        </FormControl>
      </Box>
    </Box>
  );
}
