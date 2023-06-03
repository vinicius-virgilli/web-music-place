import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bubble as Menu } from 'react-burger-menu'
import iconeMenu from '../imagens/iconeMenu.png';
import iconeVoltar from '../imagens/iconeVoltar.png';
import iconePesquisarBranco from '../imagens/iconePesquisarBranco.svg';
import iconePesquisar from '../imagens/iconePesquisar.svg';
import iconeFavoritos from '../imagens/iconeFavoritos.png';
import iconePerfil from '../imagens/iconePerfil.svg';
import logo from '../imagens/logo.png';
import logoDarkTheme from '../imagens/logoDarkTheme.png';
import './header.css';

class Header extends React.Component {
  constructor() {
    super()

    this.state = {
      isMenuOpen: false,
      imageUrl: '',
      atual: 'pathname',
    }

    this.openMenu = this.openMenu.bind(this);
    this.saveSeachedArtist = this.saveSeachedArtist.bind(this);
    this.callGetArtistInfo = this.callGetArtistInfo.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    if (history) {
      const { pathname } = history.location;
      this.setState({
        atual: pathname,
      })
    }
  }
  openMenu() {
    const { isMenuOpen } = this.state;
    this.setState({isMenuOpen: !isMenuOpen})
  }

  saveSeachedArtist({target}) {
    const { onSearchedArtist } = this.props;
    onSearchedArtist(target.value);
  }

  callGetArtistInfo() {
    const { getArtistInfo } = this.props;
    getArtistInfo();
  }

  handleKeyDown({ key }) {
    const { getArtistInfo } = this.props;
    if (key === 'Enter') {
      getArtistInfo();
    }
  }
  render() {
    const {
      userName,
      image, 
      isSearchedArtistValid,
      searchedArtist,
    } = this.props;
    const { isMenuOpen, atual } = this.state;
    const { saveSeachedArtist, callGetArtistInfo, handleKeyDown } = this;

    const campoDeBusca = <div className='campoDeBusca'>
            <label
              htmlFor="buscar"
            >
              <input
                placeholder='busque por álbuns'
                type="text"
                value={ searchedArtist }
                onChange={ saveSeachedArtist }
                onKeyDown={ handleKeyDown }
              />
            </label>
            <button
              onClick={ callGetArtistInfo }
              disabled={ !isSearchedArtistValid }
            >
              <img alt='ícone de pesquisar' src={iconePesquisar}></img>

            </button>
          </div>

    const userImage = (image) ? <img alt='imagem do usuário' src={image} className='imagemUsuario'></img> : <img alt='' src={iconePerfil}></img>

    let logoOrCampoDeBusca = <div className='headerSubContainer'>
      <img src={logoDarkTheme} alt="logo" className='headerLogo'/>
      <Link to='/search'>
        <img
        alt=''
        src={iconePesquisar}
      ></img>
      </Link>
      
      </div>;

    if (atual === '/search') {
      logoOrCampoDeBusca = campoDeBusca;
    }

    return (
      <header>
        <div className='headerTopContainer'>
          <img alt='iconeMenu' src={logoDarkTheme} onClick={ this.openMenu } className='iconeMenu'></img>
          {logoOrCampoDeBusca}
        </div>    
      </header>
    );
  }
}
export default Header;
