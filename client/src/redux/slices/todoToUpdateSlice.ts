import {ITodo} from "../../interfaces/todo.interface";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    todoForUpdate: ITodo | null
}

const initialState: IState = {
    todoForUpdate: null
};

const todoForUpdateSlice = createSlice({
    name: 'todoForUpdate',
    initialState,
    reducers: {
        setTodoForUpdate: (state, action: PayloadAction<{ todo: ITodo }>) => {
            state.todoForUpdate = action.payload.todo
        }
    }
})

const {reducer: todoForUpdateReducer, actions} = todoForUpdateSlice;

const todoForUpdateActions = {
    ...actions,
}

export {
    todoForUpdateActions,
    todoForUpdateReducer
}
