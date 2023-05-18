import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    const { userName } = this.props;
    return (
      <header data-testid="header-component">
        <div>
          <h3 data-testid="header-user-name">{ userName }</h3>
          <nav>
            <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
            <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
            <Link data-testid="link-to-profile" to="/profile">Perfil</Link>
          </nav>
        </div>

      </header>
    );
  }
}

Header.propTypes = {
  userName: PropTypes.string.isRequired,
};
export default Header;
