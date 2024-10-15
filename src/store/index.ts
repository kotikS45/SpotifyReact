import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { userApi } from "services/user.ts";
import { artistApi } from "services/artist";
import { genreApi } from "services/genre";
import userReducer from "store/slice/userSlice.ts";

export const store = configureStore({
    reducer: {
        user: userReducer,
        [userApi.reducerPath]: userApi.reducer,
        [artistApi.reducerPath]: artistApi.reducer,
        [genreApi.reducerPath]: genreApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
          userApi.middleware,
          artistApi.middleware,
          genreApi.middleware,
        ),
});

setupListeners(store.dispatch);

// Типізація Redux
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;