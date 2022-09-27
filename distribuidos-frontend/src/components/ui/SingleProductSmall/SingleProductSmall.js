import { Box, Flex, Grid, HStack, Image, Text } from '@chakra-ui/react';
import React, { useContext } from 'react';
import { CartContext } from '../../../constants/CartContext';
import './SingleProductSmall.css';
import bread from '../../../Assets/images/bread1.jpg';

export default function SingleProductSmall({ product, role, tipo }) {
  const { addItemToCart } = useContext(CartContext);
  let productToAdd = {
    id: product.id,
    nombre: product.name,
    precio: product.price,
    stock: product.quantity,
    foto: product.photos[0].url,
    cantidad: '',
  };
  const handleAddToCart = () => {
    productToAdd = { ...productToAdd, cantidad: 1 };
    addItemToCart(productToAdd);
  };

  const handlePuja = () => {

  }
  const handleproductChange = () => {
    
  }
  const handleAuctionChange = () => {
    
  }

  return (
    <div className="container-product">
      <div className="image-product">
        <img
          //src={bread}
          src={product.photos.length !== 0 ? product.photos[0].url : bread}
          alt=""
        />
      </div>
      <div className="data-product">
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
      </div>
      {role != "MONITOR" && ( tipo == "product" ?
        <button className="btn-compra" onClick={handleAddToCart}>
          Comprar
        </button>
      :
      (
        <button className="btn-compra" onClick={handlePuja}>
          Pujar
        </button>
      )
      )}
      {role == "MONITOR" && ( tipo == "product" ?
        <button className="btn-compra" onClick={handleproductChange}>
          Ver historial de cambios
        </button>
      :
      (
        <button className="btn-compra" onClick={handleAuctionChange}>
          Ver historial de cambios
        </button>
      ))}
    </div>
  );
}
