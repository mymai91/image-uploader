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

Use Migrations:

Generate migrations for schema changes:

```bash
npm run typeorm migration:generate -- -n MigrationName
```

Run migrations:

```bash
npm run typeorm migration:run
```

# Using Swagger (Recommended for Development)

npm install @nestjs/swagger swagger-ui-express

Add swagger to main.ts

Now you can access Swagger at: http://localhost:3000/api
