import mongoose, { Schema, Document } from "mongoose";

export interface ICart extends Document {
  items: { id: number; name: string; price: number }[];
}

const CartSchema: Schema = new Schema(
  {
    items: [{ id: Number, name: String, price: Number }],
  },
  { timestamps: true }
);

export default mongoose.models.Cart || mongoose.model<ICart>("Cart", CartSchema);
