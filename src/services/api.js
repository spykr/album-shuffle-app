import axios from "axios";

const API_CONFIG = ({ ...params } = {}) =>
  axios.create({
    baseURL: "https://ws.audioscrobbler.com/2.0/",
    headers: {
      Accept: "application/json",
      ContentType: "application/json",
    },
    params,
  });

export default {
  searchAlbums: (search, cancelToken) =>
    API_CONFIG({
      album: search,
      limit: 10,
    }).get(
      "?method=album.search&api_key=6c85fd2ff909d79aa570b31ecc14fca3&format=json",
      {
        cancelToken,
      },
    ),
  searchAppleMusic: search =>
    API_CONFIG().get(
      `https://itunes.apple.com/search?media=music&entity=album&limit=1&term=${search}`,
    ),
};
