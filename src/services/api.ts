import axios from "axios";

import { Album } from "../utils/typings";

export const register = (email: string) => {
  return axios.post("/api/register", {
    email: email,
  });
};

export const login = (email: string, token: string) => {
  return axios.post("/api/login", {
    email: email,
    token: token,
  });
};

export const getAlbums = () => {
  return axios.get("/api/albums").then((response) => {
    return response.data as Album[];
  });
};

export const saveAlbums = (albums: Album[]) => {
  return axios.post("/api/albums", {
    albums: JSON.stringify(albums),
  });
};
