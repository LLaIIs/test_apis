import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScrollPlaces from '../../components/ScrollPlaces';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Explore = () => {
  const [places, setPlaces] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('restaurant'); // Categoria inicial
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  const GOOGLE_PLACES_API_KEY = 'AIzaSyAnxfmuiu6gpPW-JDWLFooRxVX7c8Lc_LM';

  useEffect(() => {
    fetchPlaces();
  }, [selectedCategory]);

  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const response = await axios.post('https://places.googleapis.com/v1/places:searchNearby', {
        includedTypes: [selectedCategory], // Tipo de lugar selecionado
        locationRestriction: {
          circle: {
            center: {
              latitude: -23.55052, // Latitude
              longitude: -46.633308 // Longitude
            },
            radius: 5000.0 // Raio de busca em metros
          }
        }
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': GOOGLE_PLACES_API_KEY,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress'
        }
      });
      
      setPlaces(response.data.results); // Definir os dados de lugares recebidos
      setLoading(false);
    } catch (error) {
      console.error('Erro ao buscar lugares:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => {
    const photoUrl = item.photos && item.photos[0]
    ? `https://places.googleapis.com/v1/places/${item.place_id}/photos/${item.photos[0].photo_reference}/media?maxWidthPx=400&key=${GOOGLE_PLACES_API_KEY}`
    : 'https://via.placeholder.com/400';
    return (
      
      <Pressable
        style={styles.itemContainer}
        onPress={() => 
          router.push({
            pathname: '/details',
            params: {
              item: JSON.stringify(item)
            },
          })
        }
      >
        <View style={styles.imageContainer}>
          <Image
            source={{uri:photoUrl}}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description}>{item.vicinity}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollPlaces setSelectedCategory={setSelectedCategory} />
      
      {loading ? (
        <Text>Carregando lugares...</Text>
      ) : (
        <FlatList
          data={places}
          keyExtractor={(item) => item.place_id}
          renderItem={renderItem}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  itemContainer: {
    padding: 10,
    marginHorizontal: 20,
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#555',
  },
});

export default Explore;
