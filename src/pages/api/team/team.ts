import { NextApiResponse, NextApiRequest } from "next";
import { Team } from "@/models/team";

export const handler = async (req:NextApiRequest, res:NextApiResponse) => {
  if(req.method !== 'GET') {
    res.status(409).json({
      error: "Metodo invalido"
    })
  }

  if(!req.query.teamId) {
    res.status(409).json({
      error: 'parametro id do time não fornecido'
    });
  }

  const { teamId } = req.query;
  
  const team = await Team.findById(teamId);

  if(team) {
    res.status(201).send({
      success: true,
      data: team
    });
  } else {
    res.status(409).json({
      success: false,
      error: 'Time não encontrado.'
    });
  }
}