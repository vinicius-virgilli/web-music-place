import React from 'react';
import PropTypes from 'prop-types';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      check: false,
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.updateCheckBox = this.updateCheckBox.bind(this);
  }

  componentDidMount() {
    this.updateCheckBox();
  }

  onChangeInput() {
    const { onAddOrRemoveSong } = this.props;
    const { check } = this.state;
    this.setState({ check: !check }, async () => onAddOrRemoveSong(this.props));
  }

  updateCheckBox() {
    const { trackName, favoriteSongs } = this.props;
    let test;
    if (favoriteSongs) {
      test = favoriteSongs.some((song) => song.trackName === trackName);
    }
    if (test) {
      this.setState({ check: true });
    } else { this.setState({ check: false }); }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { check } = this.state;
    return (
      <div className="musicCard">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <label htmlFor="musicFavorite">Favorita</label>
        <input
          id="musicFavorite"
          data-testid={ `checkbox-music-${trackId}` }
          type="checkbox"
          checked={ check }
          onChange={ this.onChangeInput }
        />
      </div>
    );
  }
}

MusicCard.propTypes = {
  favoriteSongs: PropTypes.arrayOf.isRequired,
  onAddOrRemoveSong: PropTypes.func.isRequired,
  trackId: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
};

export default MusicCard;
