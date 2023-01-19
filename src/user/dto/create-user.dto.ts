import { Type } from "class-transformer";
import { IsArray, IsDate, IsString } from "class-validator";
import { Types } from "mongoose";
import { CreateRolDto } from "src/rol/dto/create-rol.dto";

export class CreateUserDto {
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
    // @IsDate()
    birth_date?: Date;

    @IsString()
    status: string;

    @Type(() => Date)
    // @IsDate()
    created_at?: Date;

    @Type(() => Date)
    // @IsDate()
    updated_at?: Date | null;

    @IsArray()
    @Type(() => CreateRolDto)
    rol: CreateRolDto[];
}
