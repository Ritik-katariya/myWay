import { Schema, model, models, Model } from 'mongoose';
import { IProject } from '../interfaces/IProject';

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a project title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a project description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    longDescription: {
      type: String,
      maxlength: [2000, 'Long description cannot be more than 2000 characters'],
    },
    image: {
      type: String,
      required: [true, 'Please provide a project image'],
    },
    images: [{
      type: String,
    }],
    technologies: [{
      type: String,
      required: true,
    }],
    githubUrl: {
      type: String,
    },
    liveUrl: {
      type: String,
    },
    category: {
      type: String,
      enum: ['web', 'mobile', 'desktop', 'ai', 'other'],
      default: 'web',
    },
    status: {
      type: String,
      enum: ['completed', 'in-progress', 'planned'],
      default: 'completed',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProjectSchema.index({ title: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });
ProjectSchema.index({ order: 1 });

const Project: Model<IProject> = models.Project || model<IProject>('Project', ProjectSchema);

export default Project;
