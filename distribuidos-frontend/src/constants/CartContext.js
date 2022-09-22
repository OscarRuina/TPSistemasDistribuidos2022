import {createContext, useEffect, useState} from "react";

export const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [cartItems, setCartItems] = useState(()=>{
        try {
            const productosEnLocalStorage = localStorage.getItem("cartProducts");
            return productosEnLocalStorage ? JSON.parse(productosEnLocalStorage) : [];
        } catch (error) {
            return [];
        }
    });

    useEffect(() => {
      localStorage.setItem("cartProduts", JSON.stringify(cartItems));
      console.log(cartItems);
    }, [cartItems]);

    const addItemToCart = (product) => {
        const inCart = cartItems.find((productInCart) => productInCart.id === product.id);

        if (inCart) {
            setCartItems(
                cartItems.map((productInCart)=> {
                    if(productInCart.id === product.id){
                        return {...inCart, cantidad: inCart.cantidad+1}
                    }else{
                        return productInCart;
                    }
                })
            )
            
        } else {
            setCartItems([...cartItems, {...product, cantidad: 1}]);
        }
    };

    const deleteItemToCart = (product) => {
        const inCart = cartItems.find((productInCart) => productInCart.id === product.id);

        if (inCart.cantidad === 1) {
            setCartItems(
                cartItems.filter(productInCart => productInCart.id !== product.id)
            )
        }else{
            setCartItems(
                cartItems.map((productInCart) => {
                if (productInCart.id === product.id) {
                    return {...inCart, cantidad: inCart.cantidad-1}
                } else {
                    return productInCart;
                }
                })
            )
        };
    };

    const purchaseFinished = () => {
        localStorage.removeItem("cartProducts");
        setCartItems([]);
    }

    return(
        <CartContext.Provider value={{cartItems, addItemToCart, deleteItemToCart, purchaseFinished}}>
            {children}
        </CartContext.Provider>
    )
    
};
