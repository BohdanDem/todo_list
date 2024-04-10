import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateTodoDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly title: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly description: string;
}
