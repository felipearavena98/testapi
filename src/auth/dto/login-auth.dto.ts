import { IsString } from "class-validator";

export class LoginAuthDto {
    @IsString()
    rut: string;

    @IsString()
    password: string;
}