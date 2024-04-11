import {apiService, IRes} from "./api.service";
import {urls} from "../constants/urls";
import {ITodoCreate, ITodosResponse} from "../interfaces/todo.interface";

const todoService = {
    getAll: (page: number): IRes<ITodosResponse> => apiService.get(urls.todos.base, {params: {page}}),
    create: (data: ITodoCreate): IRes<ITodoCreate> => apiService.post(urls.todos.base, data),
    updateById: (id: string, data: Partial<ITodoCreate>): IRes<ITodoCreate> => apiService.put(urls.todos.byId(id), data),
    deleteById: (id: string): IRes<void> => apiService.delete(urls.todos.byId(id))
}

export {
    todoService
}
