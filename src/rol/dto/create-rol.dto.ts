import { IsString } from "class-validator";

export class CreateRolDto {

    _id?: string;

    @IsString()
    name: string;
}
