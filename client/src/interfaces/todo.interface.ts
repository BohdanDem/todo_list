export interface ITodo {
    id?: string;
    title: string;
    description: string;
    state?: string
}

export interface ITodoCreate {
    todo: ITodo
}

export interface ITodoRes {
    id: string;
    title: string;
    description: string;
    state: string
}

export interface ITodosResponse {
    todoCount: number;
    limit: number;
    todoCountPerPage: number;
    page: number;
    todos: ITodoRes[];
}
