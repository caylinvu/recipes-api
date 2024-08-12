import { Schema, Types, model, Model } from 'mongoose';

interface Ingredients {
  name: string;
  amount: number;
  unit?: string;
  prep?: string;
}

interface Recipe {
  name: string;
  description?: string;
  ingredients: Ingredients[];
  steps: string[];
  servings?: number;
  notes?: string[];
  source?: string;
  category: string[];
  image?: string;
}

type THydratedRecipeDocument = {
  ingredients?: Types.DocumentArray<Ingredients>;
};

type RecipeModelType = Model<Recipe, {}, {}, {}, THydratedRecipeDocument>;

const RecipeSchema = new Schema<Recipe, RecipeModelType>({
  name: { type: String, required: true },
  description: { type: String },
  ingredients: {
    type: [
      new Schema<Ingredients>({
        name: { type: String, required: true },
        amount: { type: Number, required: true },
        unit: { type: String },
        prep: { type: String },
      }),
    ],
    required: true,
  },
  steps: [{ type: String, required: true }],
  servings: { type: Number },
  notes: [{ type: String }],
  source: { type: String },
  category: [{ type: String, required: true }],
  image: { type: String },
});

export default model<Recipe, RecipeModelType>('Recipe', RecipeSchema);
