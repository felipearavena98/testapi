import * as mongoose from 'mongoose';

enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    EMBARCADOR = 'EMBARCADOR',
    CHOFER = 'CHOFER',
    ASISTENTE = 'ASISTENTE',
    NUEVO = 'NUEVO'
}

export const RolSchema = new mongoose.Schema({
    name: {
        unique: true,
        index: true,
        type: String,
        uppercase: true,
        enum: Object.values(Role),
        default: Role.USER
    },
},
    { timestamps: true }
);

RolSchema.index({ name: 1 }, { unique: true });