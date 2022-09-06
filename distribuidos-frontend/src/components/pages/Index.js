import React, { useContext } from 'react';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import { UserContext } from '../../constants/UserContext';
import NavBar from '../ui/NavBar';
import Home from './Home';

export default function Index() {
  const { user, setUser } = useContext(UserContext);

  return (
    <>
      {user && <Home user={user} />}
      {!user && <NavBar user={user} />}
    </>
  );
}
