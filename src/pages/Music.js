import React from 'react';
// import PropTypes from 'prop-types';
import Footer from '../componentes/Footer';
import getArtistImages from '../services/getArtistImages';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import discritics from 'diacritics';
import iconeVoltar from '../imagens/iconeVoltar.png';
import anterior from '../imagens/anterior.png';
import proximo from '../imagens/proximo.png';
import logoDarkTheme from '../imagens/logoDarkTheme.png';
import './music.css';
import Favoritar from '../componentes/Favoritar';
import getLyrics from '../services/lyricsAPI';

class Music extends React.Component {

  state = {
    musicInfo: {},
    artistImages: [],
    redirect: false,
    musics: [],
    indexMusic: 0,
    lyrics: '',
    lyricsContainer: '',
    indexImage: 0,
  }

  async componentDidMount() {
    const { match: { params: { origem } } } = this.props;
    // console.log(origem);
    let musics;
    if (origem === 'album') {
      musics = JSON.parse(localStorage.getItem('album'));
    }
    const indexMusic = JSON.parse(localStorage.getItem('musicIndex'));
    
    this.setState({
      musics,
      indexMusic,
    })
    let { artistName } = musics[0];
    let  { trackName } = musics[indexMusic]
    artistName = discritics.remove(artistName);
    artistName = artistName.replace(/&/g, 'e');
    trackName = trackName.replace(/&/g, 'e');
    let artistImages = await getArtistImages(artistName, trackName);
    if (!artistImages) {
      artistImages = [musics[0].artworkUrl100]
    }
    this.setState({ artistImages });
    // console.log(artistImages);
    const lyrics = await getLyrics(artistName, trackName);
    // console.log(lyrics);
    if (lyrics) {
      this.setState({ lyrics }, () => this.showLyrics())
    }
  }

  voltaParaAlbum = () => {
    this.setState({ redirect: true })
  }

  changeImage = ({target}) => {
    const { artistImages, indexImage } = this.state;
    const ultima = artistImages.length - 1;
    const { alt } = target;
    if (alt === 'próximo') {
      if (indexImage === ultima) {
        this.setState({ indexImage: 0 })
      } else { this.setState({indexImage: indexImage + 1 }) }
    } else {
      if (indexImage === 0) {
        this.setState({ indexImage: ultima })
      } else {
        this.setState({ indexImage: indexImage - 1 })
      }
    }
  }

  showLyrics = () => {
    let { lyrics, lyricsContainer } = this.state;
    if (!lyricsContainer) {
      lyricsContainer = (
        <div className='lyricsContainer'>
          <button
            onClick={ this.showTranslate }
            className='showTranslate'
            >
            Ver tradução
          </button>
          <section className='lyrics'>
            {lyrics}
          </section>
        </div>
      );
    } else { lyricsContainer = ''; }
    this.setState({ lyricsContainer });
  }
  render() {
    const idAlbum = JSON.parse(localStorage.getItem('idAlbum'));
    const { musics, indexMusic,  artistImages, indexImage, redirect, lyrics, lyricsContainer } = this.state;
    // console.log(artistImages);
    const imageList = artistImages.map((img, index) => (
      <li key={index} className='artistImage'>
        <img src={img} alt=''/>
        </li>
    ))

    // console.log(lyrics);
    const image = imageList[indexImage];
    const music = musics[indexMusic];
    // console.log(music);
    return (
      <div className='musicContainer'>
        {(redirect) && (
          <Redirect to={`/album/${idAlbum}`} />
        )}
        <div className='musicHeader'>
            <img
              src={iconeVoltar}
              alt='voltarSearch'
              className='voltarSearch'
              onClick={ this.voltaParaAlbum }
            />
            <img src={logoDarkTheme} alt="" className='logoDark'/>
        </div>
        
        <div className={(imageList.length > 1 ? (
          'artistImagesContainer'
        ) : (
          'artistImageContainer'
        ))}>
          {(imageList.length > 1) && <img
            src={anterior}
            alt="anterior"
            className='mudarImage'
            onClick={ this.changeImage}
          />}
          <div className='artistImage'>
            {image}
          </div>
          {(imageList.length > 1) && <img
            src={proximo}
            alt="próximo"
            className='mudarImage'
            onClick={ this.changeImage}
          />}
        </div>
        <div className='musicMidleContainer'>
          <div className='musicName'>
            {music && <h1>{music.trackName}</h1>}
            {music && <span>{music.artistName}</span>}
          </div>
          <Favoritar {...music} num={indexMusic + 1}/>
        </div>
        <Footer className='footer'/>
        <div className='player'>
          {music && (
            <audio src={music.previewUrl} /* autoPlay */ loop className='audio' controls>
            <track kind="captions"/>
              O seu navegador não suporta o elemento{" "} <code>audio</code>.
            </audio>
          )}
        </div>
        <section>
          {(lyrics) ? (
            <button
              onClick={ this.showLyrics}
              className='showLyrics'
            >Ver letra</button>
          ) : (<p>{'Letra não disponível'}</p>)}
        </section>
        { lyricsContainer }
      </div>
    );
  }
}

// Music.propTypes = {
//   match: PropTypes.string.isRequired,
//   id: PropTypes.string.isRequired,
// };
export default Music;
