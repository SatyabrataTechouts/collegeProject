import { configureStore } from '@reduxjs/toolkit'
import AuthSlice from './slice/AuthSlice'
import SelectedDataSlice from './slice/SelectedDataSlice'
import cartSlice from './slice/cartSlice'
// ...

export const store = configureStore({
  reducer: {
    AuthData:AuthSlice,
    data:SelectedDataSlice,
    cart:cartSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch