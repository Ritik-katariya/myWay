import { Document } from 'mongoose';

export interface IAchievement extends Document {
  title: string;
  description: string;
  icon?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
