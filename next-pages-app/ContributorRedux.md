# Redux thunk

when using **createAsyncThunk**, you must use **extraReducers** to handle the different states of the async thunk:

- pending: When the request starts.
- fulfilled: When the request succeeds.
- rejected: When the request fails.

## How Redux Toolkit’s createAsyncThunk Works vs. Manual Thunk

### Option 1: Using createAsyncThunk (Redux Toolkit’s Automated Way)

```
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getListActiveImage = createAsyncThunk(
  "activeImages/getList",
  async () => {
    const response = await getListImageApi();
    return { items: response.data.items };
  }
);
```

- This automatically creates:

  - getListActiveImage.pending
  - getListActiveImage.fulfilled
  - getListActiveImage.rejected

You must use extraReducers to handle these states.

### Option 2: Manually Writing a Thunk (Custom Control)

```
export const getListActiveImage = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setLoading(true)); // ✅ Manually set loading state
    const response = await getListImageApi();
    dispatch(fetchListImage({ items: response.data.items })); // ✅ Dispatch success
  } catch (error: any) {
    dispatch(setError("Failed to fetch images")); // ✅ Dispatch error manually
  } finally {
    dispatch(setLoading(false)); // ✅ Stop loading manually
  }
};
```

- No createAsyncThunk – the thunk is just a regular async function.
- We manually dispatch setLoading, fetchListImage, and setError reducers.
- This allows more control over what actions are dispatched and when.

### Which One Should You Use?

| Feature                                                          | `createAsyncThunk` | Manual Thunk |
| ---------------------------------------------------------------- | ------------------ | ------------ |
| Automatically creates `pending`, `fulfilled`, `rejected` actions | ✅ Yes             | ❌ No        |
| Requires `extraReducers`                                         | ✅ Yes             | ❌ No        |
| Manually control dispatching actions                             | ❌ No              | ✅ Yes       |
| Best for complex async logic                                     | ✅ Yes             | ❌ No        |
| Best for full control over API handling                          | ❌ No              | ✅ Yes       |

### Conclusion

- If you want **Redux Toolkit** to handle everything for you, use createAsyncThunk + extraReducers.
- If you **prefer writing your own logic and have full control**, use **manual thunks** like in Example 2.
