import { Request } from 'express';

export interface IIngredient {
  name: string;
  amount?: number;
  unit?: string;
  prep?: string;
}

export interface IRecipe {
  name: string;
  description?: string;
  ingredients: IIngredient[];
  directions: string[];
  servings?: number;
  notes?: string[];
  source?: string;
  tags: string[];
  image?: string;
}

export interface ReqBody<Type> extends Request {
  body: Type;
}
