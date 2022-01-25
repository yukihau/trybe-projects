import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MainContext from './MainContext';
import fetchPlanets from '../helpers/fetchPlanets';
import testData from '../testData';

const INITIAL_SETTINGS = {
  filterByName: {
    name: '',
  },
  filterByNumericValues: [],
};

function MainProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filteredPlanets, setFilteredPlanets] = useState([]);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  function getPlanets() {
    fetchPlanets()
      .then(() => {
        setPlanets(testData.results);
      });
  }

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    const {
      filterByName,
      filterByNumericValues,
    } = settings;

    let filtered = planets;

    filterByNumericValues.forEach((array) => {
      const { column, comparison, value } = array;
      filtered = planets.filter((planet) => {
        switch (comparison) {
        case 'maior que':
          return Number(planet[column]) > value;
        case 'menor que':
          return Number(planet[column]) < value;
        case 'igual a':
          return Number(planet[column]) === value;
        default:
          return planet;
        }
      });
    });

    switch (true) {
    case (filterByName.name.length > 0):
      filtered = filtered.filter((planet) => (
        planet.name.toLowerCase().includes(filterByName.name)
      ));
      break;
    default:
      break;
    }

    setFilteredPlanets(filtered);
  }, [settings, planets]);

  function updateFilter({ target }, filter, state) {
    const { value } = target;
    switch (filter) {
    case 'name':
      setSettings({ ...settings, filterByName: { name: value } });
      break;
    case 'numeric_values':
      setSettings({
        ...settings,
        filterByNumericValues:
        [...settings.filterByNumericValues, state],
      });
      break;
    case 'remove_filter':
      setSettings({
        ...settings,
        filterByNumericValues:
        [...settings.filterByNumericValues.filter((numFilter) => (
          numFilter !== state
        ))],
      });
      break;
    default:
      break;
    }
  }

  const context = { filteredPlanets, updateFilter, settings };

  return (
    <MainContext.Provider value={ context }>
      { children }
    </MainContext.Provider>
  );
}

MainProvider.propTypes = {
  children: PropTypes.shape({}).isRequired,
};

export default MainProvider;
