import React, { useState, useContext, useEffect } from 'react';
import { CartContext } from '../../../constants/CartContext';
import { BsCart, BsCartFill } from 'react-icons/bs';
import './Cart.css';
import bootstrap, { Alert } from 'bootstrap';
import ItemCart from '../ItemCart/ItemCart';
import { toBuyShoppingCart, enviarInvoicesAKafka, enviarServerConsumaInvoices } from '../../../services/cartService';

export default function Cart({ balance, userId }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [productsLength, setProductsLength] = useState(0);

  const { cartItems, purchaseFinished } = useContext(CartContext);

  const date = new Date();
  //const futureDate = date.getDate() + 3;
  //date.setDate(futureDate);
  const defaultValue = date.toLocaleDateString('en-CA');

  useEffect(() => {
    setProductsLength(
      cartItems.reduce((previus, current) => previus + current.cantidad, 0)
    );
  }, [cartItems]);

  const total = cartItems.reduce(
    (previus, current) => previus + current.cantidad * current.precio,
    0
  );

  const handlePago = () => {
    let cartForm = { userCompraId: userId, itemCart: [], purchaseDate: defaultValue };
    if (balance < total) {
      alert('no dispones del saldo suficiente');
    } else {
      alert('realizando compra');
      
      let itemCarts = [];
      itemCarts = cartItems.map(item => {
        return { itemId: item.id, itemQuantity: item.cantidad };
      });
      cartForm.itemCart = itemCarts;
      console.log(cartForm)

      toBuyShoppingCart(cartForm).then(value => {
        if (value.status == 200) {
          purchaseFinished();
          enviarInvoicesAKafka(value.data);
          enviarServerConsumaInvoices();
        }
        console.log(value);
      });
    }
  };

  return (
    <div className="cart-container">
      <div className="cart-icon-container">
        <button onClick={() => setCartOpen(!cartOpen)} className="icon-cart">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            className="bi bi-cart-fill"
            viewBox="0 0 16 16"
          >
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </button>
        {!cartOpen && (
          <div className="number-items">
            <p>{productsLength}</p>
          </div>
        )}
      </div>

      <div className={`data-cart-container ${!cartOpen && 'no-visible'}`}>
        {cartItems && cartOpen && (
          <>
            <h2 className="title-cart">Tu carrito</h2>
            <hr />
            {cartItems.length === 0 ? (
              <p>Tu carrito esta vacio</p>
            ) : (
              <div>
                {cartItems.map((item, i) => (
                  <ItemCart key={i} item={item} />
                ))}
              </div>
            )}
            <hr />
            <h2 className="total-cart">Total: ${total}</h2>
            <button className="btn-pagar" onClick={handlePago}>
              Pagar
            </button>
          </>
        )}
      </div>
    </div>
  );
}
