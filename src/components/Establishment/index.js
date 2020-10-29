import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  Image,
  Text,
  Dimensions,
} from "react-native";
import EstablishmentServices from "../../services/establishment_services";
import ListRatings from "./ListRatings";

const Establishment = (props) => {
  const [establishment, setEstablishment] = useState(null);

  const Separator = () => <View style={styles.separator} />;
  useEffect(() => {
    getEstablishmentInformations();
  }, [props.place]);

  async function getEstablishmentInformations() {
    try {
      const response = await EstablishmentServices.show(props.place.place_id);
      setEstablishment(response.data.result);
    } catch (error) {
      setEstablishment(null);
    }
  }
  return (
    <View style={styles.container}>
      {establishment != null && (
        <View style={styles.background}>
          <ScrollView style={{ height: "90%" }}>
            <View style={{ marginHorizontal: 30 }}>
              <View style={{ alignSelf: "flex-end" }}>
                <Button
                  title="X"
                  color="black"
                  onPress={() => setEstablishment(null)}
                />
              </View>
              {establishment.photos ? (
                <Image
                  style={styles.photo}
                  source={{
                    uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${establishment.photos[0].photo_reference}&sensor=false&key=SUA_GOOGLE_API_KEY`,
                  }}
                  alt="Store Photo"
                />
              ) : (
                <Image
                  style={styles.photo}
                  source={require("../../images/no_photo.jpg")}
                />
              )}
              <Text style={styles.title}>{props.place.name}</Text>
              {establishment.opening_hours ? (
                <View>
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      marginTop: 10,
                    }}
                  >
                    {establishment.opening_hours.open_now === true
                      ? "Aberto"
                      : "Fechado"}
                  </Text>

                  <Separator />

                  {establishment.opening_hours.weekday_text.map((schedule) => {
                    return (
                      <Text key={schedule} style={{ color: "white" }}>
                        {schedule}
                      </Text>
                    );
                  })}
                </View>
              ) : (
                <View>
                  <Separator />

                  <Text style={{ color: "white" }}>
                    Não há cadastros de horário de funcionamento.
                  </Text>
                </View>
              )}

              <Separator />

              <Text style={{ color: "white" }}>
                {establishment.formatted_address}
              </Text>

              <Separator />
              <ListRatings place={props.place} />
            </View>
          </ScrollView>
          <View style={styles.rodape}>
            <Text style={{ color: "white", marginLeft: 10, fontSize: 11 }}>
              Café selecionado
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 40,
    zIndex: 1,
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  background: {
    backgroundColor: "#000000",
    paddingTop: 20,
    borderRadius: 20,
  },
  photo: {
    height: 200,
    width: 200,
  },
  title: {
    color: "#F56d50",
    fontSize: 17,
    marginTop: 10,
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  rodape: {
    flexDirection: "row",
    paddingLeft: 20,
    backgroundColor: "#393939",
    padding: 10,
    marginTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default Establishment;
