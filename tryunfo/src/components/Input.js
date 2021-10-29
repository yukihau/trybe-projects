import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  render() {
    const {
      id,
      testid,
      name,
      nameAfter,
      onInputChange,
      type, placeholder,
      value,
      checked,
    } = this.props;

    return (
      <div className="container">
        <label htmlFor={ testid }>{ name }</label>
        <input
          className={`input-${type}`}
          id={ id }
          data-testid={ testid }
          onChange={ onInputChange }
          type={ type }
          placeholder={ placeholder }
          value={ value }
          checked={ checked }
        />
        {nameAfter}
      </div>
    );
  }
}

Input.defaultProps = {
  name: '',
  nameAfter: '',
  placeholder: '',
  value: '',
  checked: false,
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  name: PropTypes.string,
  nameAfter: PropTypes.string,
  onInputChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
};

export default Input;
