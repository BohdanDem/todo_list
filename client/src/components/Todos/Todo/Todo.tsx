import React, {FC, PropsWithChildren} from 'react';
import {ITodoRes} from "../../../interfaces/todo.interface";
import css from './Todo.module.css'

interface IProps extends PropsWithChildren {
    todo: ITodoRes,
}

const Todo:FC<IProps> = ({todo}) => {

    const { id, title, description, state} = todo

    return (
        <div className={css.container}>
            <h4>title: {title}</h4>
            <div>description: {description}</div>
            <div>state: {state}</div>
        </div>
    );
};

export default Todo;
