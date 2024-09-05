import { useState } from "react";
import { router, usePathname } from "expo-router";
import { View, TouchableOpacity, TextInput, Alert, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';

const SearchInput = ({ initialQuery }) => {
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || "");


  return (
    <View style={styles.container}>
        <TouchableOpacity
        onPress={() => {
          if (query === "")
            return Alert.alert(
              "Missing Query",
              "Please input something to search results across database"
            );

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
        style={styles.button}
      >
        <Ionicons name="search" color={"black"} size={24}/>
      </TouchableOpacity>
      <TextInput
        value={query}
        placeholder="Qual o seu destino?"
        placeholderTextColor="#949494"
        onChangeText={(e) => setQuery(e)}
        style={styles.input}
      />

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 16,
  },
  button: {
    padding: 10,
  },
});

export default SearchInput;
