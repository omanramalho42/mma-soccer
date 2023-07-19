import { Schema, model, models } from 'mongoose'

const TeamSchema = new Schema({
  ownerEmail: {
    type: String,
    unique: true,
    required: [true, "O email é requerido"],
    match: [/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Email invalido"]
  },
  teamName: {
    type: String,
    required: [true,'O nome completo é requerido'],
    minLength: [4, "O nome completo deve conter pelo menos 4 caracteres"],
    maxLength: [30, "O nome completo deve conter menos de 30 caracteres"],
  },
  plan: {
    type: String,
    // required: [true, "O plano de assinatura do jogador é requerido"],
    default: "normal"
  },
  description: {
    type: String,
    required: [true, "A descriçao é requerida"],
  },
  address: {
    type: String,
    required: [true, "O endereço é requerido"],
  },
  ownerPhone: {
    type: String,
    required: [true, "O número de telefone para contato é requerido"],
  },
  teamImage: {
    type: Object,
    required: [true, "A imagem do time é requerida"]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: null
  }
});

export const Team = models.Team || model("Team", TeamSchema);