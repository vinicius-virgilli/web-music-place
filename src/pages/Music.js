import React from 'react';
// import PropTypes from 'prop-types';
import Footer from '../componentes/Footer';
import getArtistImages from '../services/getArtistImages';
import { Link, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import discritics from 'diacritics';
import iconeVoltar from '../imagens/iconeVoltar.png';
import iconePesquisar from '../imagens/iconePesquisar.svg';
import './music.css';

class Music extends React.Component {

  state = {
    musicInfo: {},
    artistImages: [],
    redirect: false,
    index: 0,
  }

  async componentDidMount() {
    const { match: { params: { origem } } } = this.props;
    console.log(origem);
    let musics;
    if (origem === 'album') {
      musics = JSON.parse(localStorage.getItem('album'));
    }
    
    let { artistName } = musics[0];
    artistName = discritics.remove(artistName);
    artistName = artistName.replace(/&/g, 'e');
    console.log(artistName);
    const artistImages = await getArtistImages(artistName);
    this.setState({
      musics,
      artistImages,
    })
    console.log(artistImages);
  }

  voltaParaAlbum = () => {
    this.setState({ redirect: true })
  }
  render() {
    const idAlbum = JSON.parse(localStorage.getItem('idAlbum'));
    const { musicInfo, artistImages, index, redirect } = this.state;
    // console.log(trackName);
    const list = artistImages.map((img, index) => (
      <li key={index}>
        <img src={img} alt=''/>
        </li>
    ))

    const image = list[index];
    return (
      <div className='musicContainer'>
        {(redirect) && (
          <Redirect to={`/album/${idAlbum}`} />
        )}
        <div>
            <img
              src={iconeVoltar}
              alt='voltarSearch'
              className='voltarSearch'
              onClick={ this.voltaParaAlbum }
            />
        </div>
        
        <div className='artistImages'>
          {list}
        </div>
        <Footer className='footer'/>
      </div>
    );
  }
}

// Music.propTypes = {
//   match: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };
export default Music;
