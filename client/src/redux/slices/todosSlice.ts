import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";
import {ITodoCreate, ITodosResponse} from "../../interfaces/todo.interface";
import {todoService} from "../../services/todo.service";

const initialState: ITodosResponse = {
    todoCount: null,
    limit: null,
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

const createTodo = createAsyncThunk<void, {todo: ITodoCreate}>(
    'todosSlice/createTodo',
    async ({todo}, {rejectWithValue}) => {
        try {
            await todoService.create(todo);
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const updateTodo = createAsyncThunk<void, { id: string, todo: ITodoCreate }>(
    'todosSlice/updateTodo',
    async ({id, todo}, {rejectWithValue}) => {
        try {
            await todoService.updateById(id, todo)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const deleteTodo = createAsyncThunk<void, {id: string}>(
    'todosSlice/deleteTodo',
    async ({id}, {rejectWithValue}) => {
        try {
            await todoService.deleteById(id)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response.data)
        }
    }
)

const todosSlice = createSlice({
    name: 'todosSlice',
    initialState,
    reducers: {
        setNewPage: (state, action: PayloadAction<{ page: number }>) => {
            state.page = action.payload.page
            console.log(state.page);
        }
    },
    extraReducers: builder => builder
        .addCase(getAllTodos.fulfilled, (state, action) => {
            state.todoCount = action.payload.todoCount
            state.limit = action.payload.limit
            state.todoCountPerPage = action.payload.todoCountPerPage
            state.page = action.payload.page
            state.todos = action.payload.todos
        })
})

const {reducer: todosReducer, actions} = todosSlice;

const todosActions = {
    ...actions,
    getAllTodos,
    createTodo,
    deleteTodo,
    updateTodo
}

export {
    todosActions,
    todosReducer
}
