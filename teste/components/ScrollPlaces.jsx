import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, FontAwesome6 } from '@expo/vector-icons';

const ScrollPlaces = ({ setSelectedCategory }) => {
  const [selectedId, setSelectedId] = useState('1');

  const categories = [
    { id: '1', title: 'Todos', type:'tourist_attraction', icon: { name: 'grid', library: 'Ionicons' } },
    { id: '2', title: 'Restaurante', type: 'restaurant', icon: { name: 'restaurant', library: 'MaterialIcons' } },
    { id: '3', title: 'Shopping', type: 'shopping_mall', icon: { name: 'bag-shopping', library: 'FontAwesome6' } },
    { id: '4', title: 'Parque', type: 'park', icon: { name: 'leaf', library: 'Ionicons' } },
    { id: '5', title: 'Teatro', type: 'theater', icon: { name: 'theater-masks', library: 'FontAwesome5' } },
    { id: '6', title: 'Museu', type: 'museum', icon: { name: 'building-columns', library: 'FontAwesome6' } },
    { id: '7', title: 'Praia', type: 'beach', icon: { name: 'umbrella-beach', library: 'FontAwesome5' } },
    { id: '8', title: 'Monumento', type: 'historical_landmark', icon: { name: 'monument', library: 'FontAwesome5' } }
  ];

  const renderIcon = (icon) => {
    switch (icon.library) {
      case 'Ionicons':
        return <Ionicons name={icon.name} size={30} />;
      case 'MaterialIcons':
        return <MaterialIcons name={icon.name} size={30} />;
      case 'FontAwesome5':
        return <FontAwesome5 name={icon.name} size={30} />;
      case 'FontAwesome6':
        return <FontAwesome6 name={icon.name} size={30} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.scrollContainer}
    >
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.itemContainer,
            selectedId === category.id && styles.selectedItem,
          ]}
          onPress={() => {
            setSelectedId(category.id);
            setSelectedCategory(category.type); // Atualizar a categoria selecionada
          }}
        >
          {renderIcon(category.icon)}
          <Text
            style={[
              styles.itemText,
              { color: selectedId === category.id ? '#0047ab' : 'black' }
            ]}
          >
            {category.title}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  selectedItem: {
    backgroundColor: 'rgba(14, 111, 221, 0.178)',
  },
  itemText: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default ScrollPlaces;
