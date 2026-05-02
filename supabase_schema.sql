-- SCRIPT DE CRIAÇÃO DAS TABELAS NO SUPABASE

-- 1. Tabela de Usuários (Acesso ao Sistema)
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    login TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    status TEXT DEFAULT 'Ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. Tabela de Imóveis
CREATE TABLE imoveis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    endereco TEXT NOT NULL,
    conta_agua TEXT,
    conta_energia TEXT,
    cci TEXT UNIQUE NOT NULL,
    status TEXT DEFAULT 'Livre',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. Tabela de Locatários
CREATE TABLE locatarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome TEXT NOT NULL,
    cpf TEXT UNIQUE NOT NULL,
    telefone TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 4. Tabela de Locações (Contratos)
CREATE TABLE locacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    imovel_id UUID REFERENCES imoveis(id) ON DELETE CASCADE,
    locatario_id UUID REFERENCES locatarios(id) ON DELETE CASCADE,
    valor DECIMAL(10,2) NOT NULL,
    dia_vencimento INTEGER NOT NULL CHECK (dia_vencimento >= 1 AND dia_vencimento <= 31),
    data_inicio DATE NOT NULL,
    data_fim DATE NOT NULL,
    status TEXT DEFAULT 'Ativo',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 5. Tabela de Aluguéis (Controle Financeiro)
CREATE TABLE alugueis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    locacao_id UUID REFERENCES locacoes(id) ON DELETE CASCADE,
    mes_referencia TEXT NOT NULL, -- Formato YYYY-MM
    situacao TEXT DEFAULT 'NÃO PAGO',
    data_pagamento TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 6. Tabela de Controle IPTU
CREATE TABLE controle_iptu (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    imovel_id UUID REFERENCES imoveis(id) ON DELETE CASCADE,
    ano INTEGER NOT NULL,
    situacao TEXT DEFAULT 'PENDENTE',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    UNIQUE(imovel_id, ano)
);

-- Inserir usuário inicial padrão (login: admin / senha: admin)
INSERT INTO usuarios (nome, login, senha) 
VALUES ('Administrador', 'admin', 'admin');

-- Configurar RLS (Row Level Security) para todas as tabelas
-- Isso habilita o acesso para as operações de CRUD (Create, Read, Update, Delete)

-- Tabela: usuarios
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso total usuarios" ON usuarios;
CREATE POLICY "Acesso total usuarios" ON usuarios FOR ALL USING (true) WITH CHECK (true);

-- Tabela: imoveis
ALTER TABLE imoveis ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso total imoveis" ON imoveis;
CREATE POLICY "Acesso total imoveis" ON imoveis FOR ALL USING (true) WITH CHECK (true);

-- Tabela: locatarios
ALTER TABLE locatarios ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso total locatarios" ON locatarios;
CREATE POLICY "Acesso total locatarios" ON locatarios FOR ALL USING (true) WITH CHECK (true);

-- Tabela: locacoes
ALTER TABLE locacoes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso total locacoes" ON locacoes;
CREATE POLICY "Acesso total locacoes" ON locacoes FOR ALL USING (true) WITH CHECK (true);

-- Tabela: alugueis
ALTER TABLE alugueis ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso total alugueis" ON alugueis;
CREATE POLICY "Acesso total alugueis" ON alugueis FOR ALL USING (true) WITH CHECK (true);

-- Tabela: controle_iptu
ALTER TABLE controle_iptu ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Acesso total iptu" ON controle_iptu;
CREATE POLICY "Acesso total iptu" ON controle_iptu FOR ALL USING (true) WITH CHECK (true);
