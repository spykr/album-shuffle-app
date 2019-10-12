import axios, { CancelTokenSource } from "axios";

const API_CONFIG = () =>
  axios.create({
    baseURL: "https://ws.audioscrobbler.com/2.0/",
  });

export default {
  searchAlbums: (search: string, cancelToken: CancelTokenSource["token"]) =>
    API_CONFIG().get(
      "?method=album.search&api_key=6c85fd2ff909d79aa570b31ecc14fca3&format=json",
      {
        cancelToken,
        params: {
          album: search,
          limit: 10,
        },
      },
    ),
  searchAppleMusic: (search: string) =>
    API_CONFIG().get(
      `https://itunes.apple.com/search?media=music&entity=album&limit=1&term=${search}`,
    ),
};
