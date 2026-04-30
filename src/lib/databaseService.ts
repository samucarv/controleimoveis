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
      permissao: 'ADMIN' // Por padrão no seu app anterior
    })) as User[];
  },

  async saveUser(user: Partial<User>) {
    const { data, error } = await supabase.from('usuarios').upsert({
      id: user.id || undefined,
      nome: user.nome,
      login: user.login,
      senha: user.senha,
      status: user.status
    }).select();
    if (error) throw error;
    return data[0];
  },

  // Imóveis
  async getImoveis() {
    const { data, error } = await supabase.from('imoveis').select('*');
    if (error) throw error;
    return data as Imovel[];
  },

  async saveImovel(imovel: Partial<Imovel>) {
    const { data, error } = await supabase.from('imoveis').upsert(imovel).select();
    if (error) throw error;
    return data[0];
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
    return data as Locacao[];
  },

  async saveLocacao(locacao: Partial<Locacao>) {
    const { data, error } = await supabase.from('locacoes').upsert(locacao).select();
    if (error) throw error;
    return data[0];
  },

  async deleteLocacao(id: string) {
    const { error } = await supabase.from('locacoes').delete().eq('id', id);
    if (error) throw error;
  },

  // Aluguéis
  async getAlugueis() {
    const { data, error } = await supabase.from('alugueis').select('*');
    if (error) throw error;
    return data as ControleAluguel[];
  },

  async saveAluguel(aluguel: Partial<ControleAluguel>) {
    const { data, error } = await supabase.from('alugueis').upsert(aluguel).select();
    if (error) throw error;
    return data[0];
  },

  async deleteAluguel(id: string) {
    const { error } = await supabase.from('alugueis').delete().eq('id', id);
    if (error) throw error;
  },

  // IPTU
  async getIPTU() {
    const { data, error } = await supabase.from('controle_iptu').select('*');
    if (error) throw error;
    return data as ControleIPTU[];
  },

  async saveIPTU(iptu: Partial<ControleIPTU>) {
    const { data, error } = await supabase.from('controle_iptu').upsert(iptu).select();
    if (error) throw error;
    return data[0];
  }
};
