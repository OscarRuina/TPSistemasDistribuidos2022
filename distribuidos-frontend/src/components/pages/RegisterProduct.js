import React, { useContext, useState } from 'react';
import { UserContext } from '../../constants/UserContext';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { uploadImages } from '../../firebase/config';
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

export default function RegisterProduct() {
  //los archivos de input file dan una lista de objetos e.target.files[0] el primer archivo tiene lenght
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const [isSubasta, setisSubasta] = useState(false);
  const defaultOpts = {
    name: '',
    category: '',
    quantity: '1',
    price: '',
    date: '',
    at_auction: "",
    priceActual: 0,
    dateFinal: "",
    userId: user.id,
    photos: [],
  };
  const [imagenes, setImagenes] = useState(null);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [registerProductForm, setRegisterProductForm] = useState(defaultOpts);

  const handleInputChange = e => {
    let { name, value } = e.target;
    if (name == "at_auction"){
      setisSubasta(value == "true" ? true : false);
    }
    if(name == "quantity" && !isSubasta){
      setRegisterProductForm(prev => {
        return { ...prev, [name]: value };
      });
    }else if(name != "quantity"){
      setRegisterProductForm(prev => {
        return { ...prev, [name]: value };
      });
    }
    
    console.log(registerProductForm);
    console.log(isSubasta)
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if(isSubasta){
      setRegisterProductForm(prev => {
        return { ...prev, quantity: 1 };
      });
    }
    console.log(registerProductForm)
    console.log(imagenes);
    let listaImagenes = [];
    for (let i = 0; i < imagenes.length; i++) {
      if (i < 5) {
        try {
          let urlImagen = await uploadImages(imagenes[i]);
          listaImagenes.push(urlImagen);
        } catch (error) {
          alert('Fallo la subida de archivos');
        }
      }
    }
    for (let j = 0; j < listaImagenes.length; j++) {
      registerProductForm.photos.push({ order: j + 1, url: listaImagenes[j] });
    }

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
        setIsError(true);
        setIsSuccess(false);
      });
  };

  return (
    <div>
      <NavBar />
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
                value={isSubasta ? 1 : registerProductForm.quantity}
                onChange={handleInputChange}
                readonly={isSubasta? true : false}
                required
              ></Input>
            </Box>
            <Box>
              
              <FormLabel>{isSubasta ? "Precio Inicial" : "Precio"}</FormLabel>
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
            <div onChange={handleInputChange}>
              <input type="radio" id="Venta" name="at_auction" value={`${false}`} defaultChecked/>
                <label for="venta">Venta</label>
              <input type="radio" id="Subasta" name="at_auction" value={`${true}`} />
                <label for="Subasta">Subasta</label>
            </div>
            
            <input type="file" onChange={e => setImagenes(e.target.files)} multiple accept="image/*" required/>
            {isSubasta &&
              <Box>
                <FormLabel>Fecha de Finalizacion</FormLabel>
                <Input
                  htmlFor="dateFinal"
                  id={uuid()}
                  type="datetime-local"
                  name="dateFinal"
                  value={registerProductForm.dateFinal}
                  onChange={handleInputChange}
                  
                  required={isSubasta}
                ></Input>
             </Box>
            }
            
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
