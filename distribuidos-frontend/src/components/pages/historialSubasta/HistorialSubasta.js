import './historial.css';
import React from 'react';
import { useHistorialSubastas } from '../../../services/monitorService';
import NavBar from '../../ui/NavBar/NavBar';

export default function HistorialSubasta() {
  const { historial, loading } = useHistorialSubastas();

  const showHistorial = () => {
    return historial.map((item, idx) => {
      return (
        <div className="historial-item" key={idx}>
          <div className="historial-data">
            <h2>Id Subasta: {item.auctionId}</h2>
            <h2>Fecha: {item.dateChanged} hs</h2>
          </div>
          <div className="historial-item-row">
            <h1>idProducto: {item.productId}</h1>
            <h2>Usuario: {item.idBuyer}</h2>
            <h2>Precio: {item.price}</h2>
          </div>
        </div>
      );
    });
  };

  return (
    <>
      <NavBar actual="HistorialProductos" />
      <div className="historial-container">{showHistorial()}</div>
    </>
  );
}
