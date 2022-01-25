import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchQuestionsThunk } from '../helpers/triviaApi';
import Header from '../components/Header';
import Question from '../components/Question';

let interval;

class Game extends React.Component {
  constructor() {
    super();

    this.state = {
      timer: 0,
      curr: 0, // index da questão que deve ser renderizada
      enableRender: false,
    };

    this.startTimer = this.startTimer.bind(this);
    this.getQuestions = this.getQuestions.bind(this);
    this.handleNextQuestion = this.handleNextQuestion.bind(this);
  }

  componentDidMount() {
    this.getQuestions();
  }

  // Faz o fetch e adiciona o retorno no estado
  async getQuestions() {
    const { resolveAPI } = this.props;
    const { payload } = await resolveAPI();
    const NUMBER_OF_QUESTIONS = 6;
    const questions = payload.slice(0, NUMBER_OF_QUESTIONS);
    console.log(questions);
    this.setState({
      questions,
      enableRender: true,
    }, () => {
      this.startTimer();
    });
  }

  startTimer() {
    console.log('timerzou');
    const second = 1000;
    this.setState({ timer: 30 },
      () => {
        interval = setInterval(() => {
          const { timer } = this.state;
          this.setState({ timer: timer - 1 });
          if (timer === 1) {
            clearInterval(interval);
            return true;
          }
        }, second);
      });
  }

  handleNextQuestion() {
    const MAX_QUESTIONS = 4;
    const { curr } = this.state;
    const { history } = this.props;
    clearInterval(interval);
    if (curr < MAX_QUESTIONS) {
      this.setState((previousState) => ({
        curr: previousState.curr + 1,
      }), () => this.startTimer());
    } else {
      history.push('/feedback');
    }
  }

  render() {
    const {
      timer,
      enableRender,
      questions,
      curr,
    } = this.state;

    const { score, goToNext } = this.props;

    return (
      <div className="game-container">
        <Header />
        <div className="game-info-container">
          <span className="timer">{ timer }</span>
          <span className="score" data-testid="header-score">
            Score:
            {' '}
            { score }
          </span>
        </div>
        { enableRender && (
          <Question
            question={ questions[curr] }
            timer={ timer }
            interval={ interval }
          />
        )}
        {
          goToNext && (
            <button
              type="button"
              data-testid="btn-next"
              onClick={ this.handleNextQuestion }
            >
              Próxima
            </button>
          )
        }
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  resolveAPI: () => dispatch(fetchQuestionsThunk()),
});

const mapStateToProps = ({ questions }) => ({
  score: questions.score,
  goToNext: questions.goToNext,
});

Game.propTypes = {
  resolveAPI: PropTypes.func.isRequired,
  score: PropTypes.number.isRequired,
  goToNext: PropTypes.bool.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
