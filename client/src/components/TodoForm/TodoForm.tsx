import React, {FormEvent, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ITodo} from "../../interfaces/todo.interface";
import css from './TodoForm.module.css'
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {todosActions} from "../../redux/slices/todosSlice";
import {joiResolver} from "@hookform/resolvers/joi";
import {todoValidator} from "../../validators/todo.validator";

const TodoForm = () => {

    const dispatch = useAppDispatch();
    const {page} = useAppSelector(state => state.todos);
    const {todoForUpdate} = useAppSelector(state => state.todoToUpdate);

    const {reset,
        register,
        handleSubmit,
        setValue,
        formState: {errors} } = useForm<ITodo>({
        mode: "onSubmit",
        resolver: joiResolver(todoValidator)
    });

    const createTodo: SubmitHandler<ITodo> = async (data) => {
        const todo = {todo: data}
        await dispatch(todosActions.createTodo({todo}))
        await dispatch(todosActions.getAllTodos({page}))
        reset()
    };

    const formFields = ['title', 'description'] as const;
    const clearForm = (e: FormEvent) => {
        e.preventDefault()
        formFields.forEach(field => {
            setValue(field, '');
        });
    };

    useEffect(() => {
        if (todoForUpdate) {
            setValue('title', todoForUpdate.title)
            setValue('description', todoForUpdate.description)
        }
    }, [todoForUpdate, setValue])

    const updateTodo: SubmitHandler<ITodo> = async (data) => {
        const todo = {todo: data}
        await dispatch(todosActions.updateTodo({id: todoForUpdate.id, todo}))
        await dispatch(todosActions.getAllTodos({page}))
        reset()
    };

    return (
        <form className={css.form}>
            <input type="text" placeholder={'Title'} {...register('title')}/>
            {errors.title && <span className={css.error}>{errors.title.message}</span>}
            <textarea placeholder={"Description"} {...register('description')}></textarea>
            {errors.description && <span className={css.error}>{errors.description.message}</span>}
            <div className={css.btn_block}>
                <button className={css.btn} onClick={handleSubmit(createTodo)}>SAVE</button>
                <button className={css.btn} onClick={handleSubmit(updateTodo)}>UPDATE</button>
                <button className={css.btn} onClick={clearForm}>CLEAR</button>
            </div>
        </form>
    );
};

export default TodoForm;
