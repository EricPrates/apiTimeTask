# apiTimeTask

API REST para gerenciamento de tarefas e registro de tempo, construída com Node.js, TypeScript e Express. Projeto de estudo para aplicação de arquitetura em camadas, injeção de dependência e boas práticas de Clean Code.

---

## 🚀 Tecnologias

- **Node.js** + **TypeScript**
- **Express** — framework HTTP
- **Sequelize** — ORM para banco de dados
- **SQLite** — banco de dados relacional
- **JWT (jsonwebtoken)** — autenticação stateless
- **AsyncLocalStorage** — propagação de contexto de autenticação
- **dotenv** — variáveis de ambiente

---

## 🏗️ Arquitetura

O projeto segue uma arquitetura em camadas com separação clara de responsabilidades:

```
src/
├── auth/
│   ├── middleware/         # Middlewares de autenticação (processToken, adminProcessToken)
│   ├── generateToken.ts    # Geração de JWT
│   └── verifyToken.ts      # Verificação e decodificação de JWT
├── controller/
│   ├── tasks.controller.ts # Controller de tarefas (factory function)
│   └── user.controller.ts  # Controller de usuários (factory function)
├── middleware/
│   ├── context.middleware.ts  # Injeta contexto do usuário autenticado via AsyncLocalStorage
│   ├── config.ts              # Middleware de rotas dinâmicas para controle de acesso admin
│   └── erroHandler.ts         # Handler centralizado de erros
├── Models/
│   ├── AppError.ts         # Classe de erro customizada com statusCode
│   ├── RegisterTime.ts     # Model Sequelize de registro de tempo
│   ├── Task.ts             # Model Sequelize de tarefa
│   ├── User.ts             # Model Sequelize de usuário
│   └── transactions.ts     # Definição de associações entre models
├── repo/
│   ├── TaskRepository.ts   # Acesso ao banco para tarefas
│   └── UserRepository.ts   # Acesso ao banco para usuários
├── routes/
│   ├── task.routes.ts      # Rotas de tarefas
│   ├── user.routes.ts      # Rotas de usuários
│   └── registerTime.routes.ts
├── services/               # Camada de regras de negócio
├── types/                  # Interfaces, DTOs e tipos TypeScript
└── util/
    ├── authStorage.ts      # AsyncLocalStorage para contexto de autenticação
    └── sendHandler.ts      # Utilitário para respostas HTTP padronizadas
containers.ts               # Composição de dependências (DI manual)
server.ts                   # Entry point da aplicação
```

### Fluxo de uma requisição autenticada

```
Request → contextMiddleware → [adminProcessToken?] → processToken → Controller → Service → Repository → Response
```

### Injeção de dependência

Os controllers e services são criados via **factory functions**, recebendo suas dependências por parâmetro. A composição acontece em `containers.ts`:

```typescript
const taskRepository = TaskRepository;
const taskService    = makeTaskService(taskRepository);
const taskController = makeTaskController(taskService);
```

Isso garante baixo acoplamento e facilita testes unitários — basta passar um repositório mock.

---

## 🔐 Autenticação

A autenticação usa **JWT** com dois níveis de acesso:

| Role    | Permissões                                      |
|---------|-------------------------------------------------|
| `user`  | Gerenciar as próprias tarefas e registros       |
| `admin` | Acesso a rotas administrativas (DELETE, listagens globais) |

O token é propagado pela aplicação via `AsyncLocalStorage`, evitando o padrão `req.user` e mantendo o contexto disponível em qualquer camada sem precisar passar parâmetros explícitos.

---

## 📋 Endpoints

### Usuários

| Método | Rota             | Acesso | Descrição              |
|--------|------------------|--------|------------------------|
| POST   | `/users/register`| Público | Cadastro de usuário   |
| POST   | `/users/login`   | Público | Login e geração de JWT |

### Tarefas

| Método | Rota         | Acesso       | Descrição                        |
|--------|--------------|--------------|----------------------------------|
| GET    | `/tasks`     | Autenticado  | Lista tarefas do usuário logado  |
| POST   | `/tasks`     | Autenticado  | Cria nova tarefa                 |
| PUT    | `/tasks/:id` | Autenticado  | Atualiza tarefa por ID           |

### Registro de Tempo

> Em desenvolvimento

---

## ▶️ Como rodar localmente

### Pré-requisitos

- Node.js 18+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/EricPrates/apiTimeTask.git
cd apiTimeTask

# Instale as dependências
npm install
```

### Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
JWT_SECRET=sua_chave_secreta_aqui
PORT=3000
```

### Rodando em desenvolvimento

```bash
npm run dev
```

### Build para produção

```bash
npm run build
npm start
```

---

## 📦 DTOs e Tipagem

O projeto usa **DTOs (Data Transfer Objects)** para separar os dados que entram dos dados que saem, garantindo que informações sensíveis (como senha) nunca sejam expostas na resposta:

```typescript
// Entrada
CreateTaskDTO  { title, description, status }

// Saída
TaskResponseDTO  { id, title, description, status }
```

---

## 🛡️ Tratamento de Erros

Todos os erros passam pelo `errorHandler` central, que mapeia instâncias de `AppError` para as respostas HTTP corretas:

| StatusCode | Situação                             |
|------------|--------------------------------------|
| 400        | Dados inválidos na requisição        |
| 401        | Token ausente ou inválido            |
| 403        | Sem permissão para o recurso         |
| 404        | Recurso não encontrado               |
| 409        | Conflito (ex: e-mail já cadastrado)  |
| 422        | Entidade não processável             |
| 500        | Erro interno do servidor             |

---

## 📌 Status do Projeto

- [x] Autenticação JWT com roles
- [x] CRUD de tarefas
- [x] Arquitetura em camadas (Controller → Service → Repository)
- [x] Injeção de dependência via factory functions
- [x] Tratamento centralizado de erros
- [ ] Registro de tempo por tarefa (em desenvolvimento)
- [ ] Testes unitários
- [ ] Documentação Swagger

---

## 👨‍💻 Autor

**Eric Prates**
[LinkedIn](https://linkedin.com/in/eric-prates-dev) · [GitHub](https://github.com/EricPrates)
