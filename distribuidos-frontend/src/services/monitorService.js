import { useEffect, useState } from 'react';
import { historialProductos } from '../constants/historial';
import { historialSubastas } from '../constants/historial';

export const useHistorialProductosCambios = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHistorialProductos = () => {
      setLoading(true);
      setHistorial(historialProductos);
      setLoading(false);
    };
    getHistorialProductos();
  }, []);

  return { historial, loading };
};

export const useHistorialSubastas = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getHistorialSubastas = () => {
      setLoading(true);
      setHistorial(historialSubastas);
      setLoading(false);
    };
    getHistorialSubastas();
  }, []);

  return { historial, loading };
};
