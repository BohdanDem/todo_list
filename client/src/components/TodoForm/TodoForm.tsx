import React from 'react';
import {useForm} from "react-hook-form";
import {ITodo} from "../../interfaces/todo.interface";
import css from './TodoForm.module.css'

const TodoForm = () => {

    const {reset,
        register,
        handleSubmit,
        setValue,
        control,
        formState: {errors} } = useForm<ITodo>({
        mode: "onSubmit",
    });

    return (
        <form className={css.form}>
            <input type="text" placeholder={'Title'} {...register('title')}/>
            <textarea placeholder={"Description"} {...register('description')}></textarea>
            <div className={css.btn_block}>
                <button className={css.btn}>SAVE</button>
                <button className={css.btn}>UPDATE</button>
                <button className={css.btn}>CLEAR</button>
            </div>
        </form>
    );
};

export default TodoForm;
