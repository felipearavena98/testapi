import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    paternal_surname: {
        type: String
    },
    maternal_surname: {
        type: String
    },
    rut: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    birth_date: {
        type: Date
    },
    status: {
        type: String,
        default: 'ACTIVE'
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    },
    rol: {
        require: true,
        type: [mongoose.Types.ObjectId],
        ref: 'rols'
    },
}, {
    timestamps: true
})