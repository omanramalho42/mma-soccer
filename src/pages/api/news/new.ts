import { NextApiResponse, NextApiRequest } from 'next'
import { News } from '@/models/news';

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'GET') {
    res.status(402).json({
      message: 'Método inválido'
    });
  }

  const { newId } = req.query;

  if(!newId) {
    res.status(402).json({
      message: 'Parametro não encontrado!'
    });
  } else {
    const post = await News.findById(newId);

    if(post) {
      res.status(201).send(post);
    } else {
      res.status(402).json({
        message: 'Post não encontrado'
      });
    }
  }
  
}