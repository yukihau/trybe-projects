import React from 'react';
import PropTypes from 'prop-types';

class Textarea extends React.Component {
  render() {
    const { id, testid, name, onInputChange, placeholder, value } = this.props;
    return (
      <div className="container">
        <label htmlFor={ testid }>{ name }</label>
        <textarea
          id={ id }
          className="textarea"
          data-testid={ testid }
          onChange={ onInputChange }
          placeholder={ placeholder }
          value={ value }
        />
      </div>
    );
  }
}

Textarea.defaultProps = {
  name: '',
  placeholder: '',
};

Textarea.propTypes = {
  id: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  name: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default Textarea;
