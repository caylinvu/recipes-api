import { Schema, model } from 'mongoose';

interface Ingredients {
  name: string;
  amount?: number;
  unit?: string;
  prep?: string;
}

interface Recipe {
  name: string;
  description?: string;
  ingredients: Ingredients[];
  directions: string[];
  servings?: number;
  notes?: string[];
  source?: string;
  tags: string[];
  image?: string;
}

const RecipeSchema = new Schema<Recipe>(
  {
    name: { type: String, required: true },
    description: { type: String },
    ingredients: {
      type: [
        new Schema<Ingredients>({
          name: { type: String, required: true },
          amount: { type: Number },
          unit: { type: String },
          prep: { type: String },
        }),
      ],
      required: true,
      _id: false,
    },
    directions: [{ type: String, required: true }],
    servings: { type: Number },
    notes: [{ type: String }],
    source: { type: String },
    tags: [{ type: String, required: true }],
    image: { type: String },
  },
  { timestamps: true },
);

export default model<Recipe>('Recipe', RecipeSchema);
