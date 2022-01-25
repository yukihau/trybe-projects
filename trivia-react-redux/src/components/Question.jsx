import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { nextQuestion } from '../redux/actions';

class Question extends React.Component {
  constructor() {
    super();

    this.state = {
      answers: [],
      correct: '',
      score: 0,
      isDisabled: false,
      difficulty: 0,
      assertions: 0,
    };
    this.disableButtons = this.disableButtons.bind(this);
    this.getAnswers = this.getAnswers.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);
    this.parseDifficulty = this.parseDifficulty.bind(this);
    this.sendToLocalStorage = this.sendToLocalStorage.bind(this);
    this.shuffle = this.shuffle.bind(this);
    this.changeColors = this.changeColors.bind(this);
  }

  componentDidMount() {
    this.getAnswers();
  }

  componentDidUpdate(prevProps) {
    const { question, goToNext } = this.props;
    const { score } = this.state;
    if (prevProps.question.question !== question.question) {
      this.resetState();
      this.getAnswers();
      goToNext({ goToNext: false, score });
    }
    this.disableButtons();
  }

  getAnswers() {
    const { question } = this.props;
    console.log('chamou');
    const shufledAnswers = this.shuffle([
      ...question.incorrect_answers,
      question.correct_answer,
    ]);
    this.setState({
      answers: shufledAnswers,
      correct: question.correct_answer,
      difficulty: this.parseDifficulty(question.difficulty),
    });
  }

  parseDifficulty(string) {
    const levels = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    return levels[string];
  }

  // Feito com base neste artigo: https://www.horadecodar.com.br/2021/05/10/como-embaralhar-um-array-em-javascript-shuffle/
  // Função para embaralhar os items do array
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1)); // Retorna um número aleatório entre 0 e i + 1
      // Reposiciona o elemento: troca a ordem  array[i] vira array[randomIndex] e vice e versa
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handleAnswer({ target }) {
    const { question, goToNext, timer, interval } = this.props;
    const { score, difficulty } = this.state;
    const { value } = target;
    if (value === question.correct_answer) {
      const baseScore = 10;
      const newScore = score + (baseScore + (timer * difficulty));
      this.setState((previousState) => ({
        assertions: previousState.assertions + 1,
        score: newScore,
        isDisabled: true,
      }), () => {
        this.sendToLocalStorage();
        goToNext({ goToNext: true, score: newScore });
      });
    } else {
      this.setState({ isDisabled: true }, () => {
        goToNext({ goToNext: true, score });
      });
    }
    this.changeColors();
    clearInterval(interval);
  }

  disableButtons() {
    const { timer } = this.props;
    const { isDisabled } = this.state;
    if (timer === 1 && isDisabled === false) {
      this.setState({
        isDisabled: true,
      });
    }
  }

  sendToLocalStorage() {
    const { score, assertions } = this.state;
    const state = JSON.parse(localStorage.getItem('state'));
    state.player.score = score;
    state.player.assertions = assertions;
    localStorage.setItem('state', JSON.stringify(state));
  }

  resetState() {
    this.setState({
      isDisabled: false,
    });
  }

  changeColors() {
    const answerCorrect = document.querySelector('.correct');
    const answerIncorrect = document.querySelectorAll('.incorrect');

    answerIncorrect.forEach((element) => {
      element.style.border = '3px solid rgb(255, 0, 0)';
    });
    if (document.querySelector('.correct')) {
      answerCorrect.style.border = '3px solid rgb(6, 240, 15)';
    }
  }

  render() {
    const { question } = this.props;
    const { answers, correct, isDisabled } = this.state;
    return (
      <div className="question-main">
        <div className="question-container">
          <p data-testid="question-category">{question.category}</p>
          <p data-testid="question-text">{question.question}</p>
        </div>
        <div className="answers-container">
          {
            answers.map((answer, index) => {
              if (answer === correct) {
                return (
                  <button
                    className="correct"
                    key={ `${answer}-${index}` }
                    data-testid="correct-answer"
                    type="button"
                    value={ answer }
                    onClick={ this.handleAnswer }
                    disabled={ isDisabled }
                  >
                    {answer}
                  </button>
                );
              }
              return (
                <button
                  className="incorrect"
                  key={ `${answer}-${index}` }
                  type="button"
                  data-testid={ `wrong-answer-${index}` }
                  value={ answer }
                  onClick={ this.handleAnswer }
                  disabled={ isDisabled }
                >
                  {answer}
                </button>
              );
            })
          }
        </div>
      </div>
    );
  }
}

Question.propTypes = {
  question: PropTypes.objectOf(PropTypes.string).isRequired,
  goToNext: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  interval: PropTypes.number.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  goToNext: (validateNext) => dispatch(nextQuestion(validateNext)),
});

export default connect(null, mapDispatchToProps)(Question);
