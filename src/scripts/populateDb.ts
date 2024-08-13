#! /usr/bin/env ts-node

// Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/user';
import Recipe from '../models/recipe';

const users: object[] = [];
const recipes: object[] = [];

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
  const userDetail = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  const user = new User(userDetail);

  const hashedPassword: string = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        reject(err);
      } else {
        resolve(hashedPassword);
      }
    });
  });

  user.password = hashedPassword;
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
  ingredients: object[],
  steps: string[],
  servings: number,
  notes: string[],
  source: string,
  category: string[],
  image: string,
) {
  const recipeDetail = {
    name: name,
    description: description,
    ingredients: ingredients,
    steps: steps,
    servings: servings,
    notes: notes.length > 0 ? notes : null,
    source: source,
    category: category,
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
      [
        {
          name: 'bun',
          amount: 1,
        },
        {
          name: 'weiner',
          amount: 1,
        },
      ],
      ['Get bun out of packaging', 'Get weiner out of packaging', 'Put weiner in bun'],
      1,
      ['Top with ketchup for a good time'],
      'my brain',
      ['Lunch', 'Dinner', 'Snack'],
      '',
    ),
    recipeCreate(
      0,
      'Smoked Salmon Bagel',
      '',
      [
        {
          name: 'bagel',
          amount: '1.5',
        },
        {
          name: 'cream cheese',
          amount: '2',
          unit: 'tbsp',
        },
        {
          name: 'smoked salmon',
          amount: '2',
          unit: 'oz',
          prep: 'sliced',
        },
        {
          name: 'lemon',
          amount: '1',
          unit: 'slice',
        },
        {
          name: 'dill',
          amount: '1',
          unit: 'tsp',
          prep: 'chopped',
        },
        {
          name: 'everything bagel seasoning',
        },
        {
          name: 'pepper',
        },
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
