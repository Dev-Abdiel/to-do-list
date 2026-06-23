To do list

Aplicação web completa de gerenciamento de tarefas desenvolvida com Node.js, Express, TypeScript, PostgreSQL e React.


🚀 Tecnologias utilizadas

Back-end

Node.js
Express
TypeScript
PostgreSQL (pg)
dotenv
cors

Front-end

React
Vite
Axios
Lucide React


📁 Estrutura do projeto

todo-list/ 
├── backend/ 
│   ├── src/ 
│   │   ├── controllers/ 
│   │   │   └── taskController.ts
│   │   ├── database/ 
│   │   │   └── db.ts
│   │   ├── routes/ 
│   │   │   └── taskRoutes.ts
│   │   └── server.ts
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ProgressBar.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskForm.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── vite.config.js
    └── package.json


⚙️ Como rodar o projeto

Pré-requisitos


Node.js instalado
PostgreSQL instalado e rodando


1. Configurar o banco de dados

Acesse o PostgreSQL e crie o banco e a tabela:

sqlCREATE DATABASE todo_db;

\c todo_db

CREATE TABLE tasks (
  id               SERIAL PRIMARY KEY,
  tarefa           VARCHAR(255) NOT NULL,
  status           BOOLEAN DEFAULT FALSE,
  prioridade       VARCHAR(10),
  data_vencimento  DATE,
  comentario       TEXT,
  data_criacao     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


2. Configurar o back-end

Entre na pasta do backend:

bashcd backend

Instale as dependências:

bashnpm install

Crie o arquivo .env na pasta backend/ com as suas credenciais:

envDB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_HOST=localhost
DB_PORT=5432
DB_NAME=todo_db

Inicie o servidor:

bashnpm run dev

O backend estará rodando em http://localhost:3000.


3. Configurar o front-end

Em outro terminal, entre na pasta do frontend:

bashcd frontend

Instale as dependências:

bashnpm install

Inicie a aplicação:

bashnpm run dev

O frontend estará disponível em http://localhost:5173.


🔌 Endpoints da API

MétodoRotaDescriçãoGET/tasksLista todas as tarefasPOST/tasksCria uma nova tarefaPUT/tasks/:idAtualiza uma tarefa existenteDELETE/tasks/:idRemove uma tarefa


✨ Funcionalidades


✅ Criar, editar, concluir e deletar tarefas
🎯 Definir prioridade (Alta, Média, Baixa)
📅 Adicionar data de vencimento com alerta de atraso
💬 Adicionar comentário/nota em cada tarefa
📊 Barra de progresso animada
🌙 Modo claro e escuro (segue o sistema)
⚡ Atualizações em tempo real sem recarregar a página
