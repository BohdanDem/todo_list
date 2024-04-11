export interface ITodoCreate{
    todo: {
        title: string;
        description: string;
        state: string
    }
}

export interface ITodoRes{
    id: string;
    title: string;
    description: string;
    state: string
}

export interface ITodosResponse {
    todoCount: number;
    todoCountPerPage: number;
    page: number;
    todos: ITodoRes[];
}
