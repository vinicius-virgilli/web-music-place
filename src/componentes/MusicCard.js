import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import Favoritar from './Favoritar';
import './musicCard.css';

class MusicCard extends React.Component {
  state = {
    redirect: false,
  };

  redirectToMusic = () => {
    // console.log(trackName);
    localStorage.setItem('musicIndex', JSON.stringify(this.props.num - 1));
    this.setState({ redirect: true });
  }

  render() {
    const { trackName, num, artistName
 } = this.props;
    const { redirect } = this.state;

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
        <Favoritar {... this.props}/>
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
