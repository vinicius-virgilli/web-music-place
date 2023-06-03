import React from 'react';
import { Link } from 'react-router-dom';
import iconeFavoritos from '../imagens/iconeFavoritos.png';
import iconePerfil from '../imagens/iconePerfil.svg';
import './footer.css';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <Link to="/profile"><img alt='iconePerfil' src={iconePerfil}></img><h3>Perfil</h3></Link>

        <Link to="/favorites"><img alt='iconeFavoritos' src={iconeFavoritos}></img><h3>Favoritas</h3></Link>
      </footer>
    )
  }
}
export default Footer;