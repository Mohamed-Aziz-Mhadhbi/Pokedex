import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";


interface Pokemon {
  name: string;
  image: string;
  image_back: string;
  types: PokemonType[];
}

interface PokemonType {
  type: {
    name: string,
    url: string,
  }
}

export default function Index() {

  const [pokemons, setPokemons] = useState<Pokemon[]>([])

  useEffect(() => {
    fetchPokemons();
  }, [])

  async function fetchPokemons() {
    try {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/?limit=20");
      const data = await response.json();

      // Fetch details info for each Pokemon in parallel
      const PokemonDetails = await Promise.all(data.results.map(async (pokemon: any) => {
        const res = await fetch(pokemon.url)
        const details = await res.json();
        return {
          name: pokemon.name,
          image: details.sprites.front_default,
          image_back: details.sprites.back_default,
          types: details.types,
        }
      }))
      setPokemons(PokemonDetails);
    }
    catch (e) {
      console.log(e);
    }

  }

  return (
    <ScrollView>
      {pokemons.map((pokemon) => (
        <View key={pokemon.name}>
          <Text>{pokemon.name}</Text>
          <View style={{flexDirection:"row"}}>
            <Image source={{ uri: pokemon.image }}
              style={{ width: 100, height: 100 }} />
            <Image source={{ uri: pokemon.image_back }}
              style={{ width: 100, height: 100 }} />
          </View>
          <Text>{pokemon.types[0].type.name
          }</Text>
        </View>
      ))}
    </ScrollView>
  );
}
