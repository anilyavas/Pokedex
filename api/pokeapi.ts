export interface Pokemon {
  name: string;
  url: string;
  id: number;
  image: string;
  sprites?: any;
  ability?: any;
  stats?: any;
}

export const getPokemon = async (limit = 150): Promise<Pokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}`
  );
  const data = await response.json();
  return data.results.map((item: Pokemon, index: number) => ({
    ...item,
    id: index + 1,
    image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
      index + 1
    }.png`,
  }));
};

export const getPokemonDetail = async (id: string): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${id}`);
  const data = await response.json();
  return data;
};
