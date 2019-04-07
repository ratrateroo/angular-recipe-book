import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
	
	private recipes: Recipe[] = [

	new Recipe(
 		'Tasty Schnitzel',
 		'A super-tasty Schnitzel - just awesome!',
 		'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
 		[
 			new Ingredient('Meat', 1),
 			new Ingredient ('Fresh Fries', 20)
 		]),
	new Recipe(
 		'Big Fat Burger',
 		'What else you need to say?',
 		'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
 		[
 			new Ingredient('Buns', 2),
 			new Ingredient('Meat', 1)
 		]),

 	new Recipe(
 		'A Test Recipe',
 		'This is simply a test',
 		'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
 		[]),
 	new Recipe(
 		'Another Test Recipe',
 		'This is simply a test',
 		'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
 		[])
  ];

  constructor(private slService: ShoppingListService) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes(){
  	return this.recipes.slice();
  }

  getRecipe(index: number){
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
  	this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());

  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number){
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}