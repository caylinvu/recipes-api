import Recipe from '../models/recipe';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { body, validationResult, check } from 'express-validator';
import fs from 'fs';

// Create a new recipe
export const createRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Controller function to create a recipe');
  },
);

// Update a recipe
export const updateRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Controller function to update a recipe');
  },
);

// Delete a recipe
export const deleteRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Controller function to delete a recipe');
  },
);

// Get data for an individual recipe
export const getRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!mongoose.isValidObjectId(req.params.conversationId)) {
      const err = new Error('Recipe not found');
      res.status(404);
      return next(err);
    }

    const recipe = await Recipe.findById(req.params.recipeId).exec();

    if (recipe === null) {
      const err = new Error('Recipe not found');
      res.status(404);
      return next(err);
    }

    res.send(recipe);
  },
);

// Get all recipe data
export const getRecipes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const allRecipes = await Recipe.find().sort({ name: 1 }).exec();
    res.send(allRecipes);
  },
);
