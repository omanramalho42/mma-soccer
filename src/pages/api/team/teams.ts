import { Team } from "@/models/team";
import { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'GET') {
    res.status(409).json({ error: 'Método inválido' })
  }

  console.log('teams api');

  const filter = {}
  const teams = await Team.find(filter)

  return res.send({
    success: true,
    data: teams
  });
}