import React from 'react';
import './musicCard.css';
import iconeFavoritosRed from '../imagens/iconeFavoritos.png';
import iconeFavoritosWhite from '../imagens/coracaoBranco.png';
import gifRemove from '../imagens/gifFavoritosRemove.gif';
import gifAdd from '../imagens/gifFavoritosAdd.gif';
import './favoritar.css';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favoritar extends React.Component {
  constructor() {
    super()

    this.state = {
      check: false,
      classe: 'favoritar',
      remove: false,
      favoriteSongs: [],
    }
    
    this.onChangeInput = this.onChangeInput.bind(this);
    this.updateCheckBox = this.updateCheckBox.bind(this);
    this.onAddOrRemoveSong = this.onAddOrRemoveSong.bind(this);
  }
  
  async componentDidMount() {
    let favoriteSongs = await getFavoriteSongs();
    // console.log(favoriteSongs);
    if (!favoriteSongs) {
      favoriteSongs = [];
    }
    this.setState({ favoriteSongs });
    localStorage.setItem('favorite_songs', JSON.stringify(favoriteSongs));
    this.updateCheckBox();
  }

  async onAddOrRemoveSong(object) {
    let { favoriteSongs } = this.state;
    const { trackName } = object;
    if (favoriteSongs.some((song) => song.trackName === trackName)) {
      await removeSong(object);
    } else {
      await addSong(object);
    }
    favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs })
  }
  updateCheckBox() {
    const { trackName } = this.props;
    const { favoriteSongs } = this.state;
    let test;
    if (favoriteSongs) {
      test = favoriteSongs.some((song) => song.trackName === trackName);
    }
    if (test) {
      this.setState({ check: true });
    } else { this.setState({ check: false }); }
  }

  onChangeInput() {
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
    this.setState({ check: !check }, async () => this.onAddOrRemoveSong(this.props));
  }

  render() {
    const { check, add, remove, classe } = this.state;

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

    const favoritar = (
            <img
              src={ icone }
              alt=""
              onClick={this.onChangeInput}
            />
          )

    return (
        <div className={ classe }>
          { favoritar }
        </div>
      )
  }
}

export default Favoritar;
