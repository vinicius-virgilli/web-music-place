import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../componentes/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import discritics from 'diacritics';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './search.css';
import Footer from '../componentes/Footer';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
      image: '',
      searchedArtist: '',
      isSearchedArtistValid: false,
      searching: false,
      results: [],
      isSearched: false,
      lastSearchedArtist: '',
    };

    this.test = this.test.bind(this);
    this.onSearchedArtist = this.onSearchedArtist.bind(this);
    this.getArtistInfo = this.getArtistInfo.bind(this);
    this.createCard = this.createCard.bind(this);
  }

  componentDidMount() {
    this.test();
  }

  onSearchedArtist(value) {
    const valueSemEspaco = value.replace(/\s/g, '');
    if (valueSemEspaco.length >= 2) {
      this.setState({
        searchedArtist: value,
        isSearchedArtistValid: true,
      });
    } else {
      this.setState({
        isSearchedArtistValid: false,
        searchedArtist: value,
      });
    }
  }

  async getArtistInfo() {
    this.setState({ results: [] });
    this.setState({ isSearched: false });
    let { searchedArtist } = this.state;
    searchedArtist = discritics.remove(searchedArtist);
    this.setState({ searching: true });
    let results;
    try {
      results = await searchAlbumsAPI(searchedArtist);
      localStorage.setItem('lastSearchedArtist', searchedArtist);
    } catch {
      results = [];
    }
    if (results) {
      this.setState({
        results,
        isSearched: true,
        lastSearchedArtist: searchedArtist,
      });
      this.setState({
        searching: false,
        searchedArtist: '',
        isSearchedArtistValid: false,
      });
    }
  }

  async test() {
    this.setState({ loading: true });
    const retorno = await getUser();
    const userName = retorno.name;
    const image = retorno.image;
    const lastSearchedArtist = localStorage.getItem('lastSearchedArtist');
    if (lastSearchedArtist) {
      this.setState({searchedArtist: lastSearchedArtist}, () => {
        this.getArtistInfo();
      });
    }
    this.setState({
      userName,
      loading: false,
      image,
    });
  }

  saveAlbumId(nomeDaColecao) {
    const { results } = this.state;
    localStorage.setItem('results', JSON.stringify(results));
    localStorage.setItem('nomeDaColecao', nomeDaColecao);
  }

  createCard({
    collectionId,
    artistName,
    artworkUrl100,
    collectionPrice,
    releaseDate,
    trachCount,
    collectionName,
  }) {
    const lastSearchedArtist = localStorage.getItem('lastSearchedArtist');
    const price = collectionPrice;
    let artist = artistName;
    const capaUrl = artworkUrl100;
    const nomeDaColecao = collectionName;
    if (artist.length > 15) {
      artist = `${lastSearchedArtist} e outros`;
    }
    return (
      <li key={ collectionId } className='albumLi' >
        <Link
          to={ `/album/${collectionId}` }
          className="album"
        >
          <div className="albumContainer">
            <div className='albumImage'>
              <img src={ capaUrl } alt="capa" />
            </div>
            <div className='albumDetalhes'>
              <h4>{nomeDaColecao}</h4>
              <p>{artist}</p>
            </div>
            <p>{price}</p>
          </div>
          

        </Link>
        
      </li>
    );
  }

  render() {
    const {
      loading,
      userName,
      image,
      searching,
      isSearched,
      results,
      searchedArtist,
      lastSearchedArtist,
      isSearchedArtistValid } = this.state;

    const { history } = this.props;
    const { getArtistInfo, onSearchedArtist } = this;

    let frase;
    if (isSearched) {
      if (results.length === 0 && lastSearchedArtist !== '') {
        frase = 'Nenhum álbum foi encontrado';
      } else if (lastSearchedArtist) {
        frase = 'Resultado de álbuns de: ';
        frase += lastSearchedArtist;
      } else {
        frase = '';
      }
    }

    let list = [];
    if (results) {
      list = results.map((album) => this.createCard(album));
    }

    const exibir = (loading) ? (
      <Loading />
    ) : (
      <div className='searchPage'>
        <Header
        userName={ userName }
        image={image}
        getArtistInfo={getArtistInfo}
        searchedArtist={searchedArtist}
        onSearchedArtist={onSearchedArtist}
        isSearchedArtistValid={isSearchedArtistValid}
        history={history}
        />
        {searching ? (
          <Loading />
        ) : (
          <div className='searchContainer'>
            <p>{frase}</p>
            <ol className='albumOl'>
              {list}
            </ol>
            <Footer />
          </div>
        )}
      </div>
    );

    return (exibir);
  }
}
export default Search;
