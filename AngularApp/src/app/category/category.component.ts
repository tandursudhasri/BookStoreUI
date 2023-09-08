import { Component } from '@angular/core';
import { CartComponent } from '../cart/cart.component';
import { AbstractHttpCommunication, book } from '../HttpCommunication';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  books: book[] = [];
  errors!: string;
  button_clicked:boolean=false;
  cat:string='';
  constructor(private service: AbstractHttpCommunication, private cart: CartComponent) {}
  getBooksByCategory(name:string): void {    
    let observable = this.service.GetBookCategory(name);
    observable.subscribe({
      next: (result) => {
        this.books = result;
        //var p = 10;
      },
      error: (err) => (this.errors = err.message),
    });
    this.button_clicked=true;
    this.cat=name;
  }

  addToCart(b:book) : void {
    this.cart.addToCart(b);
  }
}
