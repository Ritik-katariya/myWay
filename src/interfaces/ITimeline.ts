import { Document } from 'mongoose';

export interface ITimeline extends Document {
  title: string;
  content: string;
  images?: string[];
  date?: Date;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
