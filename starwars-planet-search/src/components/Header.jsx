import React, { useContext } from 'react';
import MainContext from '../context/MainContext';
import FilterNavigation from './FilterNavigation';

function Header() {
  const { updateFilter } = useContext(MainContext);

  return (
    <header>
      <h1>Projeto Star Wars - Trybe</h1>
      <input
        onChange={ (event) => updateFilter(event, 'name') }
        placeholder="Filtrar por nome"
        data-testid="name-filter"
      />
      <FilterNavigation />
    </header>
  );
}

export default Header;
