import {configureStore} from "@reduxjs/toolkit";
import {todosReducer} from "./slices/todosSlice";
import {todoForUpdateReducer} from "./slices/todoToUpdateSlice";

const store = configureStore({
    reducer: {
        todos: todosReducer,
        todoToUpdate: todoForUpdateReducer,
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
