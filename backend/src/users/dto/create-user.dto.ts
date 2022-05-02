import { IsEmail, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Role } from "src/roles/entities/role.entity";

export class CreateUserDto {
    @IsEmail()
    email: string

    @IsString() @MinLength(1) @MaxLength(16)
    username: string

    @IsString() @MinLength(8) @MaxLength(32)
    password: string

    @IsNumber() @IsOptional()
    role: Role['id']
}
