#! /usr/bin/env ts-node

// Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user';
import Recipe from '../models/recipe';
import { IRecipe, IUser, Tag } from '../ts/interfaces';

const users: IUser[] = [];
const recipes: IRecipe[] = [];

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createUsers();
  await createRecipes();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// Create user and save to database
async function userCreate(
  index: number,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
) {
  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });

  const userDetail: IUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashedPassword,
  };

  const user = new User(userDetail);
  await user.save();
  users[index] = user;
  console.log(`Added user: ${firstName} ${lastName}`);
}

// Call userCreate() to create multiple users
async function createUsers() {
  console.log('Adding users');
  await Promise.all([userCreate(0, 'Potato', 'Man', 'potatoman@gmail.com', 'password')]);
}

// Create recipe and save to database
async function recipeCreate(
  index: number,
  name: string,
  description: string,
  ingredients: string[],
  directions: string[],
  servings: number,
  notes: string[],
  source: string,
  tags: Tag[],
  image: string,
) {
  const recipeDetail: IRecipe = {
    name: name,
    description: description,
    ingredients: ingredients,
    directions: directions,
    servings: servings,
    notes: notes,
    source: source,
    tags: tags,
    image: image,
  };

  const recipe = new Recipe(recipeDetail);
  await recipe.save();
  recipes[index] = recipe;
  console.log(`Added recipe: ${name}`);
}

// Call recipeCreate() to create multiple recipes
async function createRecipes() {
  console.log('Adding recipes');
  await Promise.all([
    recipeCreate(
      0,
      'Hot Dog',
      'A damn good time on a bun',
      ['1 bun', '1 weiner'],
      ['Get bun out of packaging', 'Get weiner out of packaging', 'Put weiner in bun'],
      1,
      ['Top with ketchup for a good time'],
      'my brain',
      ['Lunch', 'Dinner', 'Snack'],
      '',
    ),
    recipeCreate(
      1,
      'Smoked Salmon Bagel',
      '',
      [
        'half a bagel',
        '2 tbsp cream cheese',
        '2 oz smoked salmon',
        'lemon slice',
        '1 tsp dill, chopped',
        'everything bagel seasoning',
        'pepper',
      ],
      [
        'Spread cream cheese onto bagel half and top with salmon',
        'Top salmon with dill, everything bagel seasoning, salt, and a squeeze of lemon',
      ],
      1,
      [],
      'personal life experience',
      ['Breakfast', 'Lunch'],
      '',
    ),
  ]);
}
