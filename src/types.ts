/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type UserPermission = 'ADMIN' | 'USUÁRIO';

export interface User {
  id: string;
  nome: string;
  login: string;
  senha: string;
  permissao: UserPermission;
  status?: string;
}

export interface Imovel {
  id: string;
  endereco: string;
  contaAgua: string;
  contaEnergia: string;
  cci: string;
}

export interface Locatario {
  id: string;
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
}

export interface Locacao {
  id: string;
  imovelId: string;
  locatarioId: string;
  locador: string;
  valor: number;
  dataInicio: string;
  dataFim: string;
  diaVencimento: number;
}

export enum SituacaoAluguel {
  VENCIDO = 'Vencido',
  PAGO = 'Pago',
  NO_PRAZO = 'No Prazo',
}

export enum SituacaoIPTU {
  PAGO = 'Pago',
  NAO_PAGO = 'Não Pago',
}

export interface ControleAluguel {
  id: string;
  locacaoId: string;
  mesReferencia: string; // YYYY-MM
  dataPagamento?: string;
  situacao: SituacaoAluguel;
}

export interface ControleIPTU {
  id: string;
  imovelId: string;
  ano: number;
  situacao: SituacaoIPTU;
}
