import { Pokemon, getPokemon } from '@/api/pokeapi';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Page = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  useEffect(() => {
    const load = async () => {
      const result = await getPokemon();
      setPokemon(result);
    };
    load();
  }, []);
  return (
    <ScrollView>
      {pokemon.map((p) => (
        <Link href={`/(pokemon)/${p.id}`}>
          <Pressable>
            <View style={styles.item}>
              <Image source={{ uri: p.image }} style={styles.preview} />
              <Text style={styles.itemText}>{p.name}</Text>
              <Ionicons name='chevron-forward' size={24} />
            </View>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  preview: {
    width: 100,
    height: 100,
  },
  itemText: {
    fontSize: 18,
    textTransform: 'capitalize',
  },
});
