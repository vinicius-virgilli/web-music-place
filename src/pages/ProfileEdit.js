import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../componentes/Header';
import Loading from './Loading';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      isValidInputs: false,
      name: '',
      email: '',
      description: '',
      image: '',
    };

    this.test = this.test.bind(this);
    this.saveUserInfo = this.saveUserInfo.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  async test() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    const { name, image, description, email } = userInfo;
    if (name && image && description && email) {
      this.setState({ isValidInputs: true });
    }
    this.setState({
      name,
      email,
      image,
      description,
      loading: false,
    });
  }

  saveUserInfo({ target }) {
    const { value, id } = target;
    this.setState({ [id]: value });
    const { name, image, description, email } = this.state;
    if (name && description && email && image) {
      this.setState({
        isValidInputs: true,
      });
    } else {
      this.setState({
        isValidInputs: false,
      });
    }
  }

  render() {
    const { loading, name, email, description, image, isValidInputs } = this.state;
    const exibir = (loading) ? (
      <Loading />
    ) : (
      <div data-testid="page-profile-edit">
        <Header userName={ name } />
        <div>
          <label htmlFor="image">image</label>
          <input
            data-testid="edit-input-image"
            type="text"
            id="image"
            value={ image }
            onChange={ this.saveUserInfo }
          />

          <label htmlFor="name">Nome</label>
          <input
            data-testid="edit-input-name"
            type="text"
            id="name"
            value={ name }
            onChange={ this.saveUserInfo }
          />

          <label htmlFor="email">Email</label>
          <input
            data-testid="edit-input-email"
            type="email"
            id="email"
            value={ email }
            onChange={ this.saveUserInfo }
          />

          <label htmlFor="description">Descrição</label>
          <input
            data-testid="edit-input-description"
            type="text"
            id="description"
            value={ description }
            onChange={ this.saveUserInfo }
          />
          <Link to="/profile">
            <button
              data-testid="edit-button-save"
              disabled={ !isValidInputs }
              onClick={ () => updateUser({ name, image, email, description }) }
            >
              Salvar

            </button>
          </Link>

        </div>
      </div>
    );
    return exibir;
  }
}
export default ProfileEdit;
