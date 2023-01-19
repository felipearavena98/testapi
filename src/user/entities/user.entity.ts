import { Prop, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, now } from "mongoose";
import { timestamp } from "rxjs";
// import { Rol } from "src/rol/entities/rol.entity";

export class User extends Document {
    @Prop({
        index: true,
        type: String
    })
    name: string;

    @Prop({
        type: String
    })
    paternal_surname: string;

    @Prop({
        type: String
    })
    maternal_surname: string;

    @Prop({
        unique: true,
        type: String
    })
    rut: string;

    @Prop({
        type: String
    })
    password: string;

    @Prop({
        unique: true,
        type: String
    })
    email: string;

    @Prop({
        type: String
    })
    phone: string;

    @Prop(
        // {
        // type: Date
        // }
    )
    birth_date?: Date | null;

    @Prop({
        default: 'ACTIVE',
        enum: ['ACTIVE', 'DESACTIVE', 'DELETED']
    })
    status: string;


    @Prop(
        //     {
        //     type: timestamp,
        //     default: () => now()
        // }
    )
    created_at?: Date;

    @Prop(
        // {
        // type: timestamp,
        // }
    )
    updated_at?: Date | null;

    // @Prop({
    //     type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rol' }]
    // })
    // rol?: Rol[];
}

export const UserSchema = SchemaFactory.createForClass(User);