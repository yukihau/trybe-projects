import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import URL from '../helpers/gravatarHash';

// Global variables
const DO_BETTER = <p data-testid="feedback-text">Podia ser melhor...</p>;
const NAILED_IT = <p data-testid="feedback-text">Mandou bem!</p>;
const MIN_HITS = 3;

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = { playAgain: false, seeRanking: false };
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleSeeRanking = this.handleSeeRanking.bind(this);
  }

  componentDidMount() {
    this.handleRanking();
  }

  handlePlayAgain() {
    this.setState({ playAgain: true });
  }

  handleSeeRanking() {
    this.setState({ seeRanking: true });
  }

  handleRanking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const { player: { name, score, gravatarEmail } } = JSON.parse(localStorage
      .getItem('state'));
    const newRanking = [...ranking || [], { name, score, picture: URL(gravatarEmail) }];
    localStorage.setItem('ranking', JSON.stringify(newRanking));
  }

  render() {
    const state = JSON.parse(localStorage.getItem('state'));
    const { playAgain, seeRanking } = this.state;

    return (
      <div className="feedback-container">
        <Header
          name={ state.player.name }
          gravatar={ state.playergravatarEmail }
        />
        <p data-testid="header-score">{ state.player.score }</p>
        <div className="feedback-message">
          {
            state.player.assertions < MIN_HITS ? DO_BETTER : NAILED_IT
          }
          <p data-testid="feedback-total-score">{ state.player.score }</p>
          <p data-testid="feedback-total-question">{ state.player.assertions }</p>
        </div>
        <button
          type="button"
          onClick={ this.handlePlayAgain }
          data-testid="btn-play-again"
        >
          Jogar novamente
        </button>
        <button
          type="button"
          onClick={ this.handleSeeRanking }
          data-testid="btn-ranking"
        >
          Ver ranking
        </button>
        { playAgain && <Redirect to="/" /> }
        { seeRanking && <Redirect to="/ranking" /> }
      </div>
    );
  }
}

export default Feedback;
