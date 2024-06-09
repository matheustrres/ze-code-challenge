<h1 align="center">
  Zé Delivery back-end-based technical challenge
  </a>
</h1>

<p align="center">You can see the challenge requirements <a href="https://github.com/ab-inbev-ze-company/ze-code-challenges/blob/master/backend.md" target="_blank">here</a>

<p align="center">
  • <a href="#features">Features</a><br>
  • <a href="#environment-variables">Environment variables</a><br>
  • <a href="#seeding-db">Seeding DB</a><br>
  • <a href="#running-locally">Running locally</a><br>
  • <a href="#running-tests">Running tests</a><br>
  • <a href="#stack">Stack</a>
  • <a href="#license">License</a>
</p>

## Features

- Partner creation
- Partner searching by ID
- Search for nearest partner by coordinates

## Environment variables

Remember to create the necessary .env files:

```bash
cp -r .env.sample .env
cp -r .env.sample .env.dev
```

`PORT=3030`
`NODE_ENV="PRODUCTION"`
`MONGODB_USER="user"`
`MONGODB_PASSWORD="password"`
`MONGODB_DATABASE="database"`
`MONGODB_PORT="27017"`

## Seeding DB

To preload the database with some data:

- First, remember to build the project to its latest version

```bash
pnpm build
```

```bash
pnpm db:seed
```

You can see the full list of data <a href="https://github.com/matheustrres/ze-code-challenge/blob/main/assets/pdvs.json" target="_blank">here</a>

## Running locally

Clone the project:

```bash
git clone https://github.com/matheustrres/ze-code-challenge
```

Enter the project directory:

```bash
cd ze-code-challenge
```

Install the necessary dependencies:

```bash
pnpm install
```

Start the server in development mode:

```bash
pnpm start:dev
```

## Running tests

To run the existing tests, run the following command:

```bash
pnpm test
```

## Stack

- Node.js
- Typescript
- Express
- MongoDB
- Mongoose
- Docker
- Zod

## License  

This project is licensed under the **[GPL 3.0](https://github.com/matheustrres/ze-code-challenge/blob/main/LICENSE)** license.