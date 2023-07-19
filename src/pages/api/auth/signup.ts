// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { User } from '../../../models/user'

import db from '@/services/db'

import { hashSync } from 'bcryptjs'

interface IUser {
  _id: string;
  email: string;
  fullName: string;
  isAdmin: boolean;
  plan: string;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  await db.connect()

  if(req.method === "POST") {
    
    if(!req.body) return res.status(400).json({ error: "informaçoes faltando" })

    const { 
      fullName, 
      email, 
      password, 
      isAdmin, 
      plan,
      width,
      weight,
      age,
      name,
      birthday,
      goodFoot,
      position,
      address,
      contact,
      description,
      avatar 
    } = req.body

    console.log(req.body,'info register new user');

    const userExists = await User.findOne({ email });

    if(userExists) {
      
      await db.disconnect();
      return res.status(409).json({ error: 'Usuario já existe' });
    } else {
      if(password.length < 6) {
        return res.status(409).json({ 
          error: 'A senha deve ter no minimo 6 caracteres' 
        })
      }

      const hashedPassword = await hashSync(password)
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword,
        isAdmin,
        plan,
        width: Number(width),
        weight: Number(weight),
        age: Number(age),
        name,
        birthday,
        goodFoot,
        positionPlayer: position,
        address,
        phone: contact,
        description,
        avatar
      });
    
      const user = await newUser.save();
      await db.disconnect();
      
      return res.status(201).send({
        success: true,
        user
      });
    }
  } else {
    res.status(405).json({
      error: "Método não disponivel"
    });
  }
}

export default handler;
