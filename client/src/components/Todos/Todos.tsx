import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {todosActions} from "../../redux/slices/todosSlice";

const Todos = () => {

    const dispatch = useAppDispatch();
    const {todos, page} = useAppSelector(state => state.todos);

    useEffect(() => {
        dispatch(todosActions.getAllTodos({page}))
    }, [])

    return (
        <div>
            {todos && todos.map(todo => <div>
                <div>{todo.title}</div>
                <div>{todo.description}</div>
            </div>)}
        </div>
    );
};

export default Todos;
