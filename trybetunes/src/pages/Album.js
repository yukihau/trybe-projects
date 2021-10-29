import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import getMusics from '../services/musicsAPI';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      artist: '',
      album: '',
      tracks: [],
      favoriteTracks: [],
    };
    this.mountTracks = this.mountTracks.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.isFavorite = this.isFavorite.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { id } = match.params;

    getMusics(id)
      .then((data) => this.setState({
        artist: data[0].artistName,
        album: data[0].collectionName,
        image: data[0].artworkUrl100,
        tracks: data,
      }));

    getFavoriteSongs()
      .then((favorites) => {
        this.setState({
          loading: false,
          favoriteTracks: favorites,
        });
      });
  }

  isFavorite(trackId) {
    const { favoriteTracks } = this.state;
    const fetch = favoriteTracks.find((track) => track.trackId === trackId);
    if (fetch) return true;
    return false;
  }

  addToFavorites(track) {
    const { favoriteTracks } = this.state;
    const found = this.isFavorite(track.trackId);

    this.setState({ loading: true });
    if (!found) {
      addSong(track)
        .then(() => {
          this.setState({
            loading: false,
            favoriteTracks: [...favoriteTracks, track],
          });
        });
    } else {
      removeSong(track)
        .then(() => {
          const newFavoriteTracks = favoriteTracks
            .filter(({ trackId }) => trackId !== track.trackId);
          this.setState({
            loading: false,
            favoriteTracks: newFavoriteTracks,
          });
        });
    }
  }

  mountTracks() {
    const { artist, album, image, tracks } = this.state;
    const { addToFavorites, isFavorite } = this;

    return (
      <div>
        <div className="title-card">
          <img src={ image } alt={ album } />
          <h1 data-testid="artist-name">{ artist }</h1>
          <h2 data-testid="album-name">{ album }</h2>
        </div>

        <div className="song-cards">
          { tracks.map(({ trackId, trackName, previewUrl }) => {
            if (!previewUrl) return '';
            return (
              <MusicCard
                addToFavorites={ addToFavorites }
                isFavorite={ isFavorite }
                trackId={ trackId }
                trackName={ trackName }
                previewUrl={ previewUrl }
                key={ trackId }
              />
            );
          }) }
        </div>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    const { mountTracks } = this;
    console.log(this.props.match.params)

    return (
      <div data-testid="page-album">
        <Header />
        { loading ? <Loading /> : mountTracks() }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
