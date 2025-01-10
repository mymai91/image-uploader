import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
// TODO alias import is not working @module/users/...
import { User } from '../modules/users/entities/user.entity';
import { Image } from '../modules/images/entities/images.entity';

// Load environment variables
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST, // From .env
  port: parseInt(process.env.DATABASE_PORT, 10), // From .env
  username: process.env.DATABASE_USER, // From .env
  password: process.env.DATABASE_PASSWORD, // From .env
  database: process.env.DATABASE_NAME, // From .env
  entities: [User, Image],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'], // Adjust path to your migrations
  synchronize: false, // Disable in production
  logging: true, // Enable logging
});

// Optional: Initialize the DataSource to ensure it works correctly
AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
