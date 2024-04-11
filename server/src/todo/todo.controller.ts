import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoEntity } from '../database/entities/todo.entity';
import { CreateTodoDto } from './dto/createTodo.dto';
import { TodoResponseInterface } from './types/todoResponse.interface';
import { DeleteResult } from 'typeorm';
import { UpdateTodoDto } from './dto/updateTodo.dto';

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

  @Get(':id')
  async getTodo(@Param('id') id: string): Promise<TodoResponseInterface> {
    const article = await this.todoService.getTodo(id);
    return this.todoService.buildTodoResponse(article);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createTodo(
    @Body('todo') createTodoDto: CreateTodoDto,
  ): Promise<TodoResponseInterface> {
    const todo = await this.todoService.createTodo(createTodoDto);
    return this.todoService.buildTodoResponse(todo);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTodo(
    @Param('id') id: string,
    @Body('todo') updateTodoDto: UpdateTodoDto,
  ): Promise<TodoResponseInterface> {
    const todo = await this.todoService.updateTodo(id, updateTodoDto);
    return this.todoService.buildTodoResponse(todo);
  }

  @Delete(':id')
  async deleteTodo(@Param('id') id: string): Promise<DeleteResult> {
    return await this.todoService.deleteTodo(id);
  }
}
