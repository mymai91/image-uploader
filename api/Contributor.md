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
