export function fetchResult(query) {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${query}`).then(response => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error(`No results with query "${query}"`));
  });
}
