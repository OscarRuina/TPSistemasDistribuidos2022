import { Box, Button, Flex } from '@chakra-ui/react';
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Auction from '../../ui/Auction/Auction';
import NavBar from '../../ui/NavBar/NavBar';
import PDF from '../../ui/PDF/PDF';
import "./UserPurchase.css"


export default function UserPurchase() {
  const navigate = useNavigate();
  const [isVentas, setIsVentas] = useState(false);
  const [verPDF, setVerPDF] = useState(false);
  const auction ={
        invoiceId: 1,
        purchaseDate: "21-08-2022",
        seller:{
          name: "Matias",
          lastname: "Rivero",
          username: "mathyz",
          email: "mati@gmail.com"
        },
        buyer:{
          name: "Lucas",
          lastname: "Molina",
          username: "lumo",
          email: "lumo@gmail.com"
        },
        products:[
          {
            name: "Silla",
            price: 150,
            quantity: 2
          },{
            name: "Mesa",
            price: 2550,
            quantity: 20
          }
        ],
        totalAmount: 1500
  }
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
          <Auction auction={auction}/>
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
