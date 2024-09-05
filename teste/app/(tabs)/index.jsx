import React, { useEffect, useState } from 'react';
import MapView, {PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, View,Text  } from 'react-native';
import * as Location from 'expo-location';


export default function Home() {

  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [region, setRegion] = useState(null)

  useEffect (()=> {
    (async () =>{
      let {status} = await Location.requestForegroundPermissionsAsync()
      if(status !=='granted'){
        setErrorMsg('Permission to access location was denied');
        return
      }
      let {coords} = await Location.getCurrentPositionAsync({})
      setLocation(coords)
    })()
  }, [])
  let text = 'Waiting..'
  if(errorMsg) {
    text = errorMsg
  }else if(location){
    text = JSON.stringify(location)
  }


  return (
    <View style={styles.container}>
      <MapView
    
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : undefined
        }/>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
