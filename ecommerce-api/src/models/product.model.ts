import mongoose from 'mongoose';
import { Product } from '../../../shared/types';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { 
    type: String, 
    enum: ['supplements', 'equipment', 'nutrition'],
    required: true 
  },
  image: { type: String, required: true },
  dietTypes: [{ type: String }]
});

export const ProductModel = mongoose.model<Product>('Product', productSchema); 