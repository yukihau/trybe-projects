import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import ShareButton from '../images/shareIcon.svg';

function ShareBtn({ link, pageTitle, index }) {
  const [displayShareMessage, setDisplayShareMessage] = useState(false);

  function handleShare() {
    const DOIS_SEGUNDOS = 2000;
    setDisplayShareMessage(true);
    copy(`http://localhost:3000${link}`);
    setTimeout(() => (setDisplayShareMessage(false)), DOIS_SEGUNDOS);
  }

  function setTestId(title, i) {
    if (title === 'Receitas Favoritas') {
      return `${i}-horizontal-share-btn`;
    }
    return 'share-btn';
  }
  return (
    <>
      { displayShareMessage ? <span>Link copiado!</span> : (
        <input
          data-testid={ setTestId(pageTitle, index) }
          type="image"
          alt="Botão de compartilhar"
          src={ ShareButton }
          onClick={ handleShare }
        />
      )}
      {}
    </>
  );
}
ShareBtn.defaultProps = {
  index: '',
  pageTitle: '',
};

ShareBtn.propTypes = {
  index: PropTypes.string,
  pageTitle: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default ShareBtn;
