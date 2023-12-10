import { User } from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next"

import db from "@/services/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'GET' ) {
    res.status(409).json({ error: 'Invalid method '});
  }
  // await db.connect();

  const filter = {}
  const players = await User.find(filter)
    .catch(error => 
      console.log(`Erro::${error.message}`)
    );
  console.log("players",players);
  // await db.disconnect();

  if(!players) {
    return res.status(402).send({
      success: false,
      data: {}
    })
  }

  return res.status(201).send({ 
    success: true,
    data: players
  });
}

export default handler;