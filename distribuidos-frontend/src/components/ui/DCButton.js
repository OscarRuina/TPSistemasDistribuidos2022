
import React, { useContext } from 'react';
import { UserContext } from '../../constants/UserContext';
import { disconnect } from '../../services/userService';
import { Link, useNavigate } from 'react-router-dom';

export default function DCButton() {
  const { user, setUser } = useContext(UserContext);
  const logOut = () => {
    setUser(undefined);
    disconnect();
  };

  return (
    <Link to="/">
      <button onClick={logOut}>
        Desconectar
      </button>
    </Link>
  );
}
