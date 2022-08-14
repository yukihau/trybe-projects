import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import storage from '../../helpers/storage';
import ProductsLink from '../Links/ProductsLink';
import MyOrdersLink from '../Links/MyOrdersLink';
import UserName from '../Text/UserName';
import LogoutButton from '../Buttons/LogoutButton';

const INITIAL_STATE = {
  name: '',
  isLoggedIn: true,
};

function CustomerHeader() {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    const getUser = async () => {
      const user = await storage.user.get();
      if (user) {
        return setState((s) => ({ ...s, name: user.name }));
      }
      return setState((s) => ({ ...s, isLoggedIn: false }));
    };

    getUser();
  }, []);

  const logout = () => {
    storage.user.remove();
    storage.cart.remove();
    return setState((s) => ({ ...s, isLoggedIn: false }));
  };

  const getPathClass = (path) => {
    switch (path) {
    case ('/customer/products'):
      return 'products';
    case ('/customer/orders'):
      return 'orders';
    default:
      return 'none';
    }
  };

  const { pathname } = useLocation();
  const pathClass = getPathClass(pathname);
  const className = `customer-header ${pathClass}`;

  return (
    <header className={ className }>
      { !state.isLoggedIn && <Navigate to="/login" replace /> }
      <div className="left">
        <ProductsLink />
        <MyOrdersLink />
      </div>
      <div className="right">
        <UserName name={ state.name } />
        <LogoutButton onClick={ logout } />
      </div>
    </header>
  );
}

export default CustomerHeader;
