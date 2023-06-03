import React from 'react';
import Header from '../componentes/Header';
import Loading from './Loading';
import MusicCard from '../componentes/MusicCard';
import { getUser } from '../services/userAPI';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class FavoriteSongs extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
      image: '',
      favoriteSongs: [],
    };

    this.test = this.test.bind(this);
    this.onAddOrRemoveSong = this.onAddOrRemoveSong.bind(this);
  }

  async componentDidMount() {
    this.test();
  }

  async onAddOrRemoveSong(object) {
    this.setState({ loading: true });
    await removeSong(object);
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs,
      loading: false,
    });
  }

  async test() {
    this.setState({ loading: true });
    const retorno = await getUser();
    const favoriteSongs = await getFavoriteSongs();
    const {userName, image } = retorno;
    this.setState({
      userName,
      image,
      loading: false,
      favoriteSongs,
    });
  }

  madeMusicCard(song) {
    const { trackName } = song;
    const { favoriteSongs } = this.state;
    return (
      <li key={ trackName }>
        <MusicCard
          { ...song }
          onAddOrRemoveSong={ this.onAddOrRemoveSong }
          favoriteSongs={ favoriteSongs }
        />
      </li>
    );
  }

  render() {
    const { history } = this.props;
    const { loading, userName, favoriteSongs, image } = this.state;
    console.log(favoriteSongs);
    let list = [];
    if (favoriteSongs) {
      list = favoriteSongs.map((song) => this.madeMusicCard(song));
    }
    const exibir = (loading) ? (
      <Loading />
    ) : (
      <div data-testid="page-favorites">
        <Header userName={ userName } image={image} history={history}/>
        {list}
      </div>
    );
    return exibir;
  }
}

export default FavoriteSongs;
