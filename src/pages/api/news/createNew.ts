import { NextApiRequest, NextApiResponse } from "next"
import { News } from "@/models/news"
import fs from 'fs'

const handler = async (req:NextApiRequest, res: NextApiResponse) => {
  if(req.method !== 'POST') {
    res.status(402).json({
      message: 'Método inválido'
    })
  }
  
  if(!req.body) {
    res.status(402).json({
      message: 'Ocorreu um erro ao enviar as informaçoes'
    });
  }

  const {
    title,
    subtitle,
    slug,
    description,
    content,
    author,
    playerRef,
    category,
    tags,
    featuredImage,
    carousel
  } = req.body.newPost;

  // //ARMAZENAR IMAGENS NO SISTEMA
  // Lê o arquivo da imagem e atribui os dados ao campo 'data' e o tipo de conteúdo ao campo 'contentType'
  const directory = '/uploads/images';

  // Verifica se o diretório já existe
  if (!fs.existsSync(directory)) {
    // Cria o diretório
    fs.mkdirSync(directory, { recursive: true });
  }
  
  const existSlug = await News.findOne({ slug: slug });
  if(existSlug) {
    res.status(201).send({
      message: 'Este slug já existe'
    });
  }

  const newPost = new News({
    title,
    subtitle,
    slug,
    description,
    author,
    category,
    content,
    featuredImage,
    playerRef,
    tags,
    carousel
  });

  // newPost.featuredImage.data = img;
  // newPost.featuredImage.contentType = 'image/jpeg';
  
  const post = await newPost.save();
  
  res.status(200).send({ 
    success: true, 
    post 
  });
}

export default handler;