import { Schema, model } from 'mongoose';
import { IUser } from '../ts/interfaces';

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default model<IUser>('User', UserSchema);
