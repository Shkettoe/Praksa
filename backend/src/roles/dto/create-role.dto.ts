import { IsArray, IsString, MaxLength, MinLength } from "class-validator";
import { Permission } from "src/permissions/permission.entity";

export class CreateRoleDto {
    @IsString() @MinLength(2) @MaxLength(12)
    name: string

    @IsArray()
    permissions: Permission[]
}
