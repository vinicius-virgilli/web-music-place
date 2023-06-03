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
    if (name) {
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
    this.setState({[id]: value})
    const { name } = this.state;
    if (name ) {
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
    const { history } = this.props;
    const { loading, name, email, description, image, isValidInputs } = this.state;
    const exibir = (loading) ? (
      <Loading />
    ) : (
      <div>
        <Header userName={ name } image={image} history={history}/>
        <div className='perfilEdit'>
          <div>
          <label htmlFor="image">Url da imagem</label>
          
          <input
            type="text"
            id="image"
            value={ image }
            onChange={ this.saveUserInfo }
          />
          </div>

          <div>
          <label htmlFor="name">Nome</label>
          <input
            data-testid="edit-input-name"
            type="text"
            id="name"
            value={ name }
            onChange={ this.saveUserInfo }
          />
          </div>

          <div>
          <label htmlFor="email">Email</label>
          <input
            data-testid="edit-input-email"
            type="email"
            id="email"
            value={ email }
            onChange={ this.saveUserInfo }
          />
          </div>

          <div>
          <label htmlFor="description">Descrição</label>
          <textarea
            rows={5}
            data-testid="edit-input-description"
            type="text"
            id="description"
            value={ description }
            onChange={ this.saveUserInfo }
          />
          </div>

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
