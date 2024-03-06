### Nestjs API Project Structure

```bash
## Prerequisite

# Copy env
$ cp .env.example .env


# Run postgres and redis service
$ docker-compose up -d

# Installation
$ npm install

# Migrations
$ npm run migration:run

# Optional seed users
$ npm run seed:users -n=10  # To create 10 dummy users
```

```bash
## Running the app

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Demo

Demo url(http://localhost:3333/health)

```bash
## Create new file migration
$ npm run migration:create ./src/migrations/[filename]

```

```bash
## Test

# unit tests

$ npm run test

# e2e tests

$ npm run test:e2e

# test coverage

$ npm run test:cov

```
