import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import ProductsLink from '../Links/ProductsLink';
import MyOrdersLink from '../Links/MyOrdersLink';
import UserName from '../Text/UserName';
import LogoutButton from '../Buttons/LogoutButton';
import {
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from '../../helpers/storage';

const INITIAL_STATE = {
  name: '',
  isLoggedIn: true,
};

function Header() {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const getUser = async () => {
      const user = await getUserFromLocalStorage();
      if (user) {
        return setState((s) => ({ ...s, name: user.name }));
      }
      return setState((s) => ({ ...s, isLoggedIn: false }));
    };

    getUser();
  }, []);

  const logout = () => {
    removeUserFromLocalStorage();
    return setState((s) => ({ ...s, isLoggedIn: false }));
  };

  return (
    <header>
      { !state.isLoggedIn && <Navigate to="/login" replace /> }
      <ProductsLink />
      <MyOrdersLink />
      <UserName name={ state.name } />
      <LogoutButton onClick={ logout } />
    </header>
  );
}

export default Header;
