import React, { useContext } from 'react';
import MainContext from '../context/MainContext';

const TABLE_TITLES = [
  'Name',
  'Rotation Period',
  'Orbital Period',
  'Diameter',
  'Climate',
  'Gravity',
  'Terrain',
  'Surface Water',
  'Population',
  'Films',
  'Created',
  'Edited',
  'URL',
];

function formRows(planets = []) {
  return (
    <tbody>
      { planets.map((planet) => (
        <tr key={ planet.name }>
          { Object.values(planet).map((data) => (
            <td key={ `${planet.name}-${data}` }>
              { data }
            </td>
          )) }
        </tr>
      )) }
    </tbody>
  );
}

function Table() {
  const { filteredPlanets } = useContext(MainContext);
  return (
    <table>
      <thead>
        <tr>
          {TABLE_TITLES.map((title) => (
            <th key={ title }>
              { title }
            </th>
          ))}
        </tr>
      </thead>
      { formRows(filteredPlanets) }
    </table>
  );
}

export default Table;
