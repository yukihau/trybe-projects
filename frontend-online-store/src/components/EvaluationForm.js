import React from 'react';
import PropTypes from 'prop-types';

class EvaluationForm extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 0,
      comment: '',
      evaluationList: [],
      error: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.sendEvaluation = this.sendEvaluation.bind(this);
    this.showError = this.showError.bind(this);
    this.validateLocalStorage = this.validateLocalStorage.bind(this);
    this.addToLocalStorage = this.addToLocalStorage.bind(this);
  }

  componentDidMount() { this.validateLocalStorage(); }

  handleChange({ target }) {
    this.setState({
      comment: target.value,
    });
  }

  handleClick({ target }) {
    const value = parseInt(target.value, 10);
    this.setState({
      rating: value,
    });
  }

  validateLocalStorage() {
    const { id } = this.props;
    const evaluationList = JSON.parse(localStorage.getItem(`evaluations-${id}`));
    if (evaluationList) {
      this.setState({ evaluationList });
    }
  }

  addToLocalStorage() {
    const { id } = this.props;
    const { evaluationList } = this.state;
    localStorage.setItem(`evaluations-${id}`, JSON.stringify(evaluationList));
  }

  sendEvaluation() {
    const { rating, comment } = this.state;
    const { addToLocalStorage, showError } = this;
    const maxCommentLength = 20;

    if (rating === 0) {
      showError('Selecione uma nota antes de enviar.');
      return 'done';
    }

    if (comment.length < maxCommentLength) {
      showError('Seu comentário precisa ter pelo menos 20 caractéres.');
      return 'done';
    }

    const evaluation = { rating, comment };
    this.setState((prevState) => ({
      error: '',
      evaluationList: [...prevState.evaluationList, evaluation],
    }), () => addToLocalStorage());
  }

  showError(error) {
    const errorLength = 5000;
    this.setState({ error });
    setTimeout(() => {
      this.setState({ error: '' });
    }, errorLength);
  }

  render() {
    const { comment, rating, evaluationList, error } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="evaluation">
            <input
              type="radio"
              value="1"
              name="evaluation"
              onClick={ this.handleClick }
            />
            <input
              type="radio"
              value="2"
              name="evaluation"
              onClick={ this.handleClick }
            />
            <input
              type="radio"
              value="3"
              name="evaluation"
              onClick={ this.handleClick }
            />
            <input
              type="radio"
              value="4"
              name="evaluation"
              onClick={ this.handleClick }
            />
            <input
              type="radio"
              value="5"
              name="evaluation"
              onClick={ this.handleClick }
            />
            <p>{ rating }</p>
          </label>
          <label htmlFor="comment">
            <textarea
              data-testid="product-detail-evaluation"
              name="comment"
              value={ comment }
              placeholder="Deixe seu comentário!"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            onClick={ this.sendEvaluation }
          >
            Enviar
          </button>
          <p>{ error }</p>
        </form>
        <div className="evaluations">
          { evaluationList.map((evaluator, index) => (
            <div key={ `evaluation-${index}` }>
              <h2>Anônimo</h2>
              { console.log(evaluator) }
              <p>
                Nota
                :
                { ' ' }
                { evaluator.rating }
              </p>
              <p>
                &#34;
                { evaluator.comment }
                &#34;
              </p>
            </div>
          )) }
        </div>
      </div>
    );
  }
}

EvaluationForm.propTypes = {
  id: PropTypes.string.isRequired,
};

export default EvaluationForm;
