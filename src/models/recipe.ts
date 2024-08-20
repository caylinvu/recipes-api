import { Schema, model } from 'mongoose';
import { IRecipe, IIngredient } from '../ts/interfaces';

const RecipeSchema = new Schema<IRecipe>(
  {
    name: { type: String, required: true },
    description: { type: String },
    ingredients: {
      type: [
        new Schema<IIngredient>({
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

export default model<IRecipe>('Recipe', RecipeSchema);
