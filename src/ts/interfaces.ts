import { Request } from 'express';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

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
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReqBody<Type> extends Request {
  body: Type;
}
