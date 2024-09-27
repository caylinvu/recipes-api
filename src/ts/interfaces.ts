import { Request } from 'express';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export type Tag = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack' | 'Appetizer' | 'Dessert' | 'Drink';

export interface IRecipe {
  name: string;
  description?: string;
  ingredients: string[];
  directions: string[];
  servings?: number;
  notes?: string[];
  source?: string;
  tags: Tag[];
  image?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReqBody<Type> extends Request {
  body: Type;
}
