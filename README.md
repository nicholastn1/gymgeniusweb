# GymGenius Web

GymGenius Web é uma aplicação front-end desenvolvida em React que se conecta à API GymGenius para gerenciar atividades de academia e fitness.

## Visão Geral

Esta aplicação permite aos usuários:
- Fazer login e gerenciar suas contas
- Visualizar e gerenciar seus treinos
- Acompanhar seu progresso fitness
- Personalizar suas rotinas de exercícios

## Tecnologias Utilizadas

- React 18
- React Router v6
- Vite
- CSS Modules
- API RESTful

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:

- Node.js (versão 14 ou superior)
- npm (normalmente vem com o Node.js)

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/gymgeniusweb.git
cd gymgeniusweb
```

2. Instale as dependências:
```bash
npm install
```

3. Configuração da API:
   - Por padrão, a aplicação se conecta à API em produção
   - Para desenvolvimento local, crie um arquivo `.env.local` baseado no `.env.local.sample` e configure a variável `VITE_API_URL`
   - Exemplo de configuração para desenvolvimento local:
     ```
     VITE_API_URL=http://localhost:3000
     ```
   - Em produção, a URL da API é configurada automaticamente através das variáveis de ambiente do ambiente de deploy

## Executando o Projeto

### Ambiente de Desenvolvimento

Para iniciar o servidor de desenvolvimento:

```bash
npm run dev
```

Isso iniciará o servidor Vite e a aplicação estará disponível em `http://localhost:5173`.

### Build de Produção

Para criar uma build de produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados no diretório `dist/`.

Para visualizar a build de produção localmente:

```bash
npm run preview
```

## Estrutura do Projeto

```
src/
├── Assets/         # Imagens e recursos estáticos
├── Components/     # Componentes React
│   ├── Forms/      # Componentes de formulário reutilizáveis
│   ├── Helper/     # Componentes auxiliares
│   ├── Login/      # Componentes relacionados ao login
│   └── User/       # Componentes relacionados ao usuário
├── Hooks/          # Custom hooks React
├── App.jsx         # Componente principal da aplicação
├── App.css         # Estilos globais
├── UserContext.jsx # Contexto de autenticação do usuário
├── api.jsx         # Configuração e funções de API
└── index.jsx       # Ponto de entrada da aplicação
```

## Deployment

Esta aplicação está configurada para deploy na Vercel. O arquivo `vercel.json` contém as configurações necessárias para o correto funcionamento das rotas.

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes.
