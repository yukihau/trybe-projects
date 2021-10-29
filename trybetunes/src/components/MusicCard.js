import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  render() {
    const { trackId, trackName, previewUrl, addToFavorites, isFavorite } = this.props;

    return (
      <div className="card" key={ trackId }>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          <label htmlFor={ `checkbox-music-${trackId}` }>
            <input
              checked={ isFavorite(trackId) }
              onChange={ () => addToFavorites({ trackId, trackName, previewUrl }) }
              id={ `checkbox-music-${trackId}` }
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
            />
            Favorita
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackId: PropTypes.number.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  isFavorite: PropTypes.func.isRequired,
};

export default MusicCard;
