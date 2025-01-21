1. Config at `app.config.ts` with `authInterceptor`

```
// src/app/app.config.ts
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { authInterceptor } from './core/interceptors/auth.interceptor'; // We'll create this

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
```

2. Create auth.interceptor

```
# Generate the interceptor
ng generate interceptor core/interceptors/auth
```

- withInterceptors([authInterceptor]):

* Use this when you need automatic token handling
* Automatically adds Authorization headers to all HTTP requests
* Helpful for maintaining DRY (Don't Repeat Yourself) principle
* Centralizes authentication logic

```
// src/app/core/interceptors/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access_token');

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
```

// NOTE
/\*
The .pipe() approach is preferred because:

Code Organization: Operators like catchError and finalize make the code more organized and easier to maintain
DRY Principle: Using finalize() ensures cleanup code runs in both success and error cases, avoiding repetition
RxJS Best Practices: It follows RxJS best practices for stream manipulation
Extensibility: Easier to add more operators like debounceTime, distinctUntilChanged, etc.
Testability: Easier to test as each operator can be tested independently
\*/

/\*

// Basic structure
http.get('/api/data').subscribe({
next: (data) => {
// Handles successful response
console.log('Data received:', data);
},
error: (error) => {
// Handles errors
console.error('Error:', error);
},
complete: () => {
// Optional: Handles completion
console.log('Request completed');
}
});

\*/

/\*

Think of it like a pipeline:

.pipe(): Processes/transforms the data
.subscribe(): Receives the final processed result

You don't always need both - use .pipe() only when you need to transform data or handle errors before subscription.
\*/

/\*

1. In service

use pipe() to transform data or handle errors before subscription
for example, to save data into cookie/localStorage before sending it to the component

Use:

- tap for side effects (logging, saving data)
- map when you need to transform the data stream

```
// tap: Used for side effects, doesn't transform data
tap(response => {
// Just performs an action, original response continues unchanged
localStorage.setItem('token', response.access_token);
return response; // This return is actually ignored
})

// map: Used to transform data
map(response => {
// Must return transformed data
return {
...response,
token: response.access_token,
expiresIn: response.expires_in \* 1000
};
})
```

2. In component

use subscribe() to receive the final processed result

\*/
