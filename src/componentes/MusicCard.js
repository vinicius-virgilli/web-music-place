import React from 'react';
import PropTypes from 'prop-types';
import './musicCard.css';
import iconeFavoritosRed from '../imagens/iconeFavoritos.png';
import iconeFavoritosWhite from '../imagens/coracaoBranco.png';
import gifRemove from '../imagens/gifFavoritosRemove.gif';
import gifAdd from '../imagens/gifFavoritosAdd.gif';
import { Redirect, Link as div } from 'react-router-dom/cjs/react-router-dom.min';


class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      check: false,
      add: false,
      classe: 'favoritar',
      remove: false,
      redirect: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.updateCheckBox = this.updateCheckBox.bind(this);
    this.redirectToMusic = this.redirectToMusic.bind(this);
  }

  componentDidMount() {
    this.updateCheckBox();
  }

  onChangeInput() {
    const { onAddOrRemoveSong } = this.props;
    const { check } = this.state;
    if (check) {
      this.setState({
        remove: true,
        classe: 'changeFavorite',
      })
    } else {this.setState({
      add: true,
      classe: 'changeFavorite',
    })}
    setTimeout(() => {
      this.setState({
        remove: false,
        add: false,
        classe: 'favoritar',
      })
    }, 600);
    this.setState({ check: !check }, async () => onAddOrRemoveSong(this.props));
  }

  updateCheckBox() {
    const { trackName, favoriteSongs } = this.props;
    let test;
    if (favoriteSongs) {
      test = favoriteSongs.some((song) => song.trackName === trackName);
    }
    if (test) {
      this.setState({ check: true });
    } else { this.setState({ check: false }); }
  }

  redirectToMusic() {
    // console.log(trackName);
    localStorage.setItem('music', JSON.stringify(this.props));
    this.setState({ redirect: true });
  }

  render() {
    const { trackName, num, artistName, id
 } = this.props;
    const { check, add, remove, classe, redirect } = this.state;

    let icone;
    // console.log(trackId);
    
    if (add) {
      icone = gifAdd;
    } else if (remove) {
      icone = gifRemove;
    } else if (check) {
      icone = iconeFavoritosRed;
    } else {
      icone = iconeFavoritosWhite;
    }

    const musicName = (trackName.length > 31) ? (
      trackName.substring(0,31) + '...'
    ) : (
      trackName
    )

    const artist = (artistName.length > 31) ? (
      artistName.substring(0,31) + '...'
    ) : (
      artistName
    )

    const favoritar = (
            <img
              src={ icone }
              alt=""
              onClick={this.onChangeInput}
            />
          )   

    return (
      <div className="musicCard">
        {(redirect) && (<Redirect to='/music/album' />)}
        <div
          onClick={ this.redirectToMusic }
          className='link'
          >
            <section className='trackInfoContainer'>
              <p className='num'>{ num }</p>
            <div className='trackInfo'>
            <p>{ musicName }</p>
            <p className='artistSubTitle'>{ artist }</p>
            </div>
            </section>
        </div>
        <div className={classe}>
          {favoritar}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  favoriteSongs: PropTypes.arrayOf.isRequired,
  onAddOrRemoveSong: PropTypes.func.isRequired,
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
