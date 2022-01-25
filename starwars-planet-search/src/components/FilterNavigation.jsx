import React, { useState, useContext } from 'react';
import MainContext from '../context/MainContext';

const COLUMN_FILTERS = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

const COMPARSION_FILTERS = [
  'maior que',
  'menor que',
  'igual a',
];

const INITIAL_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
  removedColumns: [],
};

function FilterNavigation() {
  const [state, setState] = useState(INITIAL_STATE);
  const { settings: { filterByNumericValues }, updateFilter } = useContext(MainContext);

  function handleFilterOption({ target }, filter) {
    const value = (filter === 'value') ? Number(target.value) : target.value;
    setState({ ...state, [filter]: value });
  }

  function sendNewFilters(event) {
    updateFilter(event, 'numeric_values', state);
    setState({
      ...INITIAL_STATE,
      column: COLUMN_FILTERS
        .filter((column) => column !== state.column
        && !state.removedColumns.includes(column))[0],
      removedColumns: [...state.removedColumns, state.column],
    });
  }

  function mapFilter(filterNames) {
    return filterNames.filter((option) => (
      !state.removedColumns.includes(option)
    )).map((option) => (
      <option key={ option }>
        { option }
      </option>
    ));
  }

  function removeFilter(event) {
    const { target: { value } } = event;
    const thisFilter = filterByNumericValues[value];
    const { column } = thisFilter;
    const index = state.removedColumns.indexOf(column);
    state.removedColumns.splice(index, 1);
    updateFilter(event, 'remove_filter', thisFilter);
  }

  return (
    <div>
      <nav>
        <select
          value={ state.column }
          onChange={ (event) => handleFilterOption(event, 'column') }
          data-testid="column-filter"
        >
          { mapFilter(COLUMN_FILTERS) }
        </select>
        <select
          value={ state.comparison }
          onChange={ (event) => handleFilterOption(event, 'comparison') }
          data-testid="comparison-filter"
        >
          { mapFilter(COMPARSION_FILTERS) }
        </select>
        <input
          value={ state.value }
          onChange={ (event) => handleFilterOption(event, 'value') }
          type="number"
          data-testid="value-filter"
        />
        <button onClick={ sendNewFilters } type="button" data-testid="button-filter">
          Filtrar
        </button>
      </nav>
      <div data-testid="filter">
        { filterByNumericValues.length > 0
        && filterByNumericValues.map((filter, index) => (
          <div key={ filter.column }>
            <span>
              { `${filter.column} ${filter.comparison} ${filter.value}` }
            </span>
            <button
              type="button"
              value={ index }
              onClick={ removeFilter }
            >
              X
            </button>
          </div>
        )) }
      </div>
    </div>
  );
}

export default FilterNavigation;
