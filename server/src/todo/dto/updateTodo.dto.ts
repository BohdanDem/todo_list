import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StateEnum } from '../../common/enum/todo.enum';

export class UpdateTodoDto {
  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  readonly title: string;

  @IsOptional()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  readonly description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsEnum(StateEnum)
  readonly state: StateEnum;
}
