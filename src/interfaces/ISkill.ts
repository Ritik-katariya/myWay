import { Document } from 'mongoose';

export interface ISkill extends Document {
  category: string;
  skills: string[];
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
