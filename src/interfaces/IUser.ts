import { Document } from "mongoose";

export interface IUser extends Document {
  clerkUserId?: string;
  name: string;
  email: string;
  username: string;
  avatar?: string;
  bio?: string;
  title?: string;
  location?: string;
  phone?: string;
  website?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
  resume?: string;
  createdAt: Date;
  updatedAt: Date;
}
