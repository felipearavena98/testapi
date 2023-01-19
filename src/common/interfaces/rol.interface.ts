import { Document } from "mongoose";

export interface IRole extends Document {
    _id: string;
    name: string;
}