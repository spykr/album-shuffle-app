import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";

import authMiddleware from "../../middleware/authMiddleware";
import { getAlbums, putAlbums } from "../../data";
import { Album } from "../../utils/typings";

type Response = Album[];

export default nextConnect()
  .use(authMiddleware())
  .get(async (req: NextApiRequest, res: NextApiResponse<Response>) => {
    // Fetch and return the albums
    const email = req.cookies.email;
    const albums = await getAlbums(email);

    return res.status(200).json(albums);
  })
  .post(async (req: NextApiRequest, res: NextApiResponse) => {
    // Get albums from body and save them
    const email = req.cookies.email;
    const albums = JSON.parse(req.body.albums || "[]");
    await putAlbums(email, albums);

    return res.status(200).end();
  });
