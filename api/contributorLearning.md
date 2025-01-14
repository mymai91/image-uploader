# What is a Provider?

A provider is any class, function, or value that NestJS can inject as a dependency into other components (like controllers, services, or other providers)

# @Injectable() Does

- Marks the Class as a Provider:

- Allows the class to be instantiated and managed by NestJS's dependency injection system.
  - Makes it possible to inject the class into other providers, controllers, or services.
- Allows Dependency Injection:
  Lets you inject other providers (services, utilities, etc.) into the class by declaring them in the constructor.

# What the Repository Supports in TypeORM

The Repository class in TypeORM offers high-level methods for common database operations:

Basic Query Methods:

- find(): Finds entities that match the given criteria.
- findOne(): Finds a single entity by criteria.
- findBy(): A shorthand for find({ where: ... }).
- save(): Saves or updates an entity.
- delete(): Deletes entities by criteria.
- count(): Counts entities by criteria.

example

```
async getImagesByUser(userId: number): Promise<Image[]> {
  return await this.imageRepository.find({
    where: { user: { id: userId } }, // Simplified condition
    relations: ['user'], // Optional: Load related entities
    order: { id: 'DESC' }, // Sort if needed
  });
}
```

# Routers rules:

HTTP Verb Path Controller Action Purpose

```
GET /images images#index Fetch all images
GET /images/:id images#show Fetch a single image
POST /images images#create Create a new image
PATCH/PUT /images/:id images#update Update an existing image
DELETE /images/:id images#destroy Delete an image
```
