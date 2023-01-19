import { IRole } from "./rol.interface";

export interface IUser extends Document {
    name: string;
    paternal_surname: string;
    maternal_surname: string;
    rut: string;
    password: string;
    email: string;
    phone: string;
    rol: IRole[]
}