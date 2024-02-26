import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import { Pokemon, getPokemonDetails } from '@/api/pokeapi';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<Pokemon>();

  useEffect(() => {
    const load = async () => {
      const details = await getPokemonDetails(id!);
      setDetails(details);
    };
  }, [id]);
  return (
    <View style={styles.container}>
      <Text>{details?.name}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
