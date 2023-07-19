import { Schema, model, models } from 'mongoose'

const PlayerSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "O email é requerido"],
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email invalido"]
  },
  fullName: {
    type: String,
    required: [true,'O nome completo é requerido'],
    minLength: [4, "O nome completo deve conter pelo menos 4 caracteres"],
    maxLength: [30, "O nome completo deve conter menos de 30 caracteres"],
  },
  password: {
    type:String,
    required: [true, "A senha é requerida"],
  },
  weight: {
    type: Number,
    required: [true, "O peso é requerido"],
  },
  name: {
    type: String,
    required: [true, "O apelido é requerido"],
  },
  description: {
    type: String,
    required: [true, "A descriçao é requerida"],
  },
  width: {
    type: Number,
    required: [true, "A altura é requerida"],
  },
  birthday: {
    type: String,
    required: [true, "A data de aniversário é requerida"],
  },
  address: {
    type: String,
    required: [true, "O endereço é requerido"],
  },
  phone: {
    type: String,
    required: [true, "O número de telefone para contato é requerido"],
  },
  positionPlayer: {
    type: String,
    required: [true, "A posição do jogador é requerida"],
  },
  goodFoot: {
    type: String,
    required: [true, "A perna de chute do jogador é requerida"],
  },
  avatar: {
    type: Object,
    required: [true, "A imagem de avatar é requerida"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export const Player = models.Player || model("Player", PlayerSchema);