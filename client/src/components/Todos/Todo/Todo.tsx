import React, {FC, PropsWithChildren} from 'react';
import {ITodoRes} from "../../../interfaces/todo.interface";
import css from './Todo.module.css'
import {useAppDispatch, useAppSelector} from "../../../hooks/reduxHooks";
import {todosActions} from "../../../redux/slices/todosSlice";
import {todoForUpdateActions} from "../../../redux/slices/todoToUpdateSlice";
import {todoService} from "../../../services/todo.service";

interface IProps extends PropsWithChildren {
    todo: ITodoRes,
}

const Todo:FC<IProps> = ({todo}) => {

    const { id, title, description, state} = todo
    const dispatch = useAppDispatch();
    const {page} = useAppSelector(state => state.todos);

    const updateTodoStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = event.target.value;
        const update = async () => {
            const updateTodo = { todo: { ...todo, state: selectedOption}}
            await todoService.updateById(id, updateTodo)
            await dispatch(todosActions.getAllTodos({page}))
        }
        update().then()
    };

    const deleteToto = async () => {
        await dispatch(todosActions.deleteTodo({id}))
        await dispatch(todosActions.getAllTodos({page}))
    };

    return (
        <div className={css.container}>
            <h4>title: {title}</h4>
            <div>description: {description}</div>
            <div className={css.dropdown}>
                <div>state:</div>
                <select className={css.select} value={state} onChange={updateTodoStatus}>
                    <option value="очікує виконання">очікує виконання</option>
                    <option value="в процесі">в процесі</option>
                    <option value="виконаний">виконаний</option>
                </select>
            </div>
            <div className={css.button_block}>
                <button className={css.button}
                        onClick={()=>dispatch(todoForUpdateActions.setTodoForUpdate({todo}))}>Update</button>
                <button className={css.button} onClick={deleteToto}>Delete</button>
            </div>
        </div>
    );
};

export default Todo;
