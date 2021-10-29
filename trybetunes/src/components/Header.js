import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userLoaded: false,
      user: {
        name: '',
      },
    };
  }

  componentDidMount() {
    getUser()
      .then((data) => {
        this.setState({
          userLoaded: true,
          user: { name: data.name },
        });
      });
  }

  render() {
    const { userLoaded, user } = this.state;
    const { name } = user;

    const header = (
      <div>
        <nav>
          <Link to="/search" data-testid="link-to-search">
            Search
          </Link>
          <Link to="/favorites" data-testid="link-to-favorites">
            Favorites
          </Link>
          <Link to="/profile" data-testid="link-to-profile">
            Profile
          </Link>
        </nav>
        <article>
          <p>
            Olá,
            {' '}
            <span data-testid="header-user-name">{name}</span>
            !
          </p>
        </article>
      </div>
    );

    return (
      <div data-testid="header-component">
        { userLoaded ? header : <Loading /> }
      </div>
    );
  }
}

export default Header;
