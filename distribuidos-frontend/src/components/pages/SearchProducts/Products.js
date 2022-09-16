import { SearchIcon } from '@chakra-ui/icons';
import "./products.css";
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
import { UserContext } from '../../../constants/UserContext';
import React, { useContext, useEffect, useState } from 'react';
import { getAllProductsDiferent } from '../../../services/productService';
import SingleProduct from '../../ui/SingleProduct/SingleProduct';
import SingleProductSmall from '../../ui/SingleProductSmall/SingleProductSmall';
import axios from 'axios';

export default function Products() {
  const BASE_URL = 'http://127.0.0.1:5000';
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [productForm, setProductForm] = React.useState([
    {
      userIdDistinct: 0,
    },
  ]);
  const [productsDistintUser, setProductsDistintUser] = React.useState([]);
  const [productsFiltered, setProductsFiltered] = React.useState([]);
  //const [filtro, setFiltro] = useState("name");
  //datos de busqueda-----------------------
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [dateInitial, setDateInitial] = useState("");
  const [dateFinal, setDateFinal] = useState("");
  //----------------------------------------

  console.log(user);

  useEffect(() => {
    const getAllProducts = async () => {
      setLoading(true);

      await getAllProductsDiferent(productForm).then(res => {
        setProducts(res.products);
        user ? setProductsDistintUser(products.filter(product => product.userId != user.id )) : setProductsDistintUser(products);
        setProductsFiltered(productsDistintUser);
        setLoading(false);
      });
    };

    getAllProducts().catch(null);
    
  },[]);

  useEffect(() => {
    console.log("productos");
    console.log(products);
    //user != null ? setProductsDistintUser(products.filter(product => product.userId != user.id )): setProductsDistintUser(products);
    user ? setProductsDistintUser(products.filter(product => product.userId != user.id )): setProductsDistintUser(products);
    setProductsFiltered(productsDistintUser);
    console.log(productsDistintUser);
  }, [products, user]);


  /*const handleChangeFilter = e =>{
    setFiltro(e.target.value);
  }

  //prueba
  useEffect(() => {
    console.log(filtro);
  }, [filtro])*/
  
  //actualizaciones de todos los datos

  const handleNameChange = e =>{
    setName(e.target.value);
  }
  const handleCategoryChange = e =>{
    setCategory(e.target.value);
  }
  const handlePriceMinChange = e =>{
    setPriceMin(e.target.value);
  }
  const handlePriceMaxChange = e =>{
    setPriceMax(e.target.value);
  }
  const handleDateInitialChange = e =>{
    setDateInitial(e.target.value);
  }
  const handleDateFinalChange = e =>{
    setDateFinal(e.target.value);
  }
  

  //por ahora imprimo los datos
  const handleSearch = e =>{
    e.preventDefault();
    let cantidadDeFiltros = 0;
    //console.log(filtro);
    if(name != ""){
      setProductsFiltered(productsDistintUser.filter(product => product.name.toLowerCase().includes(name.toLowerCase())));
      //console.log(productsFiltered);
      //console.log(name);
      cantidadDeFiltros+=1;
    }
    if(category != ""){
      setProductsFiltered(productsDistintUser.filter(product => product.category.toLowerCase().includes(category.toLowerCase())));
      //console.log(category);
      cantidadDeFiltros+=1;
    }

    //varian los precios debo buscar
    if(priceMax=="" || priceMin==""){
      (priceMax=="" && priceMin!= "") && setProductsFiltered(productsDistintUser.filter(product => product.price >= priceMin));
      (priceMin=="" && priceMax!= "") && setProductsFiltered(productsDistintUser.filter(product => product.price <= priceMax));
      cantidadDeFiltros+=1;
    }else{
      setProductsFiltered(productsDistintUser.filter(product => product.price >= priceMin && product.price <= priceMax));
      cantidadDeFiltros+=1;
    }
      //console.log(priceMin);
      //console.log(priceMax);

    if(dateFinal=="" || dateInitial==""){
        (dateFinal=="" && dateInitial!= "") && setProductsFiltered(productsDistintUser.filter(product => product.date >= dateInitial));
        (dateInitial=="" && dateFinal!= "") && setProductsFiltered(productsDistintUser.filter(product => product.date <= dateFinal));
        cantidadDeFiltros+=1;
    }else{
      setProductsFiltered(productsDistintUser.filter(product => product.date >= dateInitial && product.date <= dateFinal));
      cantidadDeFiltros+=1;
    }
    
    if(cantidadDeFiltros == 0){
      setProductsFiltered(productsDistintUser);
    }
    //console.log(dateInitial);
    //console.log(dateFinal);
    
    console.log(productsFiltered);
  }

  const showProducts = e => {
    return productsFiltered.map((product, idx) => {
      return <SingleProductSmall key={idx} product={product} />;
    });
  };

  /*
  <select value={filtro} onChange={handleChangeFilter}>
    <option value="name">Nombre</option>
    <option value="category" selected>Categoria</option>
    <option value="price">Precio</option>
    <option value="date">Fecha de Elaboracion</option>
  </select>
  */

  return (
    <div className='container-products'>
      <div className='barra-filtros'>
        <h2 className='titulo-buscador'>Filtros</h2>
        <form className='buscador'>

          <p>Nombre</p>
          <input type="text" value={name} onChange={handleNameChange}/>

          <p>Categoria</p>
          <input type="text" value={category} onChange={handleCategoryChange}/>
          
          <p className='titulo-filtro'>Precio</p>
          
          <p>Precio Minimo</p>
          <input type="number" value={priceMin} onChange={handlePriceMinChange}/>
          <p>Precio Maximo</p>
          <input type="number" value={priceMax} onChange={handlePriceMaxChange}/>
          
          <p className='titulo-filtro'>Fecha de Elaboracion</p>
          
          <p>Fecha Inicio</p>
          <input type="date" value={dateInitial} onChange={handleDateInitialChange}/>
          <p>Fecha Fin</p>
          <input type="date" value={dateFinal} onChange={handleDateFinalChange}/>
          
          <IconButton icon={<SearchIcon />} onClick={handleSearch}></IconButton>
        </form>
      </div>
      <div className='lista-productos'>

        {productsFiltered.length != 0 ? showProducts() : <p>No se encontraron resultados</p>}
    
      </div>
    </div>
  );
}
