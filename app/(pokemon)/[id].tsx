import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Pokemon, getPokemonDetail } from '@/api/pokeapi';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<Pokemon>();
  const navigation = useNavigation();

  useEffect(() => {
    const load = async () => {
      const details = await getPokemonDetail(id!);
      setDetails(details);
      navigation.setOptions({
        title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
      });
    };
  }, [id]);
  return (
    <View style={{ padding: 10 }}>
      {details && (
        <>
          <View style={styles.card}>
            <Image
              source={{ uri: details.sprites.front_default }}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <View style={styles.card}></View>
        </>
      )}
      <Text>{details?.name}</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
  },
});
