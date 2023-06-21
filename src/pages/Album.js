import React from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import MusicCard from '../componentes/MusicCard';
import { getUser } from '../services/userAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';
import './album.css';
import Footer from '../componentes/Footer';
import iconeVoltar from '../imagens/iconeVoltar.png';
import iconePesquisar from '../imagens/iconePesquisar.svg';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import getLyrics from '../services/lyricsAPI';
import timeConverter from '../services/timeConverter';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
      albumInfo: {},
      information: '',
      musics: [],
      id: '',
    };

    this.test = this.test.bind(this);
    this.madeMusicCard = this.madeMusicCard.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.test();
    localStorage.setItem('idAlbum', JSON.stringify(id));
    const albumInfo = await getMusics(id);
    // console.log(information);
    const musics = albumInfo.slice(1);
    localStorage.setItem('album', JSON.stringify(musics));
    this.setState({
      albumInfo: albumInfo[0],
      musics,
      id,
    });
    let {artistName} = albumInfo[0]
    let { trackName } = albumInfo[1];
    const information = getLyrics(artistName, trackName);
    this.setState({ information })
  }



  madeMusicCard(music, num) {
    const { collectionId } = music;
    const { favoriteSongs, id } = this.state;
    return (
      <li key={ collectionId }>
        <MusicCard
          id={ id }
          num={ num }
          { ...music }
          onAddOrRemoveSong={ this.onAddOrRemoveSong }
          favoriteSongs={ favoriteSongs }
        />
      </li>
    );
  }

  async test() {
    this.setState({ loading: true });
    const retorno = await getUser();
    const userName = retorno.name;
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      userName,
      loading: false,
      favoriteSongs,
    });
  }

  render() {
    const { history } = this.props;
    const { loading, albumInfo, musics } = this.state;
    const { artistName, artworkUrl100, releaseDate
      } = albumInfo;
    let { collectionName } = albumInfo;

    const data = releaseDate !== undefined ? releaseDate.toString().substring(0, 4) : '';

    let list;
    if (musics) {
      list = <ul>{musics.map((music, index) => this.madeMusicCard(music, (index + 1)))}</ul>;
    } else {
      list = '';
    }

    let frase = '';

    if (musics) {
      const time = musics.length * 30;
      frase = timeConverter(time);
    }

    const subTitle = (list.length === 1) ? 'Single' : 'Album';

    if (subTitle === 'Single') {
      collectionName = collectionName ? collectionName.substring(0, (collectionName.length - 9)) : '';
    }

    const exibir = (loading) ? (
      <Loading history={ history }/>
    ) : (
      <div className='albumMainContainer'>
        <div className='albumHeader'>
          <Link to='/search'>
          <img src={iconeVoltar} alt='voltarSearch' className='voltarSearch'></img>
          </Link>

          <section className='albumInfo'>
            <div className='albumInfoTop'>
              <img src={ artworkUrl100 } alt=''/>
              <span>{artistName}</span>
            </div>
            <p>{`${subTitle} - ${data}`}</p>
          </section>

          <Link to='/search'>
          <img
          alt=''
          src={iconePesquisar}
          className='iconePesquisar'
            />
          </Link>
        </div>

        <img src={ artworkUrl100 }
          alt=''
          className='imageAlbum' />
        <h2 className='albumTilte'>{collectionName}</h2>

        <p className='frase'>{frase}</p>
        
        {list}
  
        <Footer />
      </div>
    );
    return exibir;
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
export default Album;
