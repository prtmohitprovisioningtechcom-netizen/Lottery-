import mongoose, { Schema, models, model } from "mongoose";

const WinnerSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, trim: true },
    position: { type: Number, required: true, min: 1, max: 13 },
    ticketNumber: { type: String, required: true, trim: true, uppercase: true },
    date: { type: String, required: true },
  },
  { timestamps: true }
);

WinnerSchema.index({ mobile: 1 });

export const Winner =
  models.Winner || model("Winner", WinnerSchema);
