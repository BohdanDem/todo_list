import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {todosActions} from "../../redux/slices/todosSlice";
import Todo from "./Todo/Todo";

const Todos = () => {

    const dispatch = useAppDispatch();
    const {todos, page} = useAppSelector(state => state.todos);

    useEffect(() => {
        dispatch(todosActions.getAllTodos({page}))
    }, [dispatch, page])

    return (
        <div>
            {todos && todos.map(todo => <Todo key={todo.id} todo={todo}/>)}
        </div>
    );
};

export default Todos;
