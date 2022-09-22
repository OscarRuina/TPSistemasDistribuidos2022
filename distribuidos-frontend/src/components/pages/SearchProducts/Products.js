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
import { CartContext } from '../../../constants/CartContext';

export default function Products() {
  const BASE_URL = 'http://127.0.0.1:5000';
  const { user, setUser } = useContext(UserContext);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isSubasta, setIsSubasta] = useState(false);
  const [productForm, setProductForm] = useState([
    {
      userIdDistinct: 0,
    },
  ]);
  var productsDistintUser = [];
  const [productsFiltered, setProductsFiltered] = useState([]);
  //const [filtro, setFiltro] = useState("name");
  //datos de busqueda-----------------------
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [dateInitial, setDateInitial] = useState("");
  const [dateFinal, setDateFinal] = useState("");
  //----------------------------------------

  useEffect(() => {
    //console.log("cargando componente...")
    const getAllProducts = async () => {
      setLoading(true);

      await getAllProductsDiferent(productForm).then(res => {
        setProducts(res.products);
        user !== undefined ? productsDistintUser = products.filter(product => product.userId != user.id) : productsDistintUser = products;
        setProductsFiltered(productsDistintUser);
        setLoading(false);
      });
    };

    getAllProducts().catch(null);

    //console.log("fin carga...")
  },[]);

  useEffect(() => {
    console.log("productos");
    console.log(products);
    //user != null ? setProductsDistintUser(products.filter(product => product.userId != user.id )): setProductsDistintUser(products);
    //user !== undefined ? setProductsDistintUser(products.filter(product => product.userId != user.id )) : setProductsDistintUser(products);
    if(products.length != 0){
      if (user !== undefined) {
        //console.log("usuario seteado")
        productsDistintUser = products.filter(product => product.userId != user.id );
      } else {
        //console.log("usuario undefined")
        productsDistintUser = products;
      }
      setProductsFiltered(productsDistintUser);
    }
    
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
  };
  const handleCategoryChange = e =>{
    setCategory(e.target.value);
  };
  const handlePriceMinChange = e =>{
    setPriceMin(e.target.value);
  };
  const handlePriceMaxChange = e =>{
    setPriceMax(e.target.value);
  };
  const handleDateInitialChange = e =>{
    setDateInitial(e.target.value);
  };
  const handleDateFinalChange = e =>{
    setDateFinal(e.target.value);
  };
  

  //por ahora imprimo los datos
  const handleSearch = e =>{
    e.preventDefault();

    let cantidadDeFiltros = 0;
    user !== undefined ? productsDistintUser = products.filter(product => product.userId != user.id) : productsDistintUser = products;
    let listaAFiltrar = productsDistintUser;
    //console.log(cantidadDeFiltros);
    //console.log(productsFiltered);
    
    //console.log(filtro);
    if(name != ""){
      listaAFiltrar = listaAFiltrar.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
      //console.log(productsFiltered);
      //console.log(name);
      cantidadDeFiltros+=1;
    }
    if(category != ""){
      listaAFiltrar = listaAFiltrar.filter(product => product.category.toLowerCase().includes(category.toLowerCase()));
      //console.log(category);
      cantidadDeFiltros+=1;
    }

    //varian los precios debo buscar
    if(priceMax!="" && priceMin!=""){
      listaAFiltrar = listaAFiltrar.filter(product => product.price >= priceMin && product.price <= priceMax);
      cantidadDeFiltros+=1;
    }else{
      if(priceMax=="" && priceMin!= ""){
        listaAFiltrar = listaAFiltrar.filter(product => product.price >= priceMin);
        cantidadDeFiltros+=1;
      }
      else if (priceMin=="" && priceMax!= ""){
        listaAFiltrar = listaAFiltrar.filter(product => product.price <= priceMax);
        cantidadDeFiltros+=1;
      }
    }
      //console.log(priceMin);
      //console.log(priceMax);


    if(dateFinal!="" || dateInitial!=""){
      listaAFiltrar = listaAFiltrar.filter(product => product.date >= dateInitial && product.date <= dateFinal);
      cantidadDeFiltros+=1;
        
    }else{
      if (dateFinal=="" && dateInitial!= ""){
        listaAFiltrar = listaAFiltrar.filter(product => product.date >= dateInitial);
        cantidadDeFiltros+=1;
      }else if(dateInitial=="" && dateFinal!= ""){
        listaAFiltrar = listaAFiltrar.filter(product => product.date <= dateFinal);
        cantidadDeFiltros+=1;
      }
    }
    
    setProductsFiltered(listaAFiltrar);
  };

  const showProducts = () => {
    /*console.log("mostrando productos")
    console.log(productsFiltered)*/
    if(productsFiltered.length != 0){
      return productsFiltered.map((product, idx) => {
        return <SingleProductSmall key={idx} product={product} />;
      });
    }else{
      return <p className='no-found'>No se encontraron resultados</p>;
    }
    
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
      <div className='type-product-bar'>
        <button className={` btn ${!isSubasta ? "btn-actual" : "btn-clickeable"}`} onClick={() => setIsSubasta(false)}>Ventas</button>
        <button className={`btn ${isSubasta ? "btn-actual": "btn-clickeable"}`} onClick={() =>setIsSubasta(true)}>Subastas</button>
      </div>
      <div className='barra-filtros'>
            <h2 className='titulo-buscador'>Filtros</h2>

            <div className='buscador'>

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
            </div>
        </div>
      {!isSubasta ? 
          <div className='lista-productos'>
            {showProducts()}
          </div>
      :
        <div className='lista-products-subasta'>
          <p className='no-found'>No hay productos en subasta</p>
        </div>
      }
      
    </div>
  );
};
// {productsFiltered.length != 0 ? showProducts() : <p className='no-found'>No se encontraron resultados</p>}