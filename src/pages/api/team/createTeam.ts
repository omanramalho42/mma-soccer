import { NextApiRequest, NextApiResponse } from "next";
import { Team } from "@/models/team";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  //CASO O METODO DE REQUISICAO SEJA INCORRETO
  if(req.method !== 'POST') {
    res.status(409).json({
      error: 'Metodo invalido'
    })
  }

  //CASO AS INFORMAÇOES NAO TENHAM SIDO SUBMETIDAS CORRETAMENTE
  if(!req.body.team) {
    res.status(409).send({
      error: 'Parametro para criacao do time nao encontrado'
    })
  }

  //VALIDAÇOES DO BODY
  const team = req.body.team;

  //CRIANDO UMA NOVA INSTANCIA DE TIME VAZIA
  const newTeam = new Team();

  //SALVANDO O TIME COM AS INFORMAÇOES DO BODY
  const savedTeam = newTeam.save(team);

  //CASO O TIME SEJA SALVO COM SUCESSO
  if(savedTeam) {
    res.status(201).send({
      success: {
        message: 'Sucesso ao salvar o novo time'
      },
      data: savedTeam
    });
    //CASO OCORRA ALGUM ERRO DURANTE O PROCESSO DE SALVAR O TIME NO BANCO DE DADOS
  } else {
    res.status(409).json({
      error: 'Ocorreu um erro ao salvar o time'
    })
  }
}