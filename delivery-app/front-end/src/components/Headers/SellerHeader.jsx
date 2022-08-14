import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import storage from '../../helpers/storage';
import OrdersLink from '../Links/OrdersLink';
import UserName from '../Text/UserName';
import LogoutButton from '../Buttons/LogoutButton';

const INITIAL_STATE = {
  name: '',
  isLoggedIn: true,
};

function SellerHeader() {
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

  return (
    <header className="customer-header">
      { !state.isLoggedIn && <Navigate to="/login" replace /> }
      <div className="left">
        <OrdersLink />
      </div>
      <div className="right">
        <UserName name={ state.name } />
        <LogoutButton onClick={ logout } />
      </div>
    </header>
  );
}

export default SellerHeader;
