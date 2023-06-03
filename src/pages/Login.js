import React from 'react';
import PropTypes from 'prop-types';
import logo from '../imagens/logo.png';
import logoDarkTheme from '../imagens/logoDarkTheme.png';
import './login.css';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      isValidName: false,
    };

    this.saveUserInfo = this.saveUserInfo.bind(this);
  }

  saveUserInfo({ target }) {
    const { value } = target;
    const minCaracteres = 3;
    if (value.length >= minCaracteres/*  && id === 'name' */) {
      this.setState({
        isValidName: true,
        name: value,
      });
    } else {
      this.setState({
        isValidName: false,
        name: value,
      });
    }
  }

  render() {
    const { name, isValidName } = this.state;
    const { saveUserInfo } = this;
    const { onCreateUser } = this.props;
    return (
      <div className="loginMainContainer">
          <img src={logoDarkTheme} alt="logo" />
          <div className="form">
          <label htmlFor="name">Didite seu nome</label>
          <input
            type="text"
            id="name"
            value={ name }
            onChange={ saveUserInfo }
          />

          <button
            disabled={ !isValidName }
            onClick={ () => onCreateUser({ name }) }
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  onCreateUser: PropTypes.func.isRequired,
};
export default Login;


