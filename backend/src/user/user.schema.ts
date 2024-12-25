import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

// Тип документа, который включает дополнительные свойства Mongoose, такие как _id
export type UserDocument = User & Document & { _id: Types.ObjectId }

@Schema()
export class User {
    @Prop({ required: true, unique: true })
    email: string

    @Prop({ required: true })
    password: string
}

export const UserSchema = SchemaFactory.createForClass(User)
