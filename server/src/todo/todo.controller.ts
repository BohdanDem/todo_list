import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/createTodo.dto';
import { TodoResponseInterface } from './types/todoResponse.interface';
import { DeleteResult } from 'typeorm';
import { UpdateTodoDto } from './dto/updateTodo.dto';
import { TodosResponseInterface } from './types/todosResponse.interface';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
  @Get()
  async getAllTodos(@Query() query: any): Promise<TodosResponseInterface> {
    return await this.todoService.getAllTodos(query);
  }

  @Get(':id')
  async getTodo(@Param('id') id: string): Promise<TodoResponseInterface> {
    const todo = await this.todoService.getTodo(id);
    return this.todoService.buildTodoResponse(todo);
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
