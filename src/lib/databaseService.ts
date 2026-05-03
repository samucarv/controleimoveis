import { supabase } from './supabase';
import { 
  Imovel, Locatario, Locacao, ControleAluguel, ControleIPTU, User 
} from '../types';

export const dbService = {
  // Usuários
  async getUsers() {
    const { data, error } = await supabase.from('usuarios').select('*');
    if (error) throw error;
    return data.map(u => ({
      id: u.id,
      nome: u.nome,
      login: u.login,
      senha: u.senha,
      status: u.status,
      permissao: u.permissao || 'USUÁRIO'
    })) as User[];
  },

  async saveUser(user: Partial<User>) {
    const { data, error } = await supabase.from('usuarios').upsert({
      id: user.id || undefined,
      nome: user.nome,
      login: user.login,
      senha: user.senha,
      status: user.status,
      permissao: user.permissao
    }).select();
    if (error) throw error;
    return data[0];
  },

  // Imóveis
  async getImoveis() {
    const { data, error } = await supabase.from('imoveis').select('*');
    if (error) throw error;
    return data.map(i => ({
      id: i.id,
      endereco: i.endereco,
      contaAgua: i.conta_agua,
      contaEnergia: i.conta_energia,
      cci: i.cci
    })) as Imovel[];
  },

  async saveImovel(imovel: Partial<Imovel>) {
    const payload = {
      id: imovel.id || undefined,
      endereco: imovel.endereco,
      conta_agua: imovel.contaAgua,
      conta_energia: imovel.contaEnergia,
      cci: imovel.cci
    };
    const { data, error } = await supabase.from('imoveis').upsert(payload).select();
    if (error) throw error;
    
    const saved = data[0];
    return {
      id: saved.id,
      endereco: saved.endereco,
      contaAgua: saved.conta_agua,
      contaEnergia: saved.conta_energia,
      cci: saved.cci
    } as Imovel;
  },

  async deleteImovel(id: string) {
    const { error } = await supabase.from('imoveis').delete().eq('id', id);
    if (error) throw error;
  },

  // Locatários
  async getLocatarios() {
    const { data, error } = await supabase.from('locatarios').select('*');
    if (error) throw error;
    return data as Locatario[];
  },

  async saveLocatario(locatario: Partial<Locatario>) {
    const { data, error } = await supabase.from('locatarios').upsert(locatario).select();
    if (error) throw error;
    return data[0];
  },

  async deleteLocatario(id: string) {
    const { error } = await supabase.from('locatarios').delete().eq('id', id);
    if (error) throw error;
  },

  // Locações
  async getLocacoes() {
    const { data, error } = await supabase.from('locacoes').select('*');
    if (error) throw error;
    return data.map(l => ({
      id: l.id,
      imovelId: l.imovel_id,
      locatarioId: l.locatario_id,
      locador: l.locador || '', 
      valor: l.valor,
      dataInicio: l.data_inicio,
      dataFim: l.data_fim,
      diaVencimento: l.dia_vencimento
    })) as Locacao[];
  },

  async saveLocacao(locacao: Partial<Locacao>) {
    const payload = {
      id: locacao.id || undefined,
      imovel_id: locacao.imovelId,
      locatario_id: locacao.locatarioId,
      valor: locacao.valor,
      dia_vencimento: locacao.diaVencimento,
      data_inicio: locacao.dataInicio,
      data_fim: locacao.dataFim,
      status: 'Ativo'
    };
    const { data, error } = await supabase.from('locacoes').upsert(payload).select();
    if (error) throw error;
    
    const saved = data[0];
    return {
      id: saved.id,
      imovelId: saved.imovel_id,
      locatarioId: saved.locatario_id,
      valor: saved.valor,
      diaVencimento: saved.dia_vencimento,
      dataInicio: saved.data_inicio,
      dataFim: saved.data_fim
    } as Locacao;
  },

  async deleteLocacao(id: string) {
    const { error } = await supabase.from('locacoes').delete().eq('id', id);
    if (error) throw error;
  },

  // Aluguéis
  async getAlugueis() {
    const { data, error } = await supabase.from('alugueis').select('*');
    if (error) throw error;
    return data.map(a => ({
      id: a.id,
      locacaoId: a.locacao_id,
      mesReferencia: a.mes_referencia,
      situacao: a.situacao,
      dataPagamento: a.data_pagamento
    })) as ControleAluguel[];
  },

  async saveAluguel(aluguel: Partial<ControleAluguel>) {
    const payload = {
      id: aluguel.id || undefined,
      locacao_id: aluguel.locacaoId,
      mes_referencia: aluguel.mesReferencia,
      situacao: aluguel.situacao,
      data_pagamento: aluguel.dataPagamento
    };
    const { data, error } = await supabase.from('alugueis').upsert(payload).select();
    if (error) throw error;
    
    const saved = data[0];
    return {
      id: saved.id,
      locacaoId: saved.locacao_id,
      mesReferencia: saved.mes_referencia,
      situacao: saved.situacao,
      dataPagamento: saved.data_pagamento
    } as ControleAluguel;
  },

  async deleteAluguel(id: string) {
    const { error } = await supabase.from('alugueis').delete().eq('id', id);
    if (error) throw error;
  },

  // IPTU
  async getIPTU() {
    const { data, error } = await supabase.from('controle_iptu').select('*');
    if (error) throw error;
    return data.map(i => ({
      id: i.id,
      imovelId: i.imovel_id,
      ano: i.ano,
      situacao: i.situacao
    })) as ControleIPTU[];
  },

  async saveIPTU(iptu: Partial<ControleIPTU>) {
    const payload = {
      id: iptu.id || undefined,
      imovel_id: iptu.imovelId,
      ano: iptu.ano,
      situacao: iptu.situacao
    };
    const { data, error } = await supabase.from('controle_iptu').upsert(payload).select();
    if (error) throw error;
    
    const saved = data[0];
    return {
      id: saved.id,
      imovelId: saved.imovel_id,
      ano: saved.ano,
      situacao: saved.situacao
    } as ControleIPTU;
  }
};
