import { Flex, Grid, HStack, Image, Link, Text } from '@chakra-ui/react';
import React from 'react';
import bread from '../../../Assets/images/bread1.jpg';
import Carousel from 'react-bootstrap/Carousel';
import './SingleProduct.css';
import { Link as ReachLink } from 'react-router-dom';

export default function SingleProduct({ product }) {
  //aun no funciona el carousel
  const mostarPhotos = () => {
    const itemsCarousel = product.photos.map(foto => {
      return (
        <Carousel.Item interval={1000} key={foto.order}>
          <img className="d-block w-30" src={foto.url} alt="" />
        </Carousel.Item>
      );
    });
    return <Carousel>{itemsCarousel}</Carousel>;
  };

  //<Image w="30%" borderRadius="25px" src={product.photos[0].url} alt=""></Image>
  return (
    <Link
      as={ReachLink}
      to={`/userProducts/${product.id}`}
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
          <p>
            <span>Producto: </span>
            {product.name.toUpperCase()}
          </p>
          <p>
            <span>Categoria: </span>
            {product.category.toUpperCase()}
          </p>
          <p>
            <span>Precio: </span>
            {product.price}
          </p>
          <p>
            <span>Cantidad: </span>
            {product.quantity}
          </p>
          <p>
            <span>Fecha: </span>
            {product.date.toUpperCase()}
          </p>
        </Grid>

        {mostarPhotos()}
      </HStack>
    </Link>
  );
}
