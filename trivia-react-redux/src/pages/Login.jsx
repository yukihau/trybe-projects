import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { saveLogin } from '../redux/actions';
import { fetchTokenThunk } from '../helpers/triviaApi';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      user: '',
      isBtnDisabled: true,
      btnWasClicked: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendPlayerToLocalStorage = this.sendPlayerToLocalStorage.bind(this);
  }

  componentDidUpdate() {
    const { user: { token }, history } = this.props;
    const { email, user, btnWasClicked } = this.state;
    if (email && user && token && btnWasClicked) {
      history.push('/game');
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, () => this.validateForm());
  }

  validateForm() {
    const { user, email } = this.state;

    if (user.length > 0 && email.length > 0) {
      this.setState({
        isBtnDisabled: false,
      });
    } else {
      this.setState({
        isBtnDisabled: true,
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { userLogin, fetchToken } = this.props;
    const { email, user } = this.state;
    const login = { email, user };
    userLogin(login);
    fetchToken();
    this.sendPlayerToLocalStorage();
    this.setState({ btnWasClicked: true });
  }

  sendPlayerToLocalStorage() {
    const { user, email } = this.state;
    const state = {
      player: {
        name: user,
        assertions: 0,
        score: 0,
        gravatarEmail: email,
      },
    };
    localStorage.setItem('state', JSON.stringify(state));
  }

  render() {
    const { user, email, isBtnDisabled } = this.state;
    return (
      <section>
        <form onSubmit={ this.handleSubmit }>
          <input
            type="text"
            name="user"
            data-testid="input-player-name"
            value={ user }
            onChange={ this.handleChange }
            placeholder="Usuário"
          />
          <input
            type="email"
            name="email"
            data-testid="input-gravatar-email"
            value={ email }
            onChange={ this.handleChange }
            placeholder="E-mail"
          />
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ isBtnDisabled }
          >
            Jogar
          </button>

          <Link to="/settings">
            <button
              type="button"
              data-testid="btn-settings"
            >
              Settings
            </button>
          </Link>
        </form>
      </section>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user,
});

const mapDispatchToProps = (dispatch) => ({
  userLogin: (state) => dispatch(saveLogin(state)),
  fetchToken: () => dispatch(fetchTokenThunk()),
});

Login.propTypes = {
  userLogin: PropTypes.func.isRequired,
  fetchToken: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
  user: PropTypes.shape({
    email: PropTypes.string,
    user: PropTypes.string,
    token: PropTypes.string,
  }),
};

Login.defaultProps = {
  user: {
    email: false,
    user: false,
    token: false,
  },
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
