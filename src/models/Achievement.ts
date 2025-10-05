import { Schema, model, models, Model } from 'mongoose';
import { IAchievement } from '../interfaces/IAchievement';

const AchievementSchema = new Schema<IAchievement>(
  {
    title: {
      type: String,
      required: [true, 'Please provide an achievement title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide an achievement description'],
      maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    icon: {
      type: String,
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

AchievementSchema.index({ title: 1 });
AchievementSchema.index({ order: 1 });

const Achievement: Model<IAchievement> = models.Achievement || model<IAchievement>('Achievement', AchievementSchema);

export default Achievement;
