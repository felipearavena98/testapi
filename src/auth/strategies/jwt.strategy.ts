import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { USER } from "src/common/models/models";
import { Model } from "mongoose";
import { IUser } from "src/common/interfaces/user.interface";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectModel(USER.name)
        private readonly userModel: Model<IUser>
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate(payload: { id: string }) {

        const user = await this.userModel.findById(payload.id)

        return user
    }
}