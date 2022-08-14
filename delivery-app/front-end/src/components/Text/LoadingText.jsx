import React from 'react';
import { string } from 'prop-types';

function LoadingText(props) {
  const { text } = props;
  return (
    <p id="loading-text">
      { text }
    </p>
  );
}

LoadingText.propTypes = {
  text: string.isRequired,
};

export default LoadingText;
