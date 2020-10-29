import Api from "./api";

const storeService = {
  show: (google_place_id) => Api.get(`/stores/${google_place_id}`),
  index: (latitude, longitude) =>
    Api.get("/stores", {
      params: { latitude: latitude, longitude: longitude },
    }),
};

export default storeService;
