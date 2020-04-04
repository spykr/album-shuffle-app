import axios, { CancelTokenSource } from "axios";

import { Album } from "../utils/typings";

const API_CONFIG = () => {
  return axios.create({
    baseURL: "https://ws.audioscrobbler.com/2.0/",
  });
};

type ApiAlbum = {
  artist: string;
  image: { "#text": string; size: string }[];
  mbid: string;
  name: string;
  streamable: string;
  url: string;
};

export const searchAlbums = (
  search: string,
  cancelToken: CancelTokenSource["token"],
): Promise<Album[]> => {
  return API_CONFIG()
    .get(
      "?method=album.search&api_key=6c85fd2ff909d79aa570b31ecc14fca3&format=json",
      {
        cancelToken,
        params: {
          album: search,
          limit: 10,
        },
      },
    )
    .then((response) => {
      const results = response.data.results.albummatches.album as ApiAlbum[];
      return results.map((result) => {
        const image = result.image.find((i) => i.size === "extralarge");
        const thumbnail = result.image.find((i) => i.size === "small");
        return {
          title: result.name,
          artist: result.artist,
          imageUrl: image?.["#text"] ?? "",
          thumbnailUrl: thumbnail?.["#text"] ?? "",
          url: result.url,
        };
      });
    });
};

export const searchAppleMusic = (search: string) => {
  return API_CONFIG().get(
    `https://itunes.apple.com/search?media=music&entity=album&limit=1&term=${search}`,
  );
};
