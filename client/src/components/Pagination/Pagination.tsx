import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {todosActions} from "../../redux/slices/todosSlice";
import css from './Pagination.module.css'

export default function PaginationControlled() {
    const dispatch = useAppDispatch();
    const { page, todoCount, limit } = useAppSelector(state => state.todos);

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(todosActions.setNewPage({page: Number(value)}))
    };

    return (
        <>
            {Math.ceil(todoCount/limit) > 1 &&
                <div className={css.main}>
                    <Stack spacing={2}>
                        <Pagination count={Math.ceil(todoCount/limit)} page={page} onChange={handleChange} />
                    </Stack>
                </div>
            }
        </>
    );
}
