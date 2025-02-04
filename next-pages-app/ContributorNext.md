1. start project

```
 yarn create next-app next-pages-app --typescript
```

```
cd next-pages-app
```

2. Install Required Packages

- @reduxjs/toolkit & react-redux → Manage authentication state.
- axios → Make API calls.
- js-cookie → Store access token securely.

```
yarn add @reduxjs/toolkit react-redux axios js-cookie @types/js-cookie
```

- @chakra-ui/react, @emotion/react, @emotion/styled, framer-motion → Required for Chakra UI.

```
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

- react-hook-form → For managing forms efficiently.
- @hookform/resolvers → Bridge between React Hook Form and Yup.
- yup → For form validation.

```
yarn add react-hook-form @hookform/resolvers yup
```

3. Protection routes

src/middleware.ts

```
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get("image_uploader-accessToken")
  const isAuthPage =
    request.nextUrl.pathname.startsWith("/login") ||
    request.nextUrl.pathname.startsWith("/register")
  const isProtectedPage = request.nextUrl.pathname.startsWith("/product-images")

  if (isProtectedPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/product-images", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/register", "/product-images/:path*"],
}
```
