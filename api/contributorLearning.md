# What is a Provider?

A provider is any class, function, or value that NestJS can inject as a dependency into other components (like controllers, services, or other providers)

# @Injectable() Does

- Marks the Class as a Provider:

- Allows the class to be instantiated and managed by NestJS's dependency injection system.
  - Makes it possible to inject the class into other providers, controllers, or services.
- Allows Dependency Injection:
  Lets you inject other providers (services, utilities, etc.) into the class by declaring them in the constructor.
