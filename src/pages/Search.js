import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import Header from '../componentes/Header';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      userName: '',
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

  onSearchedArtist({ target }) {
    const { value } = target;
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
    const { searchedArtist } = this.state;
    this.setState({ searching: true });
    let results;
    try {
      results = await searchAlbumsAPI(searchedArtist);
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
      console.log(results);
    }
    /* this.setState({ results }); */
  }

  async test() {
    this.setState({ loading: true });
    const retorno = await getUser();
    const userName = retorno.name;
    this.setState({
      userName,
      loading: false,
    });
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
    const data = releaseDate;
    const price = collectionPrice;
    const artist = artistName;
    const capaUrl = artworkUrl100;
    const quantMusicas = trachCount;
    const nomeDaColecao = collectionName;
    return (
      <li key={ collectionId } className="album">
        <Link
          data-testid={ `link-to-album-${collectionId}` }
          to={ `album/${collectionId}` }
        >
          Ver músicas

        </Link>
        <img src={ capaUrl } alt="capa" />
        <div className="albumInfo">
          <h4>{artist}</h4>
          <p>{nomeDaColecao}</p>
          <p>{quantMusicas}</p>
          <p>{data}</p>
          <p>{price}</p>
        </div>
      </li>
    );
  }

  render() {
    const {
      loading,
      userName,
      searching,
      isSearched,
      results,
      searchedArtist,
      lastSearchedArtist,
      isSearchedArtistValid } = this.state;

    let frase;
    if (isSearched) {
      console.log(results, isSearched, lastSearchedArtist);
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
      <div data-testid="page-search">
        <Header userName={ userName } />
        {searching ? (
          <Loading />
        ) : (
          <>
            <form action="">
              <label
                htmlFor="buscar"
              >
                Digite o nome do artista

                <input
                  data-testid="search-artist-input"
                  type="text"
                  value={ searchedArtist }
                  onChange={ this.onSearchedArtist }
                />
              </label>
              <button
                onClick={ () => this.getArtistInfo() }
                data-testid="search-artist-button"
                disabled={ !isSearchedArtistValid }
              >
                Pesquisar

              </button>
            </form>
            <p>{frase}</p>
            <ol>
              {list}
            </ol>
          </>
        )}
      </div>
    );

    return (exibir);
  }
}
export default Search;
