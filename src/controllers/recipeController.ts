import Recipe from '../models/recipe';
import { IRecipe, IIngredient, ReqBody } from '../ts/interfaces';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import mongoose from 'mongoose';
import { body, validationResult, check } from 'express-validator';
import fs from 'fs';

// Create a new recipe
export const createRecipe = [
  body('name', 'Recipe name is required').trim().isLength({ min: 1 }),
  body('description').optional({ nullable: true }).trim(),
  body('ingredients', 'Ingredients are required').isArray({ min: 1 }),
  body('directions', 'Directions are required').isArray({ min: 1 }),
  body('servings', 'Servings must be an integer').optional({ nullable: true }).trim().isInt(),
  body('notes', 'Notes must be an array').optional({ nullable: true }).isArray(),
  body('source').optional({ nullable: true }).trim(),
  body('tags', 'Must select at least one tag').isArray({ min: 1 }),
  asyncHandler(async (req: ReqBody<IRecipe>, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json(errors.array());
      return;
    }

    const recipe = new Recipe<IRecipe>({
      name: req.body.name,
      description: req.body.description,
      ingredients: req.body.ingredients,
      directions: req.body.directions,
      servings: req.body.servings,
      notes: req.body.notes,
      source: req.body.source,
      tags: req.body.tags,
      image: req.body.image,
    });

    await recipe.save();
    res.send(recipe);
  }),
];

// Update a recipe
export const updateRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    res.send('Controller function to update a recipe');
  },
);

// Delete a recipe
export const deleteRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const recipe: IRecipe | null = await Recipe.findById(req.params.recipeId).exec();

    if (recipe) {
      await Recipe.findByIdAndDelete(req.params.recipeId);
      res.send(recipe);
    } else {
      const err = new Error('Invalid "recipeId" provided in path');
      res.status(404);
      return next(err);
    }
  },
);

// Get data for an individual recipe
export const getRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    if (!mongoose.isValidObjectId(req.params.recipeId)) {
      const err = new Error('Recipe not found');
      res.status(404);
      return next(err);
    }

    const recipe: IRecipe | null = await Recipe.findById(req.params.recipeId).exec();

    if (recipe === null) {
      const err = new Error('Recipe not found');
      res.status(404);
      return next(err);
    }

    res.send(recipe);
  },
);

// Get all recipe data (currently sorting chronologically)
export const getRecipes = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // const allRecipes: IRecipe[] = await Recipe.find().sort({ name: 1 }).exec();
    const allRecipes: IRecipe[] = await Recipe.find().sort({ createdAt: 1 }).exec();
    res.send(allRecipes);
  },
);
