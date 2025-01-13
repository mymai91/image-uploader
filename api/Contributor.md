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

# Upload image

we don't need to explicitly install the `multer` package because it comes bundled with `@nestjs/platform-express` package, which is a standard dependency in NestJS applications.
Here's the dependency chain:

`@nestjs/platform-express` includes `Express.js`
`Express.js` includes `multer` as a dependency for handling `multipart/form-data`
`NestJS` wraps this functionality in the `FileInterceptor from @nestjs/platform-express`

# Authentication

1. update your .env file to include the JWT secret:

`JWT_SECRET=your-super-secret-key-here`

2. Create a new config file for JWT settings (src/config/jwt.config.ts):

```
typescriptCopyexport default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '30d',
  }
});
```

3. From `AuthModule` import `jwt` from config

```
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: configService.get<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.get<string>('jwt.expiresIn', '30d')
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
```

4. Load jwt in app.module

````
ConfigModule.forRoot({
      isGlobal: true, // Makes env variables available throughout the app
      load: [databaseConfig, jwtConfig], // when we load in ConfigModule, then we can access the jwtConfig via configService
    }),
    ```

1. sign in api with jwt

`@nestjs/jwt bcrypt`

2. If you import any service for your service, should import it into module

for example:

I use userService and jwtService in authService,

i have to import it into auth.module.ts

````

import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
imports: [
UsersModule,
JwtModule.register({
global: true,
secret: process.env.JWT_SECRET,
signOptions: { expiresIn: '30d' },
}),
],
controllers: [AuthController],
providers: [AuthService],
exports: [AuthService],
})
export class AuthModule {}

```

```

# Jwt comment approach

4. Recommended Approach

```
A practical approach is a hybrid of the above:

* Use @GetUser() to fetch lightweight user info (e.g., id) from the JWT payload.
* In the service layer, fetch the full user entity only when absolutely necessary (e.g., when user relations or additional fields are required).
* (optional) For APIs where you frequently need the full user entity, consider caching it or including it in the JWT token (if size is not a concern).
```
