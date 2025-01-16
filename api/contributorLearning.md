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

# Controller

https://docs.nestjs.com/controllers

# Guards

Guards are executed after all middleware, but before any interceptor or pipe.

Hint
If you are looking for a real-world example on how to implement an authentication mechanism in your application, visit this chapter. Likewise, for more sophisticated authorization example, check this page.

# Serializer

`class-transformer`

2 ways:

1. from service

```
async getAll(user: User): Promise<Image[]> {
    const currentUser = await this.userUtils.getCurrentUser(user.email);
    console.log('currentUser', currentUser);

    const images = await this.imageRepository.find({
      where: { user: { id: currentUser.id } }, // Better to query by ID
      relations: ['user'], // Add this to load the user relation
      order: { uploadDate: 'DESC' },
    });

    return images;

    // console.log('images', images);

    // return images.map((image) =>
    //   plainToClass(ImageResponseDto, image, { excludeExtraneousValues: true }),
    // );
  }
```

2. from controller

use `@UseInterceptors(ClassSerializerInterceptor)` and `@SerializeOptions({ type: ImageResponseDto })`

https://docs.nestjs.com/techniques/serialization

```
@UseInterceptors(ClassSerializerInterceptor)
export class ImagesController {
  @Get()
  @Auth()
  @SerializeOptions({ type: ImageResponseDto })
  async findAll(@GetUser() user: User, @Query('page') page: number) {
    return this.imagesService.getAll(user);
  }
}
```

If you return with pagination, the best way is you should serializer at service and use `plainToClass`

# Migration

```
import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlertImageTableRemoveUserIdColumn1736905982113
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'image',
      new TableColumn({
        name: 'deletedAt',
        type: 'timestamp',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'image',
      new TableColumn({
        name: 'isActive',
        type: 'boolean',
        default: true,
      }),
    );

    await queryRunner.addColumn(
      'image',
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
    );

    await queryRunner.renameColumn('image', 'uploadDate', 'createdAt');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('image', 'isActive');
    await queryRunner.dropColumn('image', 'deletedAt');
    await queryRunner.dropColumn('image', 'updatedAt');
    await queryRunner.renameColumn('image', 'createdAt', 'uploadDate');
  }
}

```

# Task schedule

Run script everyday

https://docs.nestjs.com/techniques/task-scheduling

`yarn add @nestjs/schedule`

# Task Queues

if users can initiate resource-intensive tasks at arbitrary times, you can add these tasks to a queue instead of performing them synchronously

Nest provides the @nestjs/bullmq package

Both BullMQ and Bull use `Redis` to persist job data, so you'll need to have `Redis installed on your system`

https://docs.nestjs.com/techniques/queues

```
yarn add @nestjs/bullmq bullmq

yarn add -D @types/bull
```

queues file name should be with `xxx.processor.ts`

**concept**

```
// Sender (Service)
imageDeleteQueue.add('delete', { imageId: 123 });

// Receiver (Processor)
@Process('delete')
handleDelete(job) {
  console.log(job.data.imageId); // 123
}
```

**Redis**

1. Install

```
brew install redis
```

2. Start Redis

```
brew services start redis
```

OR

Restart Redis:

```
brew services restart redis
```

3. Verify Redis is running:
