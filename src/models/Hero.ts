import { Schema, model, models, Model, Document } from "mongoose";
import type { IHero as IHeroType } from "../types/portfolio";

type HeroDocument = IHeroType & Document;

const SocialMediaSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Social media name is required"],
      trim: true,
    },
    url: {
      type: String,
      required: [true, "Social media url is required"],
      trim: true,
    },
  },
  { _id: false }
);

const heroSchemaDefinition = {
  quote: {
    type: String,
    required: [true, "Quote is required"],
    minlength: [20, "Quote must be at least 20 characters"],
    maxlength: [30, "Quote cannot be more than 30 characters"],
    trim: true,
  },
  titles: {
    type: [String],
    required: [true, "At least two titles are required"],
    validate: [
      {
        validator: function (arr: unknown) {
          return Array.isArray(arr) && arr.length >= 2 && arr.length <= 5;
        },
        message: "Titles count must be between 2 and 5",
      },
      {
        validator: function (arr: unknown) {
          if (!Array.isArray(arr)) return false;
          return arr.every((t) => typeof t === "string" && t.trim().length > 0);
        },
        message: "All titles must be non-empty strings",
      },
    ],
  },
  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
  },
  resumeUrl: {
    type: String,
    trim: true,
  },
  socialMedia: {
    type: [SocialMediaSchema],
    default: [],
    validate: {
      validator: function (arr: unknown) {
        return Array.isArray(arr) && arr.length >= 1;
      },
      message: "At least one social media link is required",
    },
  },
};

const HeroSchema = new Schema(heroSchemaDefinition as any, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

HeroSchema.index({ quote: 1 });

const Hero = (models as any).Hero || model("Hero", HeroSchema);

export default Hero;
