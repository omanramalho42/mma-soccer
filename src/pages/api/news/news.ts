import { News } from "@/models/news"
import db from "@/services/db";
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest,res: NextApiResponse) => {
  if(req.method !== 'GET') {
    res.status(402).send({ message: 'Método inválido' });
  }
  // await db.connect();
  const filter = {};
  const news = await News.find(filter);


  // await db.disconnect();
  return res.status(201).send({
    success: true,
    data: news
  });
}

export default handler;