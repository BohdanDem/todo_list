import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { TodoEntity } from '../database/entities/todo.entity';
import { Repository, DeleteResult, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEnum } from '../common/enum/todo.enum';
import { CreateTodoDto } from './dto/createTodo.dto';
import { TodoResponseInterface } from './types/todoResponse.interface';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodosResponseInterface } from './types/todosResponse.interface';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
    private dataSource: DataSource,
  ) {}
  async getAllTodos(query: any): Promise<TodosResponseInterface> {
    const queryBuilder = this.dataSource
      .getRepository(TodoEntity)
      .createQueryBuilder('todos');

    const defaultQueryLimit = 10;
    const defaultQueryPage = 1;
    const queryLimit = query.limit ? Number(query.limit) : defaultQueryLimit;
    const offsetPage = query.page
      ? Number(query.page - defaultQueryPage) * queryLimit
      : 0;
    queryBuilder.limit(queryLimit);
    queryBuilder.offset(offsetPage);

    queryBuilder.orderBy('todos.createdAt', 'DESC');
    const todos = await queryBuilder.getMany();
    const todoCount = await queryBuilder.getCount();

    const todoCountPerPage = todos.length;
    const page = query.page ? Number(query.page) : defaultQueryPage;

    return { todoCount, todoCountPerPage, page, todos };
  }

  async getTodo(id: string): Promise<TodoEntity> {
    return await this.findTodoByIdOrException(id);
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = new TodoEntity();
    todo.state = StateEnum.pending;
    Object.assign(todo, createTodoDto);
    return await this.todoRepository.save(todo);
  }

  async updateTodo(
    id: string,
    updateTodoDto: UpdateTodoDto,
  ): Promise<TodoEntity> {
    const todo = await this.findTodoByIdOrException(id);
    this.todoRepository.merge(todo, updateTodoDto);
    return await this.todoRepository.save(todo);
  }

  async deleteTodo(id: string): Promise<DeleteResult> {
    const todo = await this.findTodoByIdOrException(id);
    return await this.todoRepository.delete(todo.id);
  }

  private async findTodoByIdOrException(id: string): Promise<TodoEntity> {
    const todo = await this.todoRepository.findOneBy({ id });
    if (!todo) {
      throw new UnprocessableEntityException('Todo not found');
    }
    return todo;
  }

  buildTodoResponse(todo: TodoEntity): TodoResponseInterface {
    return { todo: todo };
  }
}
