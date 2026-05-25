# 🐱 OnGato - Front-end

Bem-vindo ao repositório front-end do **OnGato**, um sistema web moderno e responsivo desenvolvido para uma ONG de proteção, cuidado e adoção de gatos. O projeto conta com um website público para engajamento da comunidade e um Painel Administrativo completo para a gestão interna dos recursos da ONG.

---

## 🚀 Tecnologias Utilizadas

Este projeto foi construído utilizando as melhores e mais modernas tecnologias do ecossistema React/Next.js:

- **[Next.js 16 (App Router)](https://nextjs.org/)**: Framework React para produção, utilizando roteamento baseado em arquivos com excelente performance e SEO.
- **[React 19](https://react.dev/)**: Biblioteca para construção de interfaces dinâmicas e reativas.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework CSS utilitário de última geração para estilização moderna, rápida e responsiva.
- **[TypeScript](https://www.typescriptlang.org/)**: Tipagem estática para maior segurança e produtividade no desenvolvimento.
- **[Lucide React](https://lucide.dev/)**: Conjunto de ícones vetoriais modernos e consistentes.

---

## 📋 Funcionalidades do Projeto

### 🌐 Área Pública (Landing Page)
- **Apresentação da ONG**: Seções com a missão e valores do projeto.
- **Banners Rotativos (Carrossel)**: Exibição dinâmica de banners para campanhas e comunicados importantes.
- **Catálogo de Adoção**: Visualização dos gatinhos disponíveis na ONG.
- **Eventos**: Divulgação de feiras de adoção, campanhas de arrecadação e eventos beneficentes.

### 🔐 Autenticação (Login)
- **Login Administrativo**: Acesso seguro para voluntários e administradores da ONG.
- **Segurança com Middleware**: Proteção de rotas no lado do servidor (Next.js Middleware) para impedir acessos não autorizados à área administrativa.

### ⚙️ Painel Administrativo (Admin)
Painel com controle total de CRUD (Criar, Ler, Atualizar e Deletar) para as seguintes entidades:
1. **🐱 Animais**: Cadastro completo dos gatos com nome, idade, descrição, status de adoção, sexo, temperamento e imagem (com preview e upload).
2. **📢 Banners**: Controle dos banners exibidos na página inicial da plataforma.
3. **📅 Eventos**: Cadastro de eventos beneficentes organizados pela ONG (data, local, descrição, imagem).
4. **👤 Usuários**: Gestão de contas administrativas habilitadas a gerenciar o sistema.

---

## 📂 Estrutura do Projeto

A arquitetura do projeto segue o padrão recomendado pelo Next.js App Router, dividida de maneira modular:

```text
ongato-front/
├── app/                  # Roteamento e Páginas (Next.js App Router)
│   ├── admin/            # Área Administrativa (Dashboard e CRUDs)
│   │   ├── animais/      # Tela de gerenciamento de Gatos
│   │   ├── banners/      # Tela de gerenciamento de Banners
│   │   ├── eventos/      # Tela de gerenciamento de Eventos
│   │   ├── usuarios/     # Tela de gerenciamento de Administradores
│   │   ├── layout.tsx    # Layout interno do painel com sidebar e shell
│   │   └── page.tsx      # Dashboard inicial admin
│   ├── auth/             # Rotas de Autenticação
│   │   └── login/        # Página de login dos administradores
│   ├── globals.css       # Estilos globais e configurações do Tailwind v4
│   ├── layout.tsx        # Layout raiz da aplicação
│   └── page.tsx          # Homepage pública do site da ONG
│
├── components/           # Componentes de UI Compartilhados e Específicos
│   ├── admin/            # Componentes específicos do Painel Administrativo
│   │   ├── animais/      # Modais de criação/edição e cards de animais
│   │   ├── banners/      # Modais e tabelas de banners
│   │   ├── crud/         # Componentes utilitários de CRUD reutilizáveis
│   │   ├── eventos/      # Modais e tabelas de eventos
│   │   ├── usuarios/     # Modais e tabelas de usuários
│   │   ├── AdminShell.tsx# Estrutura de container do admin
│   │   └── AdminSidebar.tsx # Barra de navegação lateral do painel admin
│   ├── auth/             # Componentes de autenticação
│   ├── site/             # Componentes da interface pública (ex: NavBar)
│   └── ui/               # Primitivos de UI reutilizáveis (botões, inputs, modais básicos)
│
├── lib/                  # Serviços, Integrações e Utilitários
│   ├── api.ts            # Cliente centralizado do Fetch API (configurações de headers e tratamento de erros)
│   ├── animals.ts        # Integração de serviços da API para a entidade de Animais
│   ├── auth.ts           # Funções auxiliares de controle de sessão e tokens locais
│   ├── banners.ts        # Integração de serviços da API para Banners
│   ├── events.ts         # Integração de serviços da API para Eventos
│   ├── users.ts          # Integração de serviços da API para Usuários
│   └── utils.ts          # Funções utilitárias (ex: concatenação condicional de classes CSS)
│
├── types/                # Tipagens TypeScript (Interfaces de Dados)
│   ├── admin.ts          # Tipos de dados gerais do painel
│   ├── animais.ts        # Interfaces TypeScript para o modelo de Animal (Gato)
│   ├── banners.ts        # Interfaces para o modelo de Banner
│   ├── eventos.ts        # Interfaces para o modelo de Evento
│   └── usuarios.ts       # Interfaces para o modelo de Usuário
│
├── middleware.ts         # Middleware para proteção de rotas privadas (/admin e /auth/login)
├── next.config.ts        # Configurações do Next.js
├── tailwind.config.ts    # Configurações de design do Tailwind CSS (se aplicável)
├── tsconfig.json         # Configuração do TypeScript
└── package.json          # Dependências e scripts do projeto
```

---

## 🛠️ Como Executar o Projeto Localmente

### Pré-requisitos
Certifique-se de ter o **Node.js** (versão 18 ou superior) instalado em sua máquina.

### Passos para Inicialização

1. **Clonar o Repositório**:
   ```bash
   git clone https://github.com/seu-usuario/ongato-front.git
   cd ongato-front
   ```

2. **Instalar Dependências**:
   ```bash
   npm install
   ```

3. **Iniciar Servidor de Desenvolvimento**:
   ```bash
   npm run dev
   ```
   A aplicação estará disponível em `http://localhost:3000`.

4. **Compilar para Produção**:
   ```bash
   npm run build
   ```

5. **Iniciar Versão de Produção**:
   ```bash
   npm run start
   ```

---

## 🔗 Integração com o Back-end

O front-end comunica-se diretamente com um back-end serverless de alta performance rodando sobre o **Cloudflare Workers**:
- **URL Base da API**: `https://ongato-serverless.lucasribeiro292004.workers.dev`

### Fluxo de Autenticação
1. O usuário submete o e-mail e senha na rota `/auth/login`.
2. A API retorna um Token JWT válido.
3. O token é salvo no `localStorage` (para envio nos cabeçalhos de requisição `Authorization: Bearer <token>`) e um cookie `ongato_auth=true` é definido para que o Next.js Middleware faça a proteção instantânea de rotas sensíveis no servidor.

---

Desenvolvido com carinho para ajudar os gatinhos a encontrarem um lar feliz! 🐾🐈
