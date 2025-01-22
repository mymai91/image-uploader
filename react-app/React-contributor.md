# Server and Client Composition Patterns

When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. This page covers some recommended composition patterns when using Server and Client Components.

https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns

# setup redux

Redux Toolkit includes redux-thunk as its default middleware. When you configure the store using configureStore, it automatically adds redux-thunk as part of its default middleware configuration.

1. install package

```
yarn add @reduxjs/toolkit react-redux
```

2. Create the Redux Store
   Create a store folder in src (e.g., src/store/).
   Create the Redux store in src/store/index.ts

```
import { configureStore } from "@reduxjs/toolkit"
import authReducer from "@/features/auth/authSlice"

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Add your slices here
    auth: authReducer,
  },
  <!-- middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: true, // Thunk is included by default
      serializableCheck: false, // Optional: Disable serializable checks
    }), -->
})

// Infer the `RootState` and `AppDispatch` types from the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
```

3. Create a Slice

```
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface User {
  id: number
  username: string
  email: string
}

// Define the initial state for authentication
interface AuthState {
  user: User | null
  accessToken: string | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
}

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true
      state.error = null
    },
    loginSuccess(
      state,
      action: PayloadAction<{ user: User; accessToken: string }>,
    ) {
      state.loading = false
      state.user = action.payload.user
      state.accessToken = action.payload.accessToken
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false
      state.error = action.payload
    },
    logout(state) {
      state.user = null
      state.accessToken = null
    },
  },
})

// Export actions and reducer
export const { loginStart, loginSuccess, loginFailure, logout } =
  authSlice.actions
export default authSlice.reducer

```

4. Wrap the Application with the Redux Provider

Open src/app/layout.tsx (App Router root layout).
Wrap the <Provider> around the children components.

```
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@/store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  );
}
```

5. Use Redux in a Component

```
"use client";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/features/auth/authSlice";
import { RootState } from "@/store";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state: RootState) => state.auth);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    dispatch(loginStart());
    try {
      // Simulate API call
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      dispatch(loginSuccess({ user: data.user, accessToken: data.accessToken }));
    } catch (err: any) {
      dispatch(loginFailure(err.message));
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={credentials.username}
        onChange={handleInputChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={credentials.password}
        onChange={handleInputChange}
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && <p>Welcome, {user.username}!</p>}
    </div>
  );
};

export default LoginPage;
```

# React thunk

1. Extracting Payload from the Thunk
   Without .unwrap(), the result of dispatch(loginThunk(data)) is a Redux action object, not the payload directly. For example:

```
const result = await dispatch(loginThunk(data));
console.log(result);
/*
{
  type: "auth/login/fulfilled",
  payload: { user, accessToken }, // If successful
  meta: {...},
}
*/
```

If you want only the payload (e.g., { user, accessToken }), you can use .unwrap():

```
const payload = await dispatch(loginThunk(data)).unwrap();
console.log(payload);
/*
{
  user: { id: 1, email: "test@example.com" },
  accessToken: "your-token"
}
*/
```

Using .unwrap() ensures that the error is thrown, enabling you to handle it properly in a try-catch block:

```
try {
  const payload = await dispatch(loginThunk(data)).unwrap();
  console.log("Login successful:", payload);
} catch (err) {
  console.error("Login failed:", err); // Handle errors here
}

```

# Redux thunk to fetch api

1. Redux level

```
const getData = createAsyncThunk(
  'users/fetchByIdStatus',
  async (paramsSentFromComponent, { dispatch }) => {
    // Dispatch another action inside the thunk
  const response = await userAPI.fetchById(userId)

  dispatch(loginSuccess(response))

  return response.data
  },
)
```

2. Component level

a. getData() => so the paramsSentFromComponent is empty

```
 useEffect(() => {
    dispatch(getData())
  }, [dispatch])
```

a. getData(userId) => so the paramsSentFromComponent is userId

```
 useEffect(() => {
    dispatch(getData(userId))
  }, [dispatch])
```

3. Reducers function & dispatch

```
import { ProductImage } from "@/app/product-images/types/ProductImage"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ListImageState {
  items: ProductImage[]
  total: number
  page: number
  limit: number
  totalPage: number
  loading: boolean
  error: string | null
}

const initialState: ListImageState = {
  items: [],
  total: 0,
  page: 1,
  limit: 10,
  totalPage: 0,
  loading: false,
  error: null,
}

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    fetchListImage(
      state,
      action: PayloadAction<{
        items: ProductImage[]
        page: number
        limit: number
        totalPage: number
        total: number
      }>,
    ) {
      state.items = [...state.items, ...action.payload.items]
      state.page = action.payload.page
      state.limit = action.payload.limit
      state.totalPage = action.payload.totalPage
      state.total = action.payload.total
      state.loading = false
      state.error = null
    },
    fetchListImageFailure(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    },
  },
})

export const { fetchListImage, fetchListImageFailure } = imageSlice.actions
export default imageSlice.reducer
```

2. From thunk function

Redux automatically:
Provides the current state of the images slice to the fetchListImage reducer.
Passes the action payload you provided ({ items, page, limit, totalPage, total }).

```
   dispatch(
        fetchListImage({
          items: response.data.items,
          page: 1,
          limit: 10,
          totalPage: response.data.totalPage,
          total: response.data.total,
        }),
      )
```
