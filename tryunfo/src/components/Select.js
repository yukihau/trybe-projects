import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  render() {
    const { id, onInputChange, value } = this.props;

    return (
      <div className="container">
        <label htmlFor="cardRare">
          Raridade
          <select
            id={ id }
            className="select"
            data-testid="rare-input"
            onChange={ onInputChange }
            value={ value }
          >
            <option>normal</option>
            <option>raro</option>
            <option>muito raro</option>
          </select>
        </label>
      </div>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  onInputChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default Select;
