1. Install @nestjs/config to retrive env variable

`yarn add @nestjs/config`

`yarn add bcrypt @nestjs/jwt @nestjs/passport passport passport-jwt class-validator class-transformer`

# Generate modules

nest g module modules/users
nest g module modules/images

when we run `nest g module modules/users` it will auto import `UsersModule` in `app.module.ts`

# Generate controllers

nest g controller modules/users
nest g controller modules/images

# Generate services

nest g service modules/users
nest g service modules/images

# Check DB up from docker

docker exec -it image-uploader-postgres-1 psql -U user -d upload_images_db

# Create migration

- type orm need `dotenv` to manage enviroment then we need to install `dotenv`

`yarn add dotenv`

Use Migrations:

Generate migrations for schema changes:

```bash
yarn typeorm migration:generate -d src/config/data-source.ts -n MigrationName
```

Run migrations:

```bash
yarn typeorm migration:run -d src/config/data-source.ts
```

OR

```
yarn migration:generate src/migrations/UserTableAndImageTable
```

Rollback migration:

```bash
yarn typeorm migration:revert -d src/config/data-source.ts
```

# Using Swagger (Recommended for Development)

yarn add @nestjs/swagger swagger-ui-express

Add swagger to main.ts

Now you can access Swagger at: http://localhost:3000/api
