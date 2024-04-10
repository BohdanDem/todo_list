import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from '../database/entities/todo.entity';
import { CreateTodoDto } from './dto/createTodo.dto';
import { TodoResponseInterface } from './types/todoResponse.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getAllTodos(): Promise<{ todos: TodoEntity[] }> {
    const todos = await this.todoService.getAllTodos();
    return {
      todos: todos,
    };
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(
    @Body('todo') createTodoDto: CreateTodoDto,
  ): Promise<TodoResponseInterface> {
    const todo = await this.todoService.createTodo(createTodoDto);
    return this.todoService.buildTodoResponse(todo);
  }
}
