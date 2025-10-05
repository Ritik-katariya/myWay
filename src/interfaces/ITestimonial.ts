import { Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  designation: string;
  company?: string;
  quote: string;
  image: string;
  rating?: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
