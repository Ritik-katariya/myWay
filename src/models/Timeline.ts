import { Schema, model, models, Model } from 'mongoose';
import { ITimeline } from '../interfaces/ITimeline';

const TimelineSchema = new Schema<ITimeline>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a timeline title'],
      maxlength: [100, 'Title cannot be more than 100 characters'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide timeline content'],
      maxlength: [2000, 'Content cannot be more than 2000 characters'],
    },
    images: [{
      type: String,
    }],
    date: {
      type: Date,
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

TimelineSchema.index({ title: 1 });
TimelineSchema.index({ order: 1 });
TimelineSchema.index({ date: 1 });

const Timeline: Model<ITimeline> = models.Timeline || model<ITimeline>('Timeline', TimelineSchema);

export default Timeline;
