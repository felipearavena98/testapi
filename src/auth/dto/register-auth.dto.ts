import { Type } from "class-transformer";
import { IsArray, IsString } from "class-validator";
import { CreateRolDto } from "src/rol/dto/create-rol.dto";

export class RegisterAuthDTO {
    @IsString()
    name: string;

    @IsString()
    paternal_surname: string;

    @IsString()
    maternal_surname: string;

    @IsString()
    rut: string;

    @IsString()
    password: string;

    @IsString()
    email?: string;

    @IsString()
    phone: string;

    @Type(() => Date)
    birth_date?: Date;

    @IsString()
    status: string;

    @Type(() => Date)
    created_at?: Date;

    @Type(() => Date)
    updated_at?: Date | null;

    @IsArray()
    @Type(() => CreateRolDto)
    rol: CreateRolDto[];
}
