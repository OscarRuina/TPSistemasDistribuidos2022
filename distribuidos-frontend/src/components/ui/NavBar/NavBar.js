import { Box, Flex, HStack } from '@chakra-ui/react';
import { ArrowDownIcon, ArrowUpIcon } from '@chakra-ui/icons'
import React, { useContext, useState, useEffect } from 'react';
import NavbarModal from '../NavbarModal';
import useGetBalance from "../../../hooks/useGetBalance";
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../constants/UserContext';
import axios from 'axios';
import "./NavBar.css";
import DCButton from '../DCButton';
import Cart from '../Cart/Cart';

export default function NavBar({actual}) {
  const { user, setUser } = useContext(UserContext);
  const [visible, setVisible] = useState(false);
  //const { balance, loading, error } = useGetBalance(user?user.id:0);
  const [balance, setBalance] = useState(0);
  const BASE_URL = 'http://127.0.0.1:5000';

  const handleOptionsVisible = () => {
    setVisible(!visible);
  };

console.log(user);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const resp = await axios.post(`${BASE_URL}/addWallet`, {
          balance: 0,
          userId: user?user.id:0,
        });
        const data = await resp.data.balance;
        setBalance(data);
      } catch (error) {
        console.log(error);
      }
      
    };
    getBalance();
    
  }, [user])
  

  return (
    <div className='NavContainer'>
      <h1>TP Distribuidos 2022</h1>
      <ul>
        <li>
        {user && (actual == "inicio"? 
          <p>Inicio</p>:
          <Link to="/">
              <button>Inicio</button>
          </Link>)
          }
        </li>
        <li>
        {user && 
          (actual == "wallet"? 
          <p>Billetera</p>:
          <Link to="/wallet">
              Billetera
          </Link>)
        }
        </li>
        <li>
          {user && 
            (actual == "userProducts"? 
            <p>Mis Productos</p>:
            <Link to="/userProducts">
              <button>Mis Productos</button>
          </Link>)
          }
        </li>
        <li>
          {user && 
              (actual == "userPurchase"? 
              <p>Registro de Compras</p>:
              <Link to="/userPurchase">
                <button>Registro de Compras</button>
              </Link>)
          }
        </li>
      </ul>

      

      <div className='userData'>
        {user && <Cart balance={balance} userId={user.id}/>}
        {user ?
          <div className='userOptions'>
            <p>{user.username.toUpperCase()}</p>
            <button onClick={handleOptionsVisible} className='arrow'>{visible? <ArrowUpIcon w={5} h={5}/>: <ArrowDownIcon w={5} h={5}/>}</button>
            
            <div className={`opciones ${visible ? "visible": "no-visible"}`}>
              <p>saldo: {balance}</p>
              <Link to="/wallet">
                <button>Agregar saldo</button>
              </Link>
              <DCButton/>
            </div>
          </div>
          :
          <div>
            <NavbarModal type="Ingresar" variant="modal" />
          </div>
        }
      </div>
    </div>
  );
}
