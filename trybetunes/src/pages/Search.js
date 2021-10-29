import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
      query: '',
      searchedArtist: '',
      loading: false,
      albums: false,
    };
    this.validateQuery = this.validateQuery.bind(this);
    this.fetchAlbums = this.fetchAlbums.bind(this);
    this.renderAlbums = this.renderAlbums.bind(this);
  }

  validateQuery({ target }) {
    const { value } = target;
    const minLength = 2;
    if (value.length >= minLength) {
      this.setState({ isButtonDisabled: false });
    } else {
      this.setState({ isButtonDisabled: true });
    }
    this.setState({ query: value });
  }

  fetchAlbums() {
    const { query } = this.state;
    this.setState({ loading: true });
    searchAlbumsAPI(query)
      .then((response) => this.setState({
        query: '',
        searchedArtist: query,
        loading: false,
        albums: response }));
  }

  renderAlbums() {
    const { albums, searchedArtist } = this.state;

    if (albums.length === 0) {
      return (<p>Nenhum álbum foi encontrado</p>);
    }

    return (
      <div>
        <p>
          Resultado de álbuns de:
          {' '}
          { searchedArtist }
        </p>
        { albums.map((album) => {
          const { artistName, collectionId, collectionName, artworkUrl100 } = album;

          return (
            <div className="card" key={ collectionId }>
              <div className="card-header">
                <Link
                  to={ `/album/${collectionId}` }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  <img src={ artworkUrl100 } alt={ collectionName } />
                </Link>
              </div>
              <div className="card-body">
                <h1>{ collectionName }</h1>
                <h2>{ artistName }</h2>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  render() {
    const { isButtonDisabled, query, loading, albums } = this.state;
    const { validateQuery, fetchAlbums, renderAlbums } = this;
    const form = (
      <div>
        <input
          onChange={ validateQuery }
          type="text"
          placeholder="Nome do Artista"
          value={ query }
          data-testid="search-artist-input"
        />

        <button
          onClick={ fetchAlbums }
          disabled={ isButtonDisabled }
          type="button"
          data-testid="search-artist-button"
        >
          Procurar
        </button>
      </div>
    );

    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <Loading /> : form }
        { albums && renderAlbums() }
      </div>
    );
  }
}

export default Search;
