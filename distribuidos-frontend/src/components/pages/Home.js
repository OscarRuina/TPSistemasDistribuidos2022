import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Link,
  Text,
} from '@chakra-ui/react';
import React, { useContext } from 'react';
import { Link as ReactLink } from 'react-router-dom';
import { ViewIcon } from '@chakra-ui/icons';

import { UserContext } from '../../constants/UserContext';
import DCButton from '../ui/DCButton';
import Products from './SearchProducts/Products.js';
import NavBar from '../ui/NavBar/NavBar';

export default function Home() {
  const { user, setUser } = useContext(UserContext);

  return (
    <div className='container-default'>
      {user?.role == "MONITOR" ?
        <NavBar actual="productsChange"/>
        :
        <NavBar actual="inicio"/>
      }
      <Products />
    </div>
  );
}
