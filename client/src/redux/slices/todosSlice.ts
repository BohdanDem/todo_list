import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ITodosResponse} from "../../interfaces/todo.interface";
import {todoService} from "../../services/todo.service";

const initialState: ITodosResponse = {
    todoCount: null,
    todoCountPerPage: null,
    page: null,
    todos: [],
}

const getAllTodos = createAsyncThunk<ITodosResponse, {page: number}>(
    'todosSlice/getAllTodos',
    async ({page}, {rejectWithValue}) => {
        try {
            const {data} = await todoService.getAll(page);
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const todosSlice = createSlice({
    name: 'todosSlice',
    initialState,
    reducers: {},
    extraReducers: builder => builder
        .addCase(getAllTodos.fulfilled, (state, action) => {
            state.todoCount = action.payload.todoCount
            state.todoCountPerPage = action.payload.todoCountPerPage
            state.page = action.payload.page
            state.todos = action.payload.todos
        })
})

const {reducer: todosReducer, actions} = todosSlice;

const todosActions = {
    ...actions,
    getAllTodos,
}

export {
    todosActions,
    todosReducer
}
