import { News } from "@/models/news"
import { NextApiRequest, NextApiResponse } from "next"

const handler = async (req: NextApiRequest,res: NextApiResponse) => {
  if(req.method !== 'GET') {
    res.status(402).send({ message: 'Método inválido' });
  }

  const filter = {};
  const news = await News.find(filter);

  return res.status(201).send({
    success: true,
    data: news
  });
}

export default handler;