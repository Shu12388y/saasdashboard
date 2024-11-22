import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    deployLink: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
    },
    type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productLink: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Product =
  mongoose.models.Product || mongoose.model('Product', productSchema);
