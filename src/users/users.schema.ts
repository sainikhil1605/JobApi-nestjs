import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Document } from 'mongoose';
export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, minlength: 3, maxlength: 50 })
  name: string;

  @Prop({
    required: [true, 'Email Is required'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;
  comparePassword: Function;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.pre<User>('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  const hashed = await bcrypt.hash(this.password, salt);
  this.password = hashed;
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};
