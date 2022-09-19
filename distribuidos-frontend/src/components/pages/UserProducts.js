import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../constants/UserContext';
import useGetProducts from '../../hooks/useProducts';
import NavBar from '../ui/NavBar/NavBar';
import SingleProduct from '../ui/SingleProduct/SingleProduct';


export default function UserProducts() {
  const { user, setUser } = useContext(UserContext);
  const { products, loading } = useGetProducts(user.id);
  const [myProducts, setMyProducts] = useState([]);
 

  const navigate = useNavigate();

  useEffect(() => {
    if(products.length != 0){
      if (user !== undefined) {
        setMyProducts(products.filter(product => product.userId == user.id ));
      }
    }
  }, [products]);

  
  const showProducts = () => {
    return myProducts?.map((product, idx) => {
      return <SingleProduct product={product} key={idx} />;
    });
  };

  return (
    <div>
      <NavBar actual="userProducts"/>
      <VStack
        mt="7rem"
        w="90%"
        minH="550px"
        ml="auto"
        mr="auto"
        pt="5rem"
        boxShadow="1px 1px 3px rgba(255,255,255,0.6)"
        bgColor="whiteAlpha.400"
        borderRadius="25px"
      >
        <Center pt="-1rem">
          <Text fontSize="2rem">Mis Productos</Text>
        </Center>
        
        <Link to="/newProduct">
              <button>Agregar</button>
          </Link>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <VStack w="100%" p="1rem" h="100vh" gap="1rem" overflow="scroll">
            {showProducts()}
          </VStack>
        )}
      </VStack>
    </div>
  );
}
