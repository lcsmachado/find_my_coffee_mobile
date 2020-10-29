import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import storeService from "../../../services/store_service";
import StarRating from "react-native-star-rating";

const Separator = () => (
  <View style={styles.separator} />
);

const ListRatings = (props) => {
  const [store, setStore] = useState([]);

  useEffect(() => {
    getStores();
  }, [props.place]);

  async function getStores() {
    try {
      const response = await storeService.show(props.place.place_id);
      setStore(response.data);
    } catch (error) {
      setStore([]);
    }
  }
  return (
    <View>
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.opinions}>
          {store.ratings_count > 0 ? store.ratings_count : 0} Opiniões
        </Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={store.rating_average}
          fullStarColor="yellow"
          starSize={15}
        />
      </View>
      {store.ratings_count > 0 &&
        store.ratings.map((rating, index) => {
          return (
            <View key={index}>
              <Separator />
              <View style={{ flexDirection: "row" }}>
                <Text style={styles.user_name}>{rating.user_name}</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  rating={rating.value}
                  fullStarColor="yellow"
                  starSize={15}
                />
              </View>
              <Text style={styles.text}>{rating.opinion}</Text>

              <Text style={styles.text}>{rating.date}</Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: "white",
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginHorizontal: 30,
  },
  opinions: {
    color: "white",
    marginLeft: 10,
    fontSize: 17,
    fontWeight: "bold",
    marginRight: 20,
  },
  user_name: {
    color: "white",
    fontWeight: "bold",
    marginRight: 10,
  },
  text: {
    color: "white",
    marginHorizontal: 10,
    fontSize: 14,
  },
});

export default ListRatings;
