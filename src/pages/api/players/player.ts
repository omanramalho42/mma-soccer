import { User } from "@/models/user";
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'GET' ) {
    res.status(409).json({ error: 'Invalid method '});
  }

  const filter = {}
  console.log(req.query.playerId, 'query');

  const player = 
    await User.findById(
      req.query.playerId ?? ''
    );

  console.log(player,"player");

  if(!player) {
    return res.status(402).send({
      success: false,
      data: {}
    })
  }
  
  return res.status(201).send({ 
    success: true,
    data: player 
  });
}

export default handler;