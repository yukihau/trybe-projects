import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import URL from '../helpers/gravatarHash';
import { saveGravatar } from '../redux/actions';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      localName: '',
    };
  }

  componentDidMount() {
    const { getGravatar, email } = this.props;
    if (!email) {
      this.getFromLocalStorage();
    } else {
      getGravatar(URL(email));
    }
  }

  getFromLocalStorage() {
    const { getGravatar } = this.props;
    const {
      player: {
        name, gravatarEmail },
      player,
    } = JSON.parse(localStorage.getItem('state'));
    if (player) {
      this.setState({ localName: name });
      getGravatar(URL(gravatarEmail));
    }
  }

  render() {
    const { gravatar, name } = this.props;
    const { localName } = this.state;

    return (
      <header>
        <img
          src={ gravatar }
          alt="Avatar do usuário"
          data-testid="header-profile-picture"
        />
        <span
          data-testid="header-player-name"
        >
          { ` Usuário: ${name || localName}` }
        </span>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getGravatar: (email) => dispatch(saveGravatar(email)),
});

const mapStateToProps = (state) => ({
  name: state.user.user,
  email: state.user.email,
  score: state.user.score,
  gravatar: state.user.gravatar,
});

Header.propTypes = {
  gravatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getGravatar: PropTypes.func.isRequired,
  // score: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
