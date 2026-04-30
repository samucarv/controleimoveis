import { User, Imovel, Locatario, Locacao, UserPermission } from './types.ts';

export const INITIAL_USERS: User[] = [
  {
    id: 'admin-1',
    nome: 'Administrador',
    login: 'admin',
    senha: 'admin',
    permissao: 'ADMIN',
  },
  {
    id: 'user-1',
    nome: 'Usuário Padrão',
    login: 'user',
    senha: 'user',
    permissao: 'USUÁRIO',
  },
];

export const STORAGE_KEYS = {
  USERS: 'sgi_users',
  IMOVEIS: 'sgi_imoveis',
  LOCATARIOS: 'sgi_locatarios',
  LOCACOES: 'sgi_locacoes',
  ALUGUEIS: 'sgi_alugueis',
  IPTU: 'sgi_iptu',
  AUTH_USER: 'sgi_auth_user',
};
