import { Schema, model, models, Model } from 'mongoose';
import { ITestimonial } from '../interfaces/ITestimonial';

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      maxlength: [50, 'Name cannot be more than 50 characters'],
      trim: true,
    },
    designation: {
      type: String,
      required: [true, 'Please provide a designation'],
      maxlength: [100, 'Designation cannot be more than 100 characters'],
      trim: true,
    },
    company: {
      type: String,
      maxlength: [100, 'Company cannot be more than 100 characters'],
      trim: true,
    },
    quote: {
      type: String,
      required: [true, 'Please provide a quote'],
      maxlength: [1000, 'Quote cannot be more than 1000 characters'],
    },
    image: {
      type: String,
      required: [true, 'Please provide an image'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 5,
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

TestimonialSchema.index({ name: 1 });
TestimonialSchema.index({ order: 1 });

const Testimonial: Model<ITestimonial> = models.Testimonial || model<ITestimonial>('Testimonial', TestimonialSchema);

export default Testimonial;
