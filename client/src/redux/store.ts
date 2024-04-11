import {configureStore} from "@reduxjs/toolkit";
import {todosReducer} from "./slices/todosSlice";

const store = configureStore({
    reducer: {
        todos: todosReducer,
    }
})

type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch

export type {
    RootState,
    AppDispatch
}

export {
    store
}
