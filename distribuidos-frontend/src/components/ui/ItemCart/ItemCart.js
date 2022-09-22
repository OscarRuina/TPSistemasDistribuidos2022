import React from "react";
import { useContext } from "react";
import { CartContext } from "../../../constants/CartContext";
import "./ItemCart.css";

export default function ItemCart({item}){
    
    const {addItemToCart, deleteItemToCart} = useContext(CartContext);

    const {id} = item;

    return (
        <div className="item-container">
            <img src={item.foto} alt={item.nombre}></img>
            <div className="item-section-one">
                <div className="name">
                    <p>{item.nombre}</p>
                </div>
                <div className="btn-add">
                    <button onClick={() => addItemToCart(item)}>Agregar</button>
                </div>
                <div className="btn-delete">
                    <button onClick={() => deleteItemToCart(item)}>Sacar</button>
                </div>
            </div>
            <div className="item-section-two">
                <p>{item.cantidad}</p>
                <p>Total: ${item.cantidad * item.precio}</p>
               
            </div>
        </div>
    )
};