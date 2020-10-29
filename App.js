import React, { useState, useEffect } from "react";
import { Alert, StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import Establishment from "./src/components/Establishment";
import EstablishmentService from "./src/services/establishment_services";
import NearstCoffees from "./src/components/NearstCoffees";

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Ative as permissões de uso do GPS para acessar a aplicação!"
        );
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    })();
    loadCoffeeShops();
  }, []);

  async function loadCoffeeShops() {
    try {
      const response = await EstablishmentService.index(latitude, longitude);
      setLocations(response.data.results);
    } catch (error) {
      setLocations([]);
    }
  }
  return (
    <View style={styles.container}>
      <NearstCoffees latitude={latitude} longitude={longitude}/>
      {(selected) && <Establishment place={selected}/>}
      <MapView
        style={styles.map}
        region={{
          latitude: latitude != 0 ? latitude : 0,
          longitude: longitude != 0 ? longitude : 0,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
      >
        <Marker
          title="Seu Local"
          icon={require("./src/images/my-location-pin-1.png")}
          coordinate={{
            latitude: latitude != 0 ? latitude : 0,
            longitude: longitude != 0 ? longitude : 0,
          }}
        ></Marker>
        {locations.map((item) => {
          return (
            <Marker
              key={item.place_id}
              coordinate={{
                latitude: item.geometry.location.lat,
                longitude: item.geometry.location.lng,
              }}
              title={item.name}
              icon={require("./src/images/coffee-big-pin.png")}
              onPress={()=>{setSelected(item)}}
            />
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0,
  },
  map: {
    height: "100%",
    width: "100%",
  },
});

export default App;
