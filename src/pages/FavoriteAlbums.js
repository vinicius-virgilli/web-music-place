import React from 'react';
import PropTypes from 'prop-types';
import Header from '../componentes/Header';
import Loading from './Loading';
import MusicCard from '../componentes/MusicCard';
import { getUser } from '../services/userAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class FavoriteAlbums extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
      albumInfo: [],
      favoriteSongs: [],
    };

    this.test = this.test.bind(this);
    this.madeMusicCard = this.madeMusicCard.bind(this);
    this.onAddOrRemoveSong = this.onAddOrRemoveSong.bind(this);
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.test();
    const albumInfo = await getMusics(id);
    const musics = albumInfo.slice(1);
    this.setState({
      albumInfo: albumInfo[0],
      musics,
    });
  }

  async onAddOrRemoveSong(object) {
    this.setState({ loading: true });
    let { favoriteSongs } = this.state;
    const { trackName } = object;
    if (favoriteSongs.some((song) => song.trackName === trackName)) {
      await removeSong(object);
    } else {
      await addSong(object);
    }
    favoriteSongs = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSongs,
    });
  }

  madeMusicCard(music) {
    const { collectionId } = music;
    const { favoriteSongs } = this.state;
    return (
      <li key={ collectionId }>
        <MusicCard
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
    const { loading, userName, albumInfo, musics } = this.state;
    const { artistName, collectionName, image } = albumInfo;
    let list;
    if (musics) {
      list = musics.map((music) => this.madeMusicCard(music));
    } else {
      list = '';
    }

    const exibir = (loading) ? (
      <Loading />
    ) : (
      <div data-testid="page-album">
        <Header userName={ userName } image={image} history={history}/>
        <h3 data-testid="artist-name">{artistName}</h3>
        <h3 data-testid="album-name">{collectionName}</h3>
        {list}
      </div>
    );
    return exibir;
  }
}

/* Album.propTypes = {
  match: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
}; */
export default FavoriteAlbums;
