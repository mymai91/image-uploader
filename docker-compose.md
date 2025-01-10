version: '3.8'
services:
  postgres:
    image: postgres:13
    ports:
      - "5433:5432"
    environment:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=upload_images_db
    volumes:
      - postgres_data:/var/lib/postgresql/data

  api:
    build:
      context: ./api
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    depends_on:
      - postgres
    environment:
      - DATABASE_HOST=postgres
      - DATABASE_PORT=5432
      - DATABASE_USER=postgres
      - DATABASE_PASSWORD=postgres
      - DATABASE_NAME=upload_images_db

volumes:
  postgres_data: