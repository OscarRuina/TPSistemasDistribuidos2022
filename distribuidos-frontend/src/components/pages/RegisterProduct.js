import React, { useContext, useState } from 'react';
import { UserContext } from '../../constants/UserContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import {uploadImages} from "../../firebase/config";
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
import NavBar from '../ui/NavBar/NavBar';
import { async } from '@firebase/util';

export default function RegisterProduct() {
  //los archivos de input file dan una lista de objetos e.target.files[0] el primer archivo tiene lenght
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
  const [imagenes, setImagenes] = useState(null);
  
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registerProductForm, setRegisterProductForm] =
    useState(defaultOpts);

  const handleInputChange = e => {
    let { name, value } = e.target;
    setRegisterProductForm(prev => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(imagenes);
    let listaImagenes = [];
    for (let i = 0; i < imagenes.length; i++) {
      if(i<5){
        try {
          let urlImagen = await uploadImages(imagenes[i]);
          listaImagenes.push(urlImagen);
        } catch (error) {
          console.log(error);
          alert("Fallo la subida de archivos");
        }
      }
    }
    console.log(listaImagenes);
    for (let j = 0; j < listaImagenes.length; j++) {
      registerProductForm.photos.push({order: j+1, url:listaImagenes[j]});
    }
    console.log(registerProductForm);

    submitForm();

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
  /*
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
  */
  return (
    <div>
      <NavBar/>
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
              Agregar un nuevo Producto
            </Center>
          </FormLabel>
          <Grid templateColumns="repeat(2,1fr)" gap=".5rem" p="1rem">
            <Box>
              <FormLabel>Nombre</FormLabel>
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
              <FormLabel>Categoria</FormLabel>
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
              <FormLabel>Cantidad</FormLabel>
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
              <FormLabel>Precio</FormLabel>
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
              <FormLabel>Fecha de elaboracion</FormLabel>
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
            <input type="file" onChange={e => setImagenes(e.target.files)} multiple accept="image/*" required/>
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
                Producto agregado satisfactoriamente
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
                Error al agregar producto
              </Box>
            ) : null}
          </Center>
          <Center mt="2rem">
            <Button type="submit" onClick={handleSubmit}>
              Agregar
            </Button>
          </Center>
        </FormControl>
      </Box>
    </div>
  );
}
