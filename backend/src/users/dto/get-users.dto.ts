import { Exclude } from "class-transformer";
import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class GetUserDto {
    @IsEmail()
    email: string

    @IsString() @MinLength(1) @MaxLength(16)
    username: string

    @Exclude()
    password: string
}
