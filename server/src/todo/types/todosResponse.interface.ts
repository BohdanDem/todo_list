import { TodoEntity } from '../../database/entities/todo.entity';

export interface TodosResponseInterface {
  todoCount: number;
  todoCountPerPage: number;
  page: number;
  todos: TodoEntity[];
}
