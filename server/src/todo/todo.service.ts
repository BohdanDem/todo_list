import { Injectable } from '@nestjs/common';
import { TodoEntity } from '../database/entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StateEnum } from '../common/enum/todo.enum';
import { CreateTodoDto } from './dto/createTodo.dto';
import { TodoResponseInterface } from './types/todoResponse.interface';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepository: Repository<TodoEntity>,
  ) {}
  async getAllTodos(): Promise<TodoEntity[]> {
    return await this.todoRepository.find();
  }

  async createTodo(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = new TodoEntity();
    todo.state = StateEnum.pending;
    Object.assign(todo, createTodoDto);
    return await this.todoRepository.save(todo);
  }

  buildTodoResponse(todo: TodoEntity): TodoResponseInterface {
    return { todo: todo };
  }
}
