import React, { useEffect, useState } from 'react';
import NavBar from '../../ui/NavBar/NavBar';
import { useHistorialProductosCambios } from '../../../services/monitorService';
import './historial.css';
export default function HistorialProductos() {
  const { historial, loading } = useHistorialProductosCambios();

  const showHistorial = () => {
    return historial.map((item, idx) => {
      return (
        <div className="historial-item" key={idx}>
          <div className="historial-data">
            <h2>Id Producto: {item.productId}</h2>
            <h2>Fecha: {item.dateChanged}</h2>
          </div>
          <div className="historial-col">
            <div className="historial-item-row">
              <h1 className="title">Previo:</h1>
              <h2>Nombre: {item.previousName}</h2>
              <h2>Precio: {item.previousPrice}</h2>
              <h2>Stock: {item.previousStock}</h2>
            </div>
            <div className="historial-item-row">
              <h1 className="title">Nuevo:</h1>
              <h2>Nuevo Nombre: {item.newName}</h2>
              <h2>Nuevo Precio: {item.newPrice}</h2>
              <h2>Nuevo Stock: {item.newStock}</h2>
            </div>
          </div>
          <div className="historial-col"></div>
        </div>
      );
    });
  };

  return (
    <>
      <NavBar actual="HistorialProductos" />
      {loading ? (
        <div className="container-default">
          <NavBar actual="historialProductos" />
          <h1>Cargando...</h1>
        </div>
      ) : (
        <div className="historial-container">{showHistorial()}</div>
      )}
    </>
  );
}
