import axios from "axios";
import { PokemonDetail as IPokemonDetail } from "../interfaces";

const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2",
});

export const getPokemonInfo = async (idParam: string) => {
  try {
    const { data } = await pokeApi.get<IPokemonDetail>(`/pokemon/${idParam}`);
    const { id, name, sprites } = data;

    return { id, name, sprites };
  } catch (error) {
    return null;
  }
};

export default pokeApi;
