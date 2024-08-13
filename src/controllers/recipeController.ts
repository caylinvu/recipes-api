import Recipe from '../models/recipe';
import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult, check } from 'express-validator';
import fs from 'fs';

// Get all recipe data
export const getRecipes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log('Controller function to get all recipes');
});

// Get data for an individual recipe
export const getRecipe = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  console.log('Controller function to get an individual recipe');
});

// Create a new recipe
export const createRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Controller function to create a recipe');
  },
);

// Update a recipe
export const updateRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Controller function to update a recipe');
  },
);

// Delete a recipe
export const deleteRecipe = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log('Controller function to delete a recipe');
  },
);
