import { Box, Flex, Grid, HStack, Image, Text } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../constants/UserContext';
import { CartContext } from '../../../constants/CartContext';
import './SingleProductSmall.css';
import bread from '../../../Assets/images/bread1.jpg';
import {hacerPuja, getHistorial} from "../../../services/productService";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react';

export default function SingleProductSmall({ product, role, tipo }) {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const { user, setUser } = useContext(UserContext);
  const date = new Date();
  //const futureDate = date.getDate() + 3;
  //date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString('en-CA');

  const { addItemToCart } = useContext(CartContext);
  let productToAdd = {
    id: product.id,
    nombre: product.name,
    precio: product.price,
    stock: product.quantity,
    foto: product.photos[0].url,
    cantidad: '',
  };

  const [historial, setHistorial] = useState([]);

  const [precioOfrecido, setPrecioOfrecido] = useState(0);

  const hacerPujaDeProducto = async () => {
    //idProduct = int(request.json["productId"])
    //userId = int(request.json["userId"])
    //date = int(request.json["date"])
    //price = float(request.json["price"])
    let formPuja = {
      productId: product.id,
      userId: user.id,
      date: defaultValue,
      price: precioOfrecido
    }
    console.log(product);
    console.log(formPuja);
    let data;

    await hacerPuja(formPuja).then(res => {
      data = res.products;
    });

    alert("Puja realizada con exito");
    //a ver que imprime
    console.log(data);
  };

  const handleAddToCart = () => {
    productToAdd = { ...productToAdd, cantidad: 1 };
    addItemToCart(productToAdd);
  };

  const handleChangePrice = (e) => {
    console.log(e.target.value)
    setPrecioOfrecido(e.target.value);
  }

  const handlePuja = (e) => {
    e.preventDefault();
    //hago puja por ahora controlando por el precio, que es precio base
    console.log(defaultValue + precioOfrecido);
    if(precioOfrecido< product.price){
      alert("El precio ofrecido debe ser mayor al actual");
    }else{
      hacerPujaDeProducto();
    }
  }

  const traerElHistorial = async (message) => {
    console.log(message);
    let data;

    await getHistorial(message).then(res => {
      
      data = res.data.messages;
      res.data.messages.length !== 0 ? setHistorial(res.data.messages) : setHistorial([]);
    });
    if(historial.length == 0){
      //alert("No hay mensajes");
    }else{
      //a ver que imprime
      console.log(historial);
    }
    
    
  };

  const handleproductChange = () => {
    let message = {
      topic: `product_${product.id}`
    }
    traerElHistorial(message);
    onOpen();
  }
  
  const handleAuctionChange = () => {
    let message = {
      topic: `product_${product.id}`
    }
    traerElHistorial(message);
    onOpen();
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
        <>
          <input type="date" value={defaultValue} readOnly />
          <input type="number" value={precioOfrecido} onChange={(e) => handleChangePrice(e)} />
          <button className="btn-compra" onClick={(e) => handlePuja(e)}>
            Pujar
          </button>
        </>
      )
      )}
      {role == "MONITOR" && ( tipo == "product" ?
        <button className="btn-compra" onClick={() => (handleproductChange())}>
          Ver historial de cambios
        </button>
      :
      (
        <button className="btn-compra" onClick={() => (handleAuctionChange())}>
          Ver historial de cambios
        </button>
      ))}
      {role == "MONITOR" && (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Producto: {product.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {historial.length == 0 ? (<p>No hay Registros</p>) 
            :
            (historial.map((message, index) => {
              return <div key={index}>
                
                <table>
                  <tr>
                    <th>Tipo</th>
                    <th>fecha</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                  </tr>
                  <tr>
                    <td>{message.message.old[0].name == "null" ? "Creacion" : "Modificacion"}</td>
                    <td>{message.message.date}</td>
                    <td>{message.message.new[0].name}</td>
                    <td>{message.message.new[0].price}</td>
                  </tr>
                  
                </table>
                
              </div>
            }))}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      )}
    </div>
  );
}
