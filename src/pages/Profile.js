import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userInfo: {},
    };

    this.test = this.test.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  async test() {
    this.setState({ loading: true });
    const userInfo = await getUser();
    this.setState({
      userInfo,
      loading: false,
    });
  }

  render() {
    const { loading, userInfo } = this.state;
    const { name, email, image, description } = userInfo;
    const exibir = (loading) ? (
      <Loading />
    ) : (
      <div data-testid="page-profile">
        <Header userName={ name } />
        <div>
          <img src={ image } alt="imagem do usuário" data-testid="profile-image" />
          <h3 data-testid="profile-name">
            nome:
            {' '}
            {name}
          </h3>
          <h3 data-testid="profile-email">
            email:
            {' '}
            {email}
          </h3>
          <h3 data-testid="profile-description">
            descrição:
            {' '}
            {description}
          </h3>
          <Link to="/profile/edit">Editar perfil</Link>
        </div>
      </div>
    );
    return exibir;
  }
}
export default Profile;
