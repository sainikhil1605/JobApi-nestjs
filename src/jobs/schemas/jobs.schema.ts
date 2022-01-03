import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/users/users.schema';

@Schema({ timestamps: true })
export class Job extends mongoose.Document {
  @Prop({
    type: String,
    required: [true, 'Company Name is required'],
    maxlength: 50,
  })
  company: string;
  @Prop({
    type: String,
    required: [true, 'Job Title is required'],
    maxlength: 50,
  })
  position: string;
  @Prop({
    type: String,
    enum: ['Applied', 'Interview', 'Rejected', 'Offered', 'Pending'],
  })
  status: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  })
  createdBy: User;
}
export const JobSchema = SchemaFactory.createForClass(Job);
