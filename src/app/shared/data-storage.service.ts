import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import 'rxjs/Rx';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class DataStorageService {
	constructor(private httpClient: HttpClient,
				private recipeService: RecipeService,
				private  authService: AuthService) {

	}

	storeRecipes() {
		
		//const headers = new HttpHeaders().set('Authorizatin', 'Bearer sometokenhere');
		// return this.httpClient.put('https://my-ng-recipe-book-e20a7.firebaseio.com/recipes.json',
		// 	this.recipeService.getRecipes(), {
		// 		observe: 'body',
		// 		params: new HttpParams().set('auth', token)
		// 		//headers: headers

		// 	});

		//Request Creation
		const req = new HttpRequest('PUT','https://my-ng-recipe-book-e20a7.firebaseio.com/recipes.json', this.recipeService.getRecipes(), {reportProgress: true} )

		//Request Execution
		return this.httpClient.request(req);

	}

	getRecipes() {
		

		//this.httpClient.get<Recipe[]>('https://my-ng-recipe-book-e20a7.firebaseio.com/recipes.json?auth=' + token)
		this.httpClient.get<Recipe[]>('https://my-ng-recipe-book-e20a7.firebaseio.com/recipes.json', {
			observe: 'body',
			responseType: 'json'
		})
			.map(
					(recipes) => {
						console.log(recipes)						
						for (let recipe of recipes) {
							if (!recipe['ingredients']) {
								console.log(recipe);
								recipe['ingredients'] = [];
							}
						}
						return recipes;
						
					}
				)
			.subscribe(
					(recipes: Recipe[]) => {						
						this.recipeService.setRecipes(recipes);
					}
				);
	}
}