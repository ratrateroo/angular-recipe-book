import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-recipe-project';
  loadedFeature = 'recipe';

  ngOnInit() {
  	firebase.initializeApp({
  		apiKey: "AIzaSyBHLL_6Z3RjIMjWckkHpQq_IOXFpeDCA6k",
    	authDomain: "my-ng-recipe-book-e20a7.firebaseapp.com"
  	});
  }

  onNavigate(feature: string){
  	this.loadedFeature = feature;
  }
}
