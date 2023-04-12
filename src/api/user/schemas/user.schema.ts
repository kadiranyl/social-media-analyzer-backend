import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  username: string;

  @Prop({ unique: [true, 'Email already in use'] })
  email: string;

  @Prop()
  hashedPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
