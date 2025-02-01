# Redux thunk

when using **createAsyncThunk**, you must use **extraReducers** to handle the different states of the async thunk:

- pending: When the request starts.
- fulfilled: When the request succeeds.
- rejected: When the request fails.
