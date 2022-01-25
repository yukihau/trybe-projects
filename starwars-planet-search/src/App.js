import React from 'react';
import Main from './pages/Main';
import MainProvider from './context/MainProvider';

function App() {
  return (
    <MainProvider>
      <Main />
    </MainProvider>
  );
}

export default App;
