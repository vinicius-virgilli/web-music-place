import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../componentes/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import iconePerfil from '../imagens/iconePerfil.svg';
import './profile.css';

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
    const { history } = this.props;
    const { loading, userInfo } = this.state;
    const { name, email, image, description } = userInfo;

    const userImage = (image) ? <img alt='imagem do usuário' src={image} className='imagemUsuario'></img> : <img alt='' src={iconePerfil}></img>
    
    const exibir = (loading) ? (
      <Loading />
    ) : (
      <div className='perfil'>
        <Header userName={ name } image={image} history={history}/>
        <div className='perfilMainContainer'>
          {userImage}
          <div className='pefilSubContainer'>
            <h3>nome:</h3>
            <h3>
              {name}
            </h3>
          </div>
          
          <div className='pefilSubContainer'>
            <h3>email:</h3>
            <h3>
              {email}
            </h3>
          </div>

          <div className='pefilSubContainer'>
            <h3>descrição:</h3>
            <h3>
              {description}
            </h3>
          </div>

          <Link to="/profile/edit"><button>Editar perfil</button></Link>
        </div>
      </div>
    );
    return exibir;
  }
}
export default Profile;
