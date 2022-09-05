import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../constants/UserContext';
import { getAllProducts } from '../../services/productService';

export default function UserProducts() {
  const { user, setUser } = useContext(UserContext);
  const [products, setProducts] = useState(getAllProducts(user.id));
}
