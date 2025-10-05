import { Schema, model, models, Model } from 'mongoose';
import { ISkill } from '../interfaces/ISkill';

const SkillSchema = new Schema<ISkill>(
  {
    category: {
      type: String,
      required: [true, 'Please provide a skill category'],
      maxlength: [50, 'Category cannot be more than 50 characters'],
      trim: true,
    },
    skills: [{
      type: String,
      required: true,
      trim: true,
    }],
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

SkillSchema.index({ category: 1 });
SkillSchema.index({ order: 1 });

const Skill: Model<ISkill> = models.Skill || model<ISkill>('Skill', SkillSchema);

export default Skill;
