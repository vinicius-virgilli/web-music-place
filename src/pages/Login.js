import React, { useState } from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
      image: '',
      description: '',
      isValidName: false,
    };

    this.saveUserInfo = this.saveUserInfo.bind(this);
  }

  saveUserInfo({ target }) {
    const { value, id } = target;
    console.log(target);
    const minCaracteres = 3;
    if (value.length >= minCaracteres/*  && id === 'name' */) {
      this.setState({
        isValidName: true,
      });
    } else {
      this.setState({
        isValidName: false,
      });
    }
    this.setState({ [id]: value });
  }

  render() {
    const { name, email, image, description, isValidName } = this.state;
    const { saveUserInfo } = this;
    const { onCreateUser } = this.props;
    return (
      <div data-testid="page-login" className="loginMainContainer">
        <label htmlFor="image">image</label>
        <div className="form">
          <input
            type="text"
            id="image"
            value={ image }
            onChange={ saveUserInfo }
          />

          <label htmlFor="name">Nome</label>
          <input
            type="text"
            data-testid="login-name-input"
            id="name"
            value={ name }
            onChange={ saveUserInfo }
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={ email }
            onChange={ saveUserInfo }
          />

          <label htmlFor="description">Descrição</label>
          <input
            type="text"
            id="description"
            value={ description }
            onChange={ saveUserInfo }
          />
          <button
            data-testid="login-submit-button"
            disabled={ !isValidName }
            onClick={ () => onCreateUser({ name, image, email, description }) }
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

import React from 'react';

class ImageUploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null
    };
  }

  handleImageChange = (event) => {
    const file = event.target.files[0];
    this.setState({ selectedImage: URL.createObjectURL(file) });
  };

  render() {
    const { selectedImage } = this.state;

    return (
      <div>
        <input type="file" onChange={this.handleImageChange} />
        {selectedImage && <img src={selectedImage} alt="Selected" />}
      </div>
    );
  }
}

export default ImageUploader;

