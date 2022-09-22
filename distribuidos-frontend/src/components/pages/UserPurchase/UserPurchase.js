import { Box, Button, Flex } from '@chakra-ui/react';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../ui/NavBar/NavBar';
import PDF from '../../ui/PDF/PDF';
import "./UserPurchase.css"


export default function UserPurchase() {
  const navigate = useNavigate();
  const [isVentas, setIsVentas] = useState(false);
  const [verPDF, setVerPDF] = useState(false);
  /*
  <Button
          right="1rem"
          h="60px"
          w="100px"
          borderRadius="5px"
          onClick={() => navigate(-1)}
        >
          Return
        </Button>
  */
  return (
    <div>
      <NavBar actual="userPurchase"/>
      <div className='type-product-bar'>
        <button className={` btn ${!isVentas ? "btn-actual" : "btn-clickeable"}`} onClick={() => setIsVentas(false)}>Compras</button>
        <button className={`btn ${isVentas ? "btn-actual": "btn-clickeable"}`} onClick={() =>setIsVentas(true)}>Ventas</button>
      </div>
      {!isVentas ?
        <>

        <button onClick={() => setVerPDF(!verPDF)}>Ver</button>

        <button>Descargar</button>

        {verPDF && <PDF/>}
        </>
      :
        <>
        </>
      }
      
    </div>
  );
}
