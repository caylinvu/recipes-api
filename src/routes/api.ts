import express, { Request, Response, NextFunction } from 'express';
import * as recipeController from '../controllers/recipeController';
const router = express.Router();

// GET API home page
router.get('/', function (req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Recipes API' });
});

/* ~~~~~~~~~~RECIPES~~~~~~~~~~ */

// POST - create a new recipe
router.post('/recipe/create', recipeController.createRecipe);

// PUT - update a recipe
router.put('/recipe/:recipeId/update', recipeController.updateRecipe);

// DELETE - delete a recipe
router.delete('/recipe/:recipeId/delete', recipeController.deleteRecipe);

// GET - retrieve an individual recipe
router.get('/recipe/:recipeId', recipeController.getRecipe);

// GET - retrieve all recipes
router.get('/recipes', recipeController.getRecipes);

export default router;
