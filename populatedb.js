#! /usr/bin/env node

// Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"

const bcrypt = require('bcryptjs');

const User = require('./dist/models/user.js');
// const Recipe = require('./dist/models/recipe.js');

const users = [];
// const recipes = [];

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createUsers();
  // await createRecipes();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

async function userCreate(index, firstName, lastName, email, password) {
  const userDetail = {
    firstName: firstName,
    lastName: lastName,
    email: email,
  };
  const user = new User(userDetail);

  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    user.password = hashedPassword;
    await user.save();
  });

  users[index] = user;
  console.log(`Added user: ${firstName} ${lastName}`);
}

async function createUsers() {
  console.log('Adding users');
  await Promise.all([userCreate(0, 'Potato', 'Man', 'potatoman@gmail.com', 'password')]);
}

// async function recipeCreate(
//   index,
//   name,
//   description,
//   ingredients,
//   steps,
//   servings,
//   notes,
//   source,
//   category,
//   image,
// ) {
//   const recipeDetail = {
//     name: name,
//     description: description,
//     ingredients: ingredients,
//     steps: steps,
//     servings: servings,
//     notes: notes,
//     source: source,
//     category: category,
//     image: image,
//   };

//   const recipe = new Recipe(recipeDetail);
//   await recipe.save();
//   recipes[index] = recipe;
//   console.log(`Added recipe: ${name}`);
// }

// async function createRecipes() {
//   console.log('Adding recipes');
//   await Promise.all([
//     recipeCreate(
//       0,
//       'Hot Dog',
//       'A damn good time on a bun',
//       [
//         {
//           name: 'Bun',
//           amount: 1,
//           unit: '',
//           prep: '',
//         },
//         {
//           name: 'Weiner',
//           amount: 1,
//           unit: '',
//           prep: '',
//         },
//       ],
//       ['Get bun out of packaging', 'Get weiner out of packaging', 'Put weiner in bun'],
//       1,
//       ['Top with ketchup for a good time'],
//       'my brain',
//       ['Lunch', 'Dinner', 'Snack'],
//       '',
//     ),
//   ]);
// }
