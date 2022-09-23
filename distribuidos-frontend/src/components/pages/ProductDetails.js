import {
  Button,
  FormLabel,
  HStack,
  Input,
  Stack,
  StackItem,
  TagLabel,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../constants/UserContext';
import { getProductById, updateProduct } from '../../services/productService';

const getCurrentProduct = async (userId, productId) => {
  const product = await getProductById(userId, productId);
  return product;
};

export default function ProductDetails() {
  const [isModifying, setIsModifying] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { productId } = useParams();
  const [currentProduct, setCurrentProduct] = useState(null);
  const [modifiableProduct, setModifiableProduct] = useState(null);
  const [isProductModified, setIsProductModified] = useState(false);

  useEffect(() => {
    getCurrentProduct(user.id, productId).then(res => {
      setCurrentProduct(res);
      setModifiableProduct(res);
    });
  }, [productId]);

  const modificarProducto = () => {
    setIsModifying(prev => !prev);
  };

  const cancelarModificacion = () => {
    setModifiableProduct(currentProduct);
    setIsModifying(prev => !prev);
  };

  const guardarModificacion = () => {
    setIsProductModified(true);
    setIsModifying(false);
    updateProduct(modifiableProduct);
  };

  const handleInputChange = e => {
    let { name, value } = e.target;
    setModifiableProduct(prev => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <Stack
      w="90%"
      h="90%"
      justifyContent="center"
      placeItems="center"
      ml="auto"
      mr="auto"
      pt="4rem"
    >
      <VStack
        bgColor="blackAlpha.400"
        p="1rem"
        h="100%"
        w="90%"
        gap="1rem"
        borderRadius="25px"
      >
        <StackItem w="100%">
          <FormLabel>Nombre</FormLabel>
          <Input
            name="name"
            type="text"
            onChange={handleInputChange}
            value={modifiableProduct?.name}
            disabled={!isModifying}
            required
          ></Input>
        </StackItem>
        <StackItem w="100%">
          <FormLabel>Precio</FormLabel>
          <Input
            name="price"
            type="text"
            value={modifiableProduct?.price}
            onChange={handleInputChange}
            disabled={!isModifying}
            required
          ></Input>
        </StackItem>
        <StackItem w="100%">
          <FormLabel>Cantidad</FormLabel>
          <Input
            name="quantity"
            type="number"
            value={modifiableProduct?.quantity}
            onChange={handleInputChange}
            disabled={!isModifying}
            required
          ></Input>
        </StackItem>
        {!isModifying ? (
          <Button onClick={modificarProducto}>Modificar</Button>
        ) : (
          <HStack>
            <Button onClick={cancelarModificacion}>Cancelar</Button>
            <Button onClick={guardarModificacion}>Guardar</Button>
          </HStack>
        )}
        {isProductModified && (
          <Text color="green.500">Producto modificado</Text>
        )}
      </VStack>
    </Stack>
  );
}
