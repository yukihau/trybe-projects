const URL = 'https://swapi-trybe.herokuapp.com/api/planets/';

export default function fetchPlanets() {
  return fetch(URL)
    .then((data) => data.json())
    .then((json) => json.results)
    .catch(console.log);
}
