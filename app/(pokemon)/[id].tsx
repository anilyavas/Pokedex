import { View, Text, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { Pokemon, getPokemonDetail } from '@/api/pokeapi';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const Page = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [details, setDetails] = useState<Pokemon>();
  const navigation = useNavigation();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      const details = await getPokemonDetail(id!);
      setDetails(details);
      navigation.setOptions({
        title: details.name.charAt(0).toUpperCase() + details.name.slice(1),
      });
    };
    load();
  }, [id]);
  return (
    <View style={{ padding: 10 }}>
      {details && (
        <>
          <View style={[styles.card, { alignItems: 'center' }]}>
            <Image
              source={{ uri: details.sprites.front_default }}
              style={{ width: 200, height: 200 }}
            />
            <Text style={styles.name}>
              #{details.id} {details?.name}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Stats:</Text>
            {details.stats.map((item: any) => (
              <Text
                style={{ fontSize: 16, fontWeight: '500' }}
                key={item.stat.name}
              >
                {item.stat.name}: {item.base_stat}
              </Text>
            ))}
          </View>
        </>
      )}
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    elevation: 1,
    gap: 4,
    // shadows
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
